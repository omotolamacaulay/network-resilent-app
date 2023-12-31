import React, { useState, useEffect } from "react";
import { faker } from "@faker-js/faker";
import Search from "./Search";
import { NewsArticle, NewsData } from "../types";
import NewsArticleItem from "./NewsArticleItem";
import ReactPaginate from "react-paginate";

const NewsComponent: React.FC = () => {
  const [newsData, setNewsData] = useState<NewsData>({ news: [] });
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [showFavorites, setShowFavorites] = useState<boolean>(false);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [itemsPerPage] = useState(12);
  const [getFilteredArticles, setGetFilteredArticles] = useState<NewsArticle[]>(
    []
  );
  useEffect(() => {
    const generateNewsData = () => {
      const storedArticles = localStorage.getItem("articles");
      const storedFavorites = localStorage.getItem("favorites");
      if (storedArticles) {
        const parsedArticles: NewsData = JSON.parse(storedArticles);
        setNewsData(parsedArticles);
        if (storedFavorites) {
          const parsedFavorites: string[] = JSON.parse(storedFavorites);
          setFavorites(parsedFavorites);
        }
      } else {
        const data: NewsData = { news: [] };
        for (let i = 1; i <= 125; i++) {
          const newsArticle: NewsArticle = {
            id: i.toString(),
            story_date: faker.date.past().toISOString().split("T")[0],
            title: faker.lorem.sentence(),
            excerpt: faker.lorem.sentence(),
            story_content: faker.lorem.paragraphs(10),
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
        localStorage.setItem("articles", JSON.stringify(data));
      }
    };

    generateNewsData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % newsData.news.length;
    setItemOffset(newOffset);
  };
  const handleSearch = (value: string) => {
    setSearchQuery(value);
  };

  const toggleFavorite = (articleId: string) => {
    setFavorites((prevFavorites) => {
      let favArray: string[] = [];
      const isFavorite = prevFavorites.includes(articleId);
      if (isFavorite) {
        favArray = prevFavorites.filter((id) => id !== articleId);
      } else {
        favArray = [...prevFavorites, articleId];
      }
      localStorage.setItem("favorites", JSON.stringify(favArray));
      return favArray;
    });
  };

  const isFavorite = (articleId: string) => {
    return favorites.includes(articleId);
  };
  useEffect(() => {
    let filteredNews: NewsArticle[] = [];
    if (showFavorites) {
      filteredNews = newsData.news.filter((article) =>
        favorites.includes(article.id)
      );
    } else {
      filteredNews = newsData.news.filter((article) => {
        const { title, author } = article;
        const { name, email } = author;
        const searchLowercase = searchQuery.toLowerCase();

        return (
          title.toLowerCase().includes(searchLowercase) ||
          name.toLowerCase().includes(searchLowercase) ||
          email.toLowerCase().includes(searchLowercase)
        );
      });
    }

    const endOffset = itemOffset + itemsPerPage;
    setGetFilteredArticles(filteredNews.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(newsData.news.length / itemsPerPage));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, newsData, itemOffset, itemsPerPage, showFavorites]);

  return (
    <div>
      <h1>News Articles</h1>
      <Search value={searchQuery} onChange={handleSearch} />
      <div>
        <button
          className="showFavorites"
          onClick={() => setShowFavorites(!showFavorites)}
        >
          {showFavorites ? "Show All Articles" : "Show Favorites"}
        </button>
      </div>
      <div className="card-group">
        {getFilteredArticles.map((article) => (
          <NewsArticleItem
            key={article.id}
            article={article}
            isFavorite={isFavorite(article.id)}
            toggleFavorite={toggleFavorite}
          />
        ))}
      </div>

      <div className="pagination_wrapper">
        <ReactPaginate
          nextLabel=">"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel="<"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item prev"
          previousLinkClassName="page-link"
          nextClassName="page-item next"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
          renderOnZeroPageCount={null}
        />
      </div>
    </div>
  );
};

export default NewsComponent;
