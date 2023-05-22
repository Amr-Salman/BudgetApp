const express = require('express');
const budgetController = require('../controllers/budgetController');
const router = express.Router();

router.get('/', budgetController.getAllBudgets);
router.get('/:id', budgetController.getBudget);
router.post('/', budgetController.createBudget);
router.patch('/:id', budgetController.updateBudget);
router.delete('/:id', budgetController.deleteBudget);

module.exports = router;
