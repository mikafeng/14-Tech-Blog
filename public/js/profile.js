const newFormHandler = async (event) => {
    event.preventDefault();

    const name = document.querySelector('#post-name').value.trim();
    const text = document.querySelector('#post-text').value.trim();

    if (name && text) {
        const response = await fetch('/api/post', {
            method: 'POST',
            body: JSON.stringify({ name, text}),
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
