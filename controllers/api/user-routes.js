const router = require('express').Router();
const { User } = require('../../models');

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

router.get('/:id', (req, res) => {
    User.findOne({
        attributes: {exclude: ['password']},
        where: {
            id: req.params.id
        }
    })
    res.status(200).json(userData)
    .cath(err => {
        console.log('user not found')
        console.log(err);
        res.status(500).json(err);
    })
})

//SIGNUP
router.post('/', (req, res) => {
    User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })
    .then(userData => {
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.name = userData.name;
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
        const userData = await User.findOne({
            where: {
                email: req.body.email,
            },
        });

        if (!userData) {
            res.status(400)
            .json({message: 'Nope. Try Again.'});
            return;
        }

        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400)
            .json({ message : 'Password aint right' });
            return;
        }

        req.session.save(() => {
            req.session.loggedIn = true;

            res.status(200)
            .json({user: userData, message: 'You did it! Welcome.'});
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});




module.exports = router;

