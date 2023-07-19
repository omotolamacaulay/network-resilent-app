import { NewsArticle } from "../types";
import { UpVote } from "../assets";
import { DownVote } from "../assets";
import React from "react";

interface SingleArticleProps {
  article: NewsArticle;
  isFavorite: boolean;
  toggleFavorite: (articleId: string) => void;
}

const SingleArticle: React.FC<SingleArticleProps> = ({
  article,
  isFavorite,
  toggleFavorite,
}) => (
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

    <button onClick={() => toggleFavorite(article.id)}>
      {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
    </button>
  </div>
);

export default SingleArticle;
