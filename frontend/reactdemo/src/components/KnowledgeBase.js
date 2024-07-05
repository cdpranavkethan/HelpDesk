import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const KnowledgeBase = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [newArticleTitle, setNewArticleTitle] = useState('');
  const [newArticleContent, setNewArticleContent] = useState('');
  const [isAddingArticle, setIsAddingArticle] = useState(false);
  const [isEditingArticle, setIsEditingArticle] = useState(false);
  const [articleToEdit, setArticleToEdit] = useState(null);
  const [newArticleCategory, setNewArticleCategory] = useState('');
  const [newArticleTags, setNewArticleTags] = useState('');
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
    // Fetch all articles
    try {
      const response = await axios.get('http://localhost:3001/api/knowledge-base/',{headers: { Authorization: `Bearer ${token}` }});
      setAllArticles(response.data);
    } catch (error) {
      console.error('Error fetching all articles:', error);
    }
  };

  const categorizeArticles = () => {
    // Group articles by category
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

  const handleAddArticle = async () => {
    try {
      // Make a POST request to add the new article
      await axios.post('http://localhost:3001/api/knowledge-base/', {
        title: newArticleTitle,
        content: newArticleContent,
        category: newArticleCategory,
        tags: newArticleTags.split(',').map(tag => tag.trim())
      },{headers: { Authorization: `Bearer ${token}` }});
      // Fetch updated search results after adding the article
      fetchSearchResults();
      // Clear the input fields
      setNewArticleTitle('');
      setNewArticleContent('');
      setNewArticleCategory('');
      setNewArticleTags('');
      // Hide the add article form
      setIsAddingArticle(false);
    } catch (error) {
      console.error('Error adding article:', error);
    }
  };

  const handleEditArticle = async () => {
    try {
      // Make a PUT request to update the article
      await axios.put(`http://localhost:3001/api/knowledge-base/${articleToEdit._id}`, {
        title: newArticleTitle,
        content: newArticleContent
      },{headers: { Authorization: `Bearer ${token}` }});
      // Fetch updated search results after editing the article
      fetchSearchResults();
      // Clear the input fields
      setNewArticleTitle('');
      setNewArticleContent('');
      // Hide the edit article form
      setIsEditingArticle(false);
      setArticleToEdit(null);
    } catch (error) {
      console.error('Error editing article:', error);
    }
  };

  const handleDeleteArticle = async (articleId) => {
    try {
      // Make a DELETE request to delete the article
      await axios.delete(`http://localhost:3001/api/knowledge-base/${articleId}`, {
        headers: { Authorization: `Bearer ${token}` } // Include the token in the request headers
      });
      // Fetch updated search results after deleting the article
      fetchSearchResults();
    } catch (error) {
      console.error('Error deleting article:', error);
    }
  };

  const handleEditButtonClick = (article) => {
    // Set the article to edit and populate the form fields
    setArticleToEdit(article);
    setNewArticleTitle(article.title);
    setNewArticleContent(article.content);
    setIsEditingArticle(true);
  };

  

  return (
    <>
      <div className="container py-5">
        <h1>Welcome to HelpDesk Pro</h1>
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
        {isAddingArticle || isEditingArticle ? (
          <div className="card mb-3">
            <div className="card-body">
              <h2 className="card-title">{isEditingArticle ? 'Edit Article' : 'Add New Article'}</h2>
              <div className="mb-3">
                <label htmlFor="newArticleTitle" className="form-label">Title</label>
                <input
                  type="text"
                  id="newArticleTitle"
                  value={newArticleTitle}
                  onChange={(e) => setNewArticleTitle(e.target.value)}
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="newArticleContent" className="form-label">Content</label>
                <textarea
                  id="newArticleContent"
                  value={newArticleContent}
                  onChange={(e) => setNewArticleContent(e.target.value)}
                  className="form-control"
                  rows="4"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="newArticleCategory" className="form-label">Category</label>
                <input
                  type="text"
                  id="newArticleCategory"
                  value={newArticleCategory}
                  onChange={(e) => setNewArticleCategory(e.target.value)}
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="newArticleTags" className="form-label">Tags (comma-separated)</label>
                <input
                  type="text"
                  id="newArticleTags"
                  value={newArticleTags}
                  onChange={(e) => setNewArticleTags(e.target.value)}
                  className="form-control"
                />
              </div>
              <button
                type="button"
                className="btn btn-primary me-2"
                onClick={isEditingArticle ? handleEditArticle : handleAddArticle}
              >
                {isEditingArticle ? 'Save Changes' : 'Add Article'}
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  setIsAddingArticle(false);
                  setIsEditingArticle(false);
                  setArticleToEdit(null);
                  setNewArticleTitle('');
                  setNewArticleContent('');
                  setNewArticleCategory('');
                  setNewArticleTags('');
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <>
            <button className="btn btn-primary mb-3" onClick={() => setIsAddingArticle(true)}>Add Article</button>
            <button className="btn btn-primary mb-3 ms-3" onClick={handleFetchAllArticles}>Fetch All Articles</button>
          </>
        )}
        {searchResults.length > 0 && (
          <div className="card">
            <div className="card-body">
              <h2 className="card-title">Search Results</h2>
              <ul className="list-group">
                {searchResults.map(article => (
                  <li key={article._id} className="list-group-item d-flex justify-content-between align-items-start">
                    <div>
                      <h3>{article.title}</h3>
                      <p>{article.content}</p>
                    </div>
                    <div className="btn-group">
                      <button
                        type="button"
                        className="btn btn-warning me-2"
                        onClick={() => handleEditButtonClick(article)}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => handleDeleteArticle(article._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
        {allArticles.length > 0 && (
          <div className="card mt-3">
            <div className="card-body">
              <h2 className="card-title">All Articles</h2>
              {Object.entries(categorizeArticles()).map(([category, articles]) => (
                <div key={category}>
                  <h3>{category}</h3>
                  <div className="row row-cols-1 row-cols-md-2 g-4">
                    {articles.map(article => (
                      <div key={article._id} className="col">
                        <div className="card">
                          <div className="card-body text-center">
                            <h5 className="card-title text-center">{article.title}</h5>
                            <p className="card-text">{article.content}</p>
                            <button
                              type="button"
                              className="btn btn-warning me-2"
                              onClick={() => handleEditButtonClick(article)}
                            >
                              Edit
                            </button>
                            <button
                              type="button"
                              className="btn btn-danger"
                              onClick={() => handleDeleteArticle(article._id)}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default KnowledgeBase;