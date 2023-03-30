const newCommentHandler = async (event) => {
    event.preventDefault();

    const comment_text = document.querySelector('#post-comment').value.trim();
    if (comment_text) {
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({comment_text}),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            document.location.replace('/post');
        } else {
            alert('failed to post comment');
        }
    }
};

document.querySelector('.new-comment').addEventListener('submit', newCommentHandler);
