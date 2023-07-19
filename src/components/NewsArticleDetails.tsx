import React from "react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { NewsArticle } from "../types";
import Rating from "./Rating";

export const NewsArticleDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [singleArticle, setSingleArticle] = useState<NewsArticle | null>(null);
  const [newAverageRating, setNewAverageRating] = useState<number | null>(null);
  const [upVotes, setUpvotes] = useState<number>(0);
  const [downVotes, setDownVotes] = useState<number>(0);

  useEffect(() => {
    const articles = localStorage.getItem("articles") as string;
    if (articles) {
      const parsedArticles = JSON.parse(articles);
      const data = parsedArticles.news.find(
        (article: NewsArticle) => article.id === id
      );
      setSingleArticle(data);
      setUpvotes(data?.ratings.upvotes || 0);
      setDownVotes(data?.ratings.downvotes || 0);
      const totalVotes = data?.ratings.upvotes + data?.ratings.downvotes;
      const newAverage = ((data?.ratings.upvotes || 0) / totalVotes) * 5;
      setNewAverageRating(newAverage);
    }
  }, [id]);

  useEffect(() => {
    const articles = localStorage.getItem("articles") as string;
    if (articles) {
      const parsedArticles = JSON.parse(articles);
      const updatedArticles = parsedArticles.news.map(
        (article: NewsArticle) => {
          if (article.id === id) {
            article.ratings.upvotes = upVotes;
            article.ratings.downvotes = downVotes;
          }
          return article;
        }
      );
      parsedArticles.news = updatedArticles;
      localStorage.setItem("articles", JSON.stringify(parsedArticles));
      const totalVotes = upVotes + downVotes;
      const newAverage = (upVotes / totalVotes) * 5;
      setNewAverageRating(newAverage);
    }
  }, [id, upVotes, downVotes]);

  const handleUpvote = () => {
    setUpvotes((prevUpvotes) => prevUpvotes + 1);
  };

  const handleDownvote = () => {
    setDownVotes((prevDownvotes) => prevDownvotes + 1);
  };

  return (
    <div className="singleArticle">
      <div>
        <button
          onClick={() => {
            navigate("/");
          }}
          className="back-to-articles"
        >
          Back to Articles
        </button>
      </div>
      <h1>Article Details</h1>
      {singleArticle && (
        <div className="singleArticle-body">
          <div className="singleArticle-content">
            <h2 className="singleArticle-title">{singleArticle.title}</h2>
            <p className="singleArticle-story">{singleArticle.excerpt}</p>
            <p className="singleArticle-story">{singleArticle.story_content}</p>
          </div>
          <div className="singleArticle-info">
            <p className="singleArticle-info__text">
              {singleArticle.story_date}
            </p>
            <p className="singleArticle-info__text">
              By {singleArticle.author.name}
            </p>
            <p className="singleArticle-info__text">
              {singleArticle.author.email}
            </p>
            <p className="singleArticle-info__text">
              {singleArticle.author.phone}
            </p>
            <Rating
              article={singleArticle}
              onUpvote={handleUpvote}
              onDownvote={handleDownvote}
            />
            {newAverageRating !== null && (
              <p className="singleArticle-info__text">
                Average Rating: {newAverageRating.toFixed(2)}
              </p>
            )}
            <p className="singleArticle-info__text">Upvotes: {upVotes}</p>
            <p className="singleArticle-info__text">Downvotes: {downVotes}</p>
          </div>
        </div>
      )}
    </div>
  );
};
