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
      const data = JSON.parse(articles).news.find(
        (article: NewsArticle) => article.id === id
      );
      setSingleArticle(data);
      setUpvotes(data?.ratings.upvotes || 0);
      setDownVotes(data?.ratings.downvotes || 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleUpvote = () => {
    setUpvotes((prevUpvotes) => prevUpvotes + 1);
    const totalVotes = upVotes + downVotes + 1;
    const newAverage = ((upVotes + 1) / totalVotes) * 5;
    setNewAverageRating(newAverage);
  };

  const handleDownvote = () => {
    setDownVotes((prevDownvotes) => prevDownvotes + 1);
    const totalVotes = upVotes + downVotes + 1;
    const newAverage = (upVotes / totalVotes) * 5;
    setNewAverageRating(newAverage);
  };

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
          <Rating
            article={singleArticle}
            onUpvote={handleUpvote}
            onDownvote={handleDownvote}
          />
          <p>Upvotes: {upVotes}</p>
          <p>Downvotes: {downVotes}</p>
          {newAverageRating !== null && (
            <p>New Average Rating: {newAverageRating.toFixed(2)}</p>
          )}
          <hr />
        </div>
      )}
    </div>
  );
};
