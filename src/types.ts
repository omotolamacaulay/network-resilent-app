export interface NewsArticle {
    id: string;
    story_date: string;
    title: string;
    excerpt: string;
    story_content: string;
    author: {
      name: string;
      email: string;
      phone: string;
    };
    ratings: {
      upvotes: number;
      downvotes: number;
      rating: number;
    };
  }
  export interface NewsData {
    news: NewsArticle[];
  }