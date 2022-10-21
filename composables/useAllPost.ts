export const useAllPost = () => {
  // TODO：文章列表上传数据库而非本地查询
  // @ts-expect-error-disable-next-line
  const articleList = import.meta.glob('../articles/*.md', {
    as: 'raw',
  }) as string;

  const posts: PostDetail[] = [];
  const pathList = Object.keys(articleList);
  pathList.map((items) => {
    const postContent: string = articleList[items];
    const { article, articleInfo } = useMd(postContent);
    const postName = items.replace('../articles/', '').replace('.md', '');
    posts.push({ title: postName, articleInfo, content: article });
    posts.sort((a, b) => {
      return b.articleInfo.timestamp - a.articleInfo.timestamp;
    });
  });
  return { articleList, posts };
};
