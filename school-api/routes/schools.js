const express = require('express');
const router = express.Router();

const { addSchool, listSchools } = require('../controllers/schoolController');
const { addSchoolRules, listSchoolsRules, validate } = require('../middleware/validators');

router.post('/addSchool', addSchoolRules, validate, addSchool);
router.get('/listSchools', listSchoolsRules, validate, listSchools);

module.exports = router;