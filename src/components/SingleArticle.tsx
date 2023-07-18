import { NewsArticle } from "../types";

const SingleArticle: React.FC<{ article: NewsArticle }> = ({ article }) => (
  <div>
    <h2>{article.title}</h2>
    <p>Date: {article.story_date}</p>
    <p>{article.excerpt}</p>
    <p>{article.story_content}</p>
    <p>Author: {article.author.name}</p>
    <p>Email: {article.author.email}</p>
    <p>Phone: {article.author.phone}</p>
    <p>Upvotes: {article.ratings.upvotes}</p>
    <p>Downvotes: {article.ratings.downvotes}</p>
    <p>Rating: {article.ratings.rating}</p>

    <hr />
  </div>
);

export default SingleArticle;
