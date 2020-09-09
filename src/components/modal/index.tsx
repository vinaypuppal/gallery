import React, { FunctionComponent, useEffect, useRef } from 'react';
import useOnClickOutside from 'use-onclickoutside';
import clsx from 'clsx';

import { Portal } from './portal';

type ModalProps = {
  showModal: boolean;
  toggleModal?: (state: boolean) => void;
  modalClassNames?: string;
  backdropClassNames?: string;
  overFlowClassNames?: string;
  closeOnBackdropClick?: boolean;
};

export const Modal: FunctionComponent<ModalProps> = ({
  showModal,
  toggleModal,
  modalClassNames,
  backdropClassNames,
  overFlowClassNames,
  closeOnBackdropClick = true,
  children,
}) => {
  const ref = useRef<HTMLDivElement>();
  const scrollRef = useRef<{ x: number; y: number }>();
  useOnClickOutside(ref, () => {
    closeOnBackdropClick && toggleModal && toggleModal(!showModal);
  });

  useEffect(() => {
    if (showModal) {
      scrollRef.current = { x: window.scrollX, y: window.scrollY };
      document.body.style.setProperty('overflow', 'hidden');
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.setProperty('overflow', null);
      if (scrollRef.current) {
        window.scrollTo(scrollRef.current.x, scrollRef.current.y);
      }
    }
    return () => {
      document.body.style.setProperty('overflow', null);
      if (scrollRef.current) {
        window.scrollTo(scrollRef.current.x, scrollRef.current.y);
      }
    };
  }, [showModal]);

  if (!showModal) {
    return null;
  }

  return (
    <Portal>
      <div
        style={{ zIndex: 9999 }}
        className={clsx('fixed inset-0 z-50 flex flex-col w-full overflow-x-auto', overFlowClassNames)}>
        <div
          className={clsx(
            'absolute inset-0 flex flex-col w-full overflow-x-auto bg-gray-100 bg-opacity-75',
            backdropClassNames
          )}>
          <div
            className={clsx(
              'bg-white shadow-md rounded min-h-screen sm:min-h-0 sm:m-auto relative flex flex-col',
              modalClassNames
            )}>
            {children}
          </div>
        </div>
      </div>
    </Portal>
  );
};
