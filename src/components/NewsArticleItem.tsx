import React from "react";
import { NewsArticle } from "../types";
import SingleArticle from "./SingleArticle";
import { Link } from "react-router-dom";

interface SingleArticlePageProps {
  article: NewsArticle;
}

const NewsArticleItem: React.FC<SingleArticlePageProps> = ({ article }) => {
  return (
    <div>
      <Link className="article-link" to={`/articles/${article.id}`}>
        <SingleArticle article={article} />
      </Link>
    </div>
  );
};

export default NewsArticleItem;
