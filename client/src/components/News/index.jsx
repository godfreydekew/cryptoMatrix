import React, { useEffect, useState } from "react";
import "./style.scss";

const NewsPage = () => {
  const [newsData, setNewsData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/movers/crypto-news")
      .then((response) => response.json())
      .then((data) => setNewsData(data.news))
      .catch((error) => console.error("Error fetching news:", error));
  }, []);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); 
  };
  
  return (
    <div className="crypto-news-page">
      <header className="header">
        <h1>Crypto Top News</h1>
      </header>

      <div className="news-list">
        {newsData.map((news, index) => (
          <div key={index} className="news-card">
            <div className="news-image">
              <img src={news.thumb_2x} alt={news.title} />
            </div>
            <div className="news-content">
              <h2 className="news-title">
                <a href={news.url} target="_blank" rel="noopener noreferrer">
                  {news.title}
                </a>
              </h2>
              <p className="news-description">
                  {news.description.length > 100 
                    ? news.description.substring(0, 200) + "..." 
                    : news.description}
                </p>
                <div className="news-footer">
                <span className="news-date">{formatDate(news.updated_at)}</span>
               
                <a
                  href={news.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="view-more"
                >
                  View More
                </a>
              </div>
              <br />
               <span className="news-author">By {news.author || "Unknown"}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsPage;
