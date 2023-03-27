const router = require('express').Router();
const { Post, User } = require('../models');


router.get('/', async (req, res) => {
    try{
        const postData = await Post.findAll ({
            order: [['title', 'ASC']]
        });

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render('homepage', {
        posts,
        logged_in: req.session.logged_in
    });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/profile');
        return;
    }

    res.render('login');
});

//GET profile page for user
router.get('/profile/:id', async (req, res) => {
    if(!req.session.loggedIn) {
        res.redirect('/login');
    }
    try{
        const userData = await User.findByPk(req.session.user_id, {
            attributes: {exclude: ['password']},
            include: [{model: Post}],
        });

        const user = userData.get({plain: true});

        res.render('profile', {
            user,
            loggedIn: req.session.loggedIn,
        });

    } catch (err) {
        res.status(500).json(err);
    }
});
module.exports = router;