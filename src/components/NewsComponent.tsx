import React, { useState, useEffect } from 'react';
import { faker } from '@faker-js/faker';
import Search from './Search';
import { NewsArticle, NewsData } from '../types';
import NewsArticleItem from './NewsArticleItem';


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
  const handleSearch = (value: string) => {
    setSearchQuery(value);
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
      <Search value={searchQuery} onChange={handleSearch} />
      {filteredNews.map((article) => (
        <NewsArticleItem key={article.id} article={article} />
      ))}
    </div>
  );
};

export default NewsComponent;
