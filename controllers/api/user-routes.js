const router = require('express').Router();
const { User } = require('../../models');

//Get all users
router.get('/', (req, res) => {
    User.findAll({
        attributes: { exclude: ['password']}
    })
    .then(userData => res.json(userData))
    .catch(err => {
        console.log('no users found');
        console.log(err);
    res.status(500).json(err)});
});

//Get one user by ID
router.get('/:id', (req, res) => {
    User.findOne({
        attributes: {exclude: ['password']},
        where: {
            id: req.params.id
        }
    })
    .then(userData => res.json(userData))
    .catch(err => {
        console.log('user not found')
        console.log(err);
        res.status(500).json(err);
    });
});

//SIGNUP
router.post('/', (req, res) => {
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
    .then(userData => {
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.name = userData.username;
            req.session.logged_in = true;

            res.json(userData);
        });
    })
    .catch(err => {
        console.log('unable to create user');
        console.log(err);
        res.status(500).json(err);
    })
});

//LOGIN
router.post('/login', async (req, res) => {
    try{
        const userData = await User.findOne({ where: { email: req.body.email}});

        if (!userData) {
            res.status(400).json({message: 'User not found.'});
            return;
        }

        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({ message : 'Incorrect password' });
            return;
        }
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.json({message: "You are now logged in!" });
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

//LOGOUT
router.post('./logout', (req, res) => {
    if(req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
})


module.exports = router;

