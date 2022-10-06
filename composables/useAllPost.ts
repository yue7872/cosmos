export const useAllPost = () => {
  // TODO：文章列表上传数据库而非本地查询
  // @ts-expect-error-disable-next-line
  const articleList = import.meta.glob('../articles/*.md', {
    as: 'raw',
  });

  const posts: PostDetail[] = [];
  const pathList = Object.keys(articleList);
  pathList.map((items) => {
    const postContent: any = articleList[items];
    const { article, articleInfo } = useMd(postContent);
    const postName = items.replace('../articles/', '').replace('.md', '');
    posts.push({ title: postName, articleInfo, content: article });
  });
  return { articleList, posts };
};
