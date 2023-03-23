const router = require('express').Router();

// This is the 'get' route 
router.get('/', async (req, res) => {
    // Here, index.html is rendered
    res.render('homepage');
});

router.get('/login', (req, res) => {
    // if (req.session.loggedIn) {
    //     res.redirect('/');
    //     return;
    // }

    res.render('login');
})

module.exports = router;