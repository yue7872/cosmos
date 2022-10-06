import { marked, parse } from 'marked';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-light.css';

/**
 * 解析markdown文件，转化成html
 * @param  {string} article md文件内容
 * @return {string} article 通过marked解析后的md文件内容
 */
export const useParseMd = (article: string) => {
  marked.setOptions({
    renderer: new marked.Renderer(),
    highlight(code, lang) {
      const language = hljs.getLanguage(lang) ? lang : 'plaintext';
      return hljs.highlight(code, { language }).value;
    },
    langPrefix: 'hljs language-', // highlight.js css expects a top-level 'hljs' class.
    pedantic: false,
    gfm: true,
    breaks: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
    xhtml: false,
  });
  const articleContent = parse(article);
  return {
    articleContent,
  };
};
