export const useDailySentence = async(): Promise<string> => {
  const { data }: any = await useFetch('https://v1.hitokoto.cn/?c=i');
  return data.value.hitokoto;
};
