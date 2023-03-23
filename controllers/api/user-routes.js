const router = require('express').Router();
// const { User } = require('../../models');

//create a new user
router.get('/', (req, res) => {
    // Here, index.html is rendered
    res.send('success')
});

// router.post('/', async (req, res) => {
//     try {
//         const dbUserData = await User.create({
//             username: req.body.username,
//             email: req.body.email,
//             password: req.body.password
//         });
//         res.status(200).json({message: 'okayyyy'})
//     } catch (err) {
//         console.log(err)
//     }
// })

module.exports = router;

