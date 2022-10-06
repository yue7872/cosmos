export const useTyper = (text: string, speed: number, noBack?: boolean) => {
  const typedText = ref('');
  const typing = ref(true);
  const interval = setInterval(() => {
    if (typedText.value.length < text.length) {
      typedText.value += text[typedText.value.length];
    }
    else {
      clearInterval(interval);
      // 回退
      const intervalBack = noBack
        ? null
        : setInterval(() => {
          if (typedText.value.length > 0) {
            typedText.value = typedText.value.slice(0, -1);
          }
          else {
            typing.value = false;
            clearInterval(intervalBack);
          }
        }, speed);
    }
  }, speed);

  return { typedText, typing };
};
