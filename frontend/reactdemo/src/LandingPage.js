// LandingPage.js
import React, { useState } from 'react';
import axios from 'axios';

const LandingPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    axios.get(`http://localhost:3001/api/knowledge-base/search`, { params: { q:searchTerm } })
      .then(response => {
        setSearchResults(response.data);
      })
      .catch(error => {
        console.error('Error searching articles:', error);
      });
  };

  return (
    <div>
      <h1>Welcome to HelpDesk Pro</h1>
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search articles..."
        />
        <button type="submit">Search</button>
      </form>
      {searchResults.length > 0 && (
        <div>
          <h2>Search Results</h2>
          <ul>
            {searchResults.map(article => (
              <li key={article.id}>
                <a href={`/knowledge-base/${article.id}`}>{article.title}</a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
