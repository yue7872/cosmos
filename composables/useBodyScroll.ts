export const useBodyScroll = (showMask) => {
  document.body.style.overflow = showMask ? "hidden" : "unset";
};
