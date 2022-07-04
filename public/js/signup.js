// function to handle a new user signup by grabing user data from inputs and making a call to the api on a submit event
const signupFormHandler = async (event) => {
    event.preventDefault();

    const name = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    console.log(name, email, password);
    console.log("HERE")
    if(name && email && password){
        const response = await fetch('/api/users/', {
            method: 'POST',
            body: JSON.stringify({name, email, password}),
            headers: {'content-type': 'application/json'}
        });

        if(response.ok){
            document.location.replace('/');
        } else {
            alert('Failed to sign up');
        }
    }

}

document
    .querySelector('.signup-form')
    .addEventListener('submit', signupFormHandler);

document
    .querySelector('.style-sheet')
    .setAttribute('href', '/css/signup.css');