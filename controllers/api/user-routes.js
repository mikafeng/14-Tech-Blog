const router = require('express').Router();
const { User } = require('../../models');


//create a new user
router.post('/', async (req, res) => {
    try {
        const dbUserData = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        });
       
       req.session.save(() => {
           req.session.user_id = dbUserData.id;
           req.session.logged_in = true;
        });
        res.status(200).json(dbUserData);
    } catch (err) {
        console.log(err)
    }
});

//LOGIN
router.post('/login', async (req, res) => {
    try{
        const dbUserData = await User.findOne({
            where: {
                email: req.body.email,
            },
        });

        if (!dbUserData) {
            res.status(400)
            .json({message: 'Nope. Try Again.'});
            return;
        }

        const validPassword = await dbUserData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400)
            .json({ message : 'Password aint right' });
            return;
        }

        req.session.save(() => {
            req.session.loggedIn = true;

            res.status(200)
            .json({user: dbUserData, message: 'You did it! Welcome.'});
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});




module.exports = router;

