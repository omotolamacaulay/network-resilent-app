import React, { useState, useEffect } from 'react';
import { faker } from '@faker-js/faker';

interface NewsArticle {
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

interface NewsData {
  news: NewsArticle[];
}

const NewsComponent: React.FC = () => {
  const [newsData, setNewsData] = useState<NewsData>({ news: [] });
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    const generateNewsData = () => {
      const data: NewsData = { news: [] };
      for (let i = 1; i <= 120; i++) {
        const newsArticle: NewsArticle = {
          id: i.toString(),
          story_date: faker.date.past().toISOString().split('T')[0],
          title: faker.lorem.sentence(),
          excerpt: faker.lorem.sentence(),
          story_content: faker.lorem.paragraphs(),
          author: {
            name: faker.person.fullName(),
            email: faker.internet.email(),
            phone: faker.phone.number(),
          },
          ratings: {
            upvotes: Number(faker.string.numeric()),
            downvotes: Number(faker.string.numeric()),
            rating: faker.number.float({ min: 1, max: 5, precision: 0.1 }),
          },
        };

        data.news.push(newsArticle);
      }
      setNewsData(data);
    };

    generateNewsData();
  }, []);
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredNews = newsData.news.filter((article) => {
    const { title, author } = article;
    const { name, email } = author;
    const searchLowercase = searchQuery.toLowerCase();
    return (
      title.toLowerCase().includes(searchLowercase) ||
      name.toLowerCase().includes(searchLowercase) ||
      email.toLowerCase().includes(searchLowercase)
    );
  });
  return (
    <div>
      <h1>News Articles</h1>
      <input
        type="text"
        placeholder="Search articles..."
        value={searchQuery}
        onChange={handleSearch}
      />
      {filteredNews.map((article) => (
        <div key={article.id}>
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
      ))}
    </div>
  );
};

export default NewsComponent;
