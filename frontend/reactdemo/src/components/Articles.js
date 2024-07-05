import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const KnowledgeBase = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [allArticles, setAllArticles] = useState([]);
  const [token, setToken] = useState('');
  const navigate = useNavigate();
  
  useEffect(() => {
    // Fetch initial search results and all articles on component mount
    fetchSearchResults();
    fetchAllArticles();
    // Retrieve token from localStorage
    const storedToken = localStorage.getItem('token');
    setToken(storedToken);
  }, [navigate]);

  useEffect(() => {
    // Fetch all articles when the token changes
    if (token) {
      fetchAllArticles();
    }
  }, [token]);

  const fetchSearchResults = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/knowledge-base/search', {
        params: { q: searchTerm },
        headers: { Authorization: `Bearer ${token}` }
      });
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error searching articles:', error);
    }
  };

  const fetchAllArticles = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/knowledge-base/', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAllArticles(response.data);
    } catch (error) {
      console.error('Error fetching all articles:', error);
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    fetchSearchResults();
  };

  const handleFetchAllArticles = async () => {
    fetchAllArticles();
  };

  const categorizeArticles = () => {
    const categorizedArticles = {};
    allArticles.forEach(article => {
      if (categorizedArticles[article.category]) {
        categorizedArticles[article.category].push(article);
      } else {
        categorizedArticles[article.category] = [article];
      }
    });
    return categorizedArticles;
  };

  return (
    <>
  <div className="container py-5">
    <h1 className="mb-4">Welcome to HelpDesk Pro</h1>
    <form onSubmit={handleSearchSubmit} className="mb-3">
      <div className="input-group">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search articles..."
          className="form-control"
        />
        <button type="submit" className="btn btn-primary">Search</button>
      </div>
    </form>
    <button className="btn btn-primary mb-3" onClick={handleFetchAllArticles}>Fetch All Articles</button>
    {searchResults.length > 0 && (
      <div className="card ">
        <div className="card-body">
          <h2 className="card-title">Search Results</h2>
          <ul className="list-group">
            {searchResults.map(article => (
              <li key={article._id} className="list-group-item">
                <div>
                  <h3>{article.title}</h3>
                  <p>{article.content}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )}
    {Object.entries(categorizeArticles()).map(([category, articles]) => (
      <div key={category} className="card mt-3">
        <div className="card-header bg-primary text-white text-center">
          <h2 className="card-title">{category}</h2>
        </div>
        <div className="card-body">
          <div className="row row-cols-1 row-cols-md-2 g-4">
            {articles.map(article => (
              <div key={article._id} className="col">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title text-center">{article.title}</h5>
                    <p className="card-text">{article.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    ))}
  </div>
</>

  );
};

export default KnowledgeBase;
