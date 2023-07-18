import { NewsArticle } from "../types";

interface RatingProps {
  article: NewsArticle;
  onUpvote: () => void;
  onDownvote: () => void;
}

const Rating: React.FC<RatingProps> = ({ article, onUpvote, onDownvote }) => {
  const handleUpvote = () => {
    onUpvote();
  };

  const handleDownvote = () => {
    onDownvote();
  };

  return (
    <div>
      <button onClick={handleUpvote}>Upvote</button>
      <button onClick={handleDownvote}>Downvote</button>
    </div>
  );
};

export default Rating;
