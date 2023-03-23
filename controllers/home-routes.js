const router = require('express').Router();

// This is the 'get' route 
router.get('/', async (req, res) => {
    // Here, index.html is rendered
    res.render('homepage');
});

module.exports = router;