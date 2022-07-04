const routeToHome = () => {
    document.location.replace('/');
}

const routeToPlayAgain = () => {
    document.location.replace(`/game/${game_id}`)
}

const game_id = document
    .querySelector('.game-id')
    .getAttribute('data-gameId');

document
    .querySelector('.play-again')
    .addEventListener('click', routeToPlayAgain);

document
    .querySelector('.home-page')
    .addEventListener('click', routeToHome);
