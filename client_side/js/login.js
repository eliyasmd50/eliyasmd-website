const form = document.getElementById('form');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    let error_display = document.getElementById('error_display');
    form.reset();
    console.log(email);
    console.log(password);

    try {
        console.log("into the server");
        const response = await fetch('http://localhost:3000/v2/login', {
            method: "post",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email, password: password})
        })

        const result = await response.json();

        if(response.ok) {
            console.log("successfully routed");
            window.location.href = '/client_side/index.html';
        } else {
            error_display.textContent = result.message;
        }
    } catch (error) {
        console.log(`Error: ${error.message}`);
        error_display.textContent = `Error: ${error.message}`;
    }

// to remove all the form data after executing the method
    //action="http://localhost:3000/v2/login"
})