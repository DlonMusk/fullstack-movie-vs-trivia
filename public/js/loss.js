const routeToHome = () => {
    document.location.replace('/');
}

const routeToPlayAgain = () => {
    document.location.replace(`/game/${game_title}`)
}

const game_title = document
    .querySelector('.game-title')
    .getAttribute('data-gameTitle').trim();

document
    .querySelector('.play-again')
    .addEventListener('click', routeToPlayAgain);

document
    .querySelector('.home-page')
    .addEventListener('click', routeToHome);
