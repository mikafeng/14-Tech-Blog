const router = require('express').Router();
const { Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

//get posts data
router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            order: [['title', 'ASC']]
        });
    res.status(200).json(postData)
} catch(err) {
        res.status(400).json(err)}
    });

//CREATE POST
router.post('/', withAuth, async (req, res) => {
    try {
        const newPost = await Post.create({
            ...req.body,

            comment_text: req.body.comment_text,
            user_id: req.session.user_id,
        });

        res.status(200).json(newPost);

    } catch (err) {
        res.status(400).json(err);
    }
});

//Comment on post
router.post('/:id/comments', async (req, res) => {
    try {
        const newComment = await Comment.create({
            ...req.body,
            post_id: req.session.post_id,
        });

        res.status(200).json(newComment);
    } catch (err) {
        res.status(400).json(err);
    }
});

//DELETE POST
router.delete ('/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.destroy ({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if(!postData) {
            res.status(404).json({message: 'No post found with that id.'})
            return;
        }

        res.status(200).json(postData);
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;``