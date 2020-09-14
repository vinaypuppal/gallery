export async function supportsImgType(type: string) {
  // Create
  //
  // <picture>
  //   <source srcset="data:,x" type="{type}" />
  //   <img />
  // </picture>
  //
  // (where "data:,x" is just a minimal URL that is valid but doesn't trigger network)
  let img = document.createElement('img');
  document.createElement('picture').append(
    Object.assign(document.createElement('source'), {
      srcset: 'data:,x',
      type,
    }),
    img
  );
  // Wait a single microtick just for the `img.currentSrc` to get populated.
  await 0;
  // At this point `img.currentSrc` will contain "data:,x" if format is supported and "" otherwise.
  return !!img.currentSrc;
}
