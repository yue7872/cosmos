/**
 * @param  {string} article md文件内容
 * @return {string} article 处理后的md文件内容（去除了头部信息）
 * @return {string} articleInfo 文章开头信息
 */
export const useMd = (article: string) => {
  const originContent: string = article.match(/---(.*\n)*---/g)[0];
  const transContent: string = originContent.replace("---\n", '{"').replace("\n---", '"}').replace(/: /g, '": "').replace(/\n/g, '","');
  const articleInfo = JSON.parse(transContent);

  article = article.replace(originContent, "");
  return {
    article,
    articleInfo,
  };
};