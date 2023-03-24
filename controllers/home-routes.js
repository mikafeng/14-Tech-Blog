const router = require('express').Router();
const { Post, User } = require('../models');

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

//GET profile page for user
router.get('/profile', async (req, res) => {
    try{
        const userData = await User.findByPk(req.session.user_id, {
            attributes: {exclude: ['password']},
            include: [{model: Post}],
        });

        // const user = userData.get({plain: true});

        res.render('profile' 
        // , { ..user,
        // logged_in:}
            );
    } catch (err) {
        res.status(500).json(err);
    }
});
module.exports = router;