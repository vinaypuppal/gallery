import React, { useEffect, FunctionComponent, useState, useRef } from 'react';
import { Portal as ReactPortal } from 'react-portal';
import { useIsMounted } from '../../hooks/useIsMounted';

export const Portal: FunctionComponent = ({ children }) => {
  const isMounted = useIsMounted();

  if (!isMounted) {
    return null;
  }

  return <ReactPortal>{children}</ReactPortal>;
};
