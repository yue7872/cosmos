export const useAllPost = () => {
  // TODO：文章列表上传数据库而非本地查询
  // @ts-ignore-disable-next-line
  const articleList = import.meta.glob("../articles/*.md", {
    as: "raw",
  });
  return articleList;
};
