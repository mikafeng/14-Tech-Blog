const newFormHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#post-title').value.trim();
    const text = document.querySelector('#post-text').value.trim();

    if (title && text) {
        const response = await fetch('/api/posts', {
            method: 'POST',
            body: JSON.stringify({ title, text}),
            headers: { 'Content-Type': 'application/json'}
        });

        if(response.ok) {
            document.location.replace('/profile');
        } else {
            alert('failed to post to dashboard');
        }
    }
};

document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);
