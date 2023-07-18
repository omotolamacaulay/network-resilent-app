import React from "react";
import { NewsArticle } from "../types";
import NewsArticleDetails from "./SingleArticle";
import { Link } from "react-router-dom";

interface SingleArticlePageProps {
  article: NewsArticle;
}

const NewsArticleItem: React.FC<SingleArticlePageProps> = ({ article }) => {
  return (
    <div>
      <h1>Article Details</h1>
      <Link to={`/articles/${article.id}`}>
        <NewsArticleDetails article={article} />
      </Link>
    </div>
  );
};

export default NewsArticleItem;
