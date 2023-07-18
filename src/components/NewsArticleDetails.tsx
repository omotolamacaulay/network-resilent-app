import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { NewsArticle } from "../types";

export const NewsArticleDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [singleArticle, setSingleArticle] = useState<NewsArticle | null>(null);
  useEffect(() => {
    const articles = localStorage.getItem("articles") as string;
    let data: NewsArticle;
    if (articles) {
      data = JSON.parse(articles).news.find(
        (article: NewsArticle) => article.id === id
      );
      setSingleArticle(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <button
        onClick={() => {
          navigate("/");
        }}
      >
        Back to home
      </button>
      {singleArticle && (
        <div>
          <h2>{singleArticle.title}</h2>
          <p>Date: {singleArticle.story_date}</p>
          <p>{singleArticle.excerpt}</p>
          <p>{singleArticle.story_content}</p>
          <p>Author: {singleArticle.author.name}</p>
          <p>Email: {singleArticle.author.email}</p>
          <p>Phone: {singleArticle.author.phone}</p>
          <p>Upvotes: {singleArticle.ratings.upvotes}</p>
          <p>Downvotes: {singleArticle.ratings.downvotes}</p>
          <p>Rating: {singleArticle.ratings.rating}</p>

          <hr />
        </div>
      )}
    </div>
  );
};
