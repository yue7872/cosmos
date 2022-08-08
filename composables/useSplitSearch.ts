export const useSplitSearch = (searchContent: string, searchValue: string) => {
  const searchArray = searchContent.split(searchValue);
  return searchArray;
};
