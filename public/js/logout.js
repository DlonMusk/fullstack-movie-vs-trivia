// function to handle user logout by calling the logout endpoint then sending the user back to the login screen on a click event
const logoutHandler = async () => {
    const response = await fetch('/api/users/logout', {
        method: 'POST',
        headers: {'content-type': 'application/json'}
    });


    if(response.ok){
        document.location.replace('/login');
    } else {
        alert("FAILED LOGGING OUT");
    }
}

document.querySelector('#logout').addEventListener('click', logoutHandler);