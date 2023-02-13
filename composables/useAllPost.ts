export const useAllPost = () => {
  // TODO：文章列表上传数据库而非本地查询
  // FIXME: 缺少md-loader 导致的nuxt打包错误
  const articleList = import.meta.glob('../articles/*.md', { as: 'raw', eager: true });
  const posts: PostDetail[] = [];
  const pathList = Object.keys(articleList);
  pathList.map((items) => {
    const postContent: string = articleList[items] as unknown as string;
    const { article, articleInfo } = useMd(postContent);
    const postName = items.replace('../articles/', '').replace('.md', '');
    posts.push({ title: postName, articleInfo, content: article });
    posts.sort((a, b) => {
      return b.articleInfo.timestamp - a.articleInfo.timestamp;
    });
  });
  return { articleList, posts };
};
