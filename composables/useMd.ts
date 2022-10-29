import FormatDate from '../utils/formatDate';

/**
 * 用来分离markdown的头部和内容
 * @param  {string} article md文件内容
 * @return {string} article 处理后的md文件内容（去除了头部信息）
 * @return {string} articleInfo 文章开头信息
 */
export const useMd = (article: string) => {
  const originContent: string = article.match(/---(.*\n)*?---/g)[0];
  article = article.replace(originContent, '');

  // 将头部信息转化为对象
  const transContent: string = originContent.replace('---\n', '{"').replace('\n---', '"}').replace(/: /g, '": "').replace(/\n/g, '","');
  const articleInfo: ArticleInfo = {
    articleTitle: '',
    date: '',
    tags: [],
    categories: '',
    timestamp: 0,
    readingTime: 0,
    outline: '',
  };
  const temp = JSON.parse(transContent);
  const { title, date, tags, categories, outline } = temp;
  articleInfo.articleTitle = title;
  articleInfo.categories = categories;
  // 格式化articleInfo
  articleInfo.tags = tags.replace(/\'/g, '').replace(/\[/g, '').replace(/\]/g, '').replace(/ /g, '').split(',');
  articleInfo.timestamp = new Date(date.replace(/\'/g, '')).getTime();
  articleInfo.date = FormatDate(articleInfo.timestamp);
  articleInfo.outline = outline || article.replace(/#/g, '').replace(/\n/g, '').substring(0, 50);
  articleInfo.readingTime = article.length > 700 ? Math.ceil(article.length / 700) : 0;

  return {
    article,
    articleInfo,
  };
};
