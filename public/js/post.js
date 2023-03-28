const newFormHandler = async (event) => {
    event.preventDefault();

    const comment = document.querySelector('#post-comment').value.trim();

    if (comment) {
        const response = await fetch(`/api/projects`, {
            method: 'POST',
            body: JSON.stringify({ name, needed_funding, description }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            document.location.replace('/profile');
        } else {
            alert('Failed to create project');
        }
    }}