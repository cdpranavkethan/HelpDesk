// routes/knowledgeBaseRoutes.js (Express.js routes)
const express = require('express');
const router = express.Router();
const knowledgeBaseController = require('../contollers/knowledgeBase.controller');

// Middleware to parse request body
router.use(express.urlencoded({ extended: true }));
router.use(express.json());

// GET all articles
router.get('/', knowledgeBaseController.getAllArticles);

// Search articles
router.get('/search', knowledgeBaseController.searchArticles);

// GET a single article by ID
// router.get('/:id', knowledgeBaseController.getArticleById);

// POST a new article
router.post('/', knowledgeBaseController.createArticle);

// UPDATE an existing article
router.put('/:id', knowledgeBaseController.updateArticle);

// DELETE an article
router.delete('/:id', knowledgeBaseController.deleteArticle);

module.exports = router;
