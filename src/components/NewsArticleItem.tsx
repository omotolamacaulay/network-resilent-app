import { NewsArticle } from "../types";
import { UpVote } from "../assets";
import { DownVote } from "../assets";
import React from "react";
import { Link } from "react-router-dom";

interface NewsArticleItemProps {
  article: NewsArticle;
  isFavorite: boolean;
  toggleFavorite: (articleId: string) => void;
}

const NewsArticleItem: React.FC<NewsArticleItemProps> = ({
  article,
  isFavorite,
  toggleFavorite,
}) => (
  <Link className="article-link" to={`/articles/${article.id}`}>
    <div className="card">
      <h2 className="article-title">{article.title}</h2>
      <p>{article.story_date}</p>
      <p>{article.excerpt}</p>
      {/* <p>{article.story_content}</p> */}
      <p>Author: {article.author.name}</p>
      <p>{article.author.email}</p>
      <p>{article.author.phone}</p>

      <span>
        <img src={UpVote()} alt="" />: {article.ratings.upvotes}
      </span>
      <span>
        <img src={DownVote()} alt="" />: {article.ratings.downvotes}
      </span>
      <p>Rating: {article.ratings.rating}</p>

      <button
        className="showFavorites"
        onClick={() => toggleFavorite(article.id)}
      >
        {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
      </button>
    </div>
  </Link>
);

export default NewsArticleItem;
