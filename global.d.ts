declare interface ArticleInfo {
  articleTitle: string
  date: string
  tags: string[]
  categories: string
  timestamp: number
  readingTime: number
  outline: string
}
declare interface PostDetail {
  title?: string
  articleInfo: ArticleInfo
  content?: string
}
