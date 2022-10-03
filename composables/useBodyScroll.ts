// search的时候禁用滚动
export const useBodyScroll = (showMask) => {
  document.body.style.overflow = showMask ? 'hidden' : 'unset';
};
