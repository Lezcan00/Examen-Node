const express = require('express');
const { getItems, createItem, updateItem, deleteItem } = require('../controllers/itemController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();


router.get('/', getItems);

router.post('/', authMiddleware, createItem);
router.put('/:id', authMiddleware, updateItem);
router.delete('/:id', authMiddleware, deleteItem);

module.exports = router;

