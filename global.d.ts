declare interface PostDetail {
  title?: string;
  articleInfo?: {
    title?: string;
    date?: string;
    tags?: string[]; // 标签
    categories?: string; // 分类
    outline?: string; // 内容概要
    [key: string]: any;
  };
  content?: string;
}
