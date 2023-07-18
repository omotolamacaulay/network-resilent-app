import React, { useState, useEffect } from "react";
import { faker } from "@faker-js/faker";
import Search from "./Search";
import { NewsArticle, NewsData } from "../types";
import NewsArticleItem from "./NewsArticleItem";
// import ReactPaginate from "react-paginate";

const NewsComponent: React.FC = () => {
  const [newsData, setNewsData] = useState<NewsData>({ news: [] });
  const [searchQuery, setSearchQuery] = useState<string>("");
  // const [pageCount, setPageCount] = useState(0);
  // const [itemOffset, setItemOffset] = useState(0);
  // const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    const generateNewsData = () => {
      const storedArticles = localStorage.getItem("articles");
      if (storedArticles) {
        const parsedArticles: NewsData = JSON.parse(storedArticles);
        setNewsData(parsedArticles);
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
        // const items = data.news
        // const endOffset = itemOffset + itemsPerPage;
        // setNewsData(items.slice(itemOffset, endOffset));
        // setPageCount(Math.ceil(newsData.news.length / itemsPerPage));
      }
    };

    generateNewsData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const handlePageClick = (event: any) => {
  //   const newOffset = (event.selected * itemsPerPage) % newsData.news.length;
  //   setItemOffset(newOffset);
  // };
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
  // const selectPageCount = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   setItemsPerPage(+e.currentTarget.value);
  // };
  return (
    <div>
      <h1>News Articles</h1>
      <Search value={searchQuery} onChange={handleSearch} />
      {filteredNews.map((article) => (
        <NewsArticleItem key={article.id} article={article} />
      ))}
      {/* <div className="pagination_wrapper">
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

        {filteredNews.length > 0 && (
          <div className="select-box">
            <span>
              Showing out
              <span>
                <label htmlFor="pageitems" hidden></label>
                <select
                  className="pageitems"
                  name="page Items"
                  id="pageitems"
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    selectPageCount(e)
                  }
                >
                  <option value="10">{itemsPerPage}</option>
                  <option value="20">20</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </select>
              </span>
              of {filteredNews.length}
            </span>
          </div>
        )}
      </div> */}
    </div>
  );
};

export default NewsComponent;
