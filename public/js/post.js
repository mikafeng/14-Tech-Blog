const newFormHandler = async (event) => {
    event.preventDefault();

    const comment = document.querySelector('#post-comment').value.trim();

    if (comment) {
        const response = await fetch(`/api/comment`, {
            method: 'POST',
            body: JSON.stringify({ comment }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            //redierect to home with updated post comment
            document.location.replace('/homepage');
        } else {
            alert('Failed to create post');
        }
    }}

    //maybe redirect to single post page commented on?