// initialize the game variables
let index = 0;

const currentImg = document.querySelector('.current-img');
const currentTitle = document.querySelector('.current');
const currentRevenue = document.querySelector('.current-stat');
const currentScore = document.querySelector('.current-score');
currentScore.innerHTML = 'Score: 0';

const nextImg = document.querySelector('.next-img');
const nextTitle = document.querySelector('.next');

// function to shuffle game data array
const shuffle = (array) => {
    let currentIndex = array.length, randomIndex;

    while (currentIndex != 0) {

        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}


// function to set up the data for the game
const getData = async () => {
    let movieArray = await fetch('https://imdb-api.com/en/API/BoxOfficeAllTime/k_ww4qr6yh', {
        method: 'GET',
        redirect: 'follow'
    }).then(response => response.text())
        .then(result => JSON.parse(result).items)
        .then(obj => shuffle(obj))
        .catch(err => console.error(err));

    return movieArray.map(movie => ({ id: movie.id, title: movie.title, year: movie.year, revenue: movie.worldwideLifetimeGross }));

}


// function to grab image link for game card
const getImg = async (title, image) => {

    await fetch(`https://imdb-api.com/en/API/SearchMovie/k_ww4qr6yh/${title}`, {
        method: 'GET',
        redirect: 'follow'
    }).then(response => response.text())
        .then(result => JSON.parse(result))
        .then(obj => {
            image.src = obj.results[0].image
        });

}





// function for on click event listener to check if user answer is correct
const higher = async () => {
    movies.then(movie => {
        const current = index;
        const next = index + 1

        const currentMovieRevenue = Number(movie[current].revenue.replace(/[^0-9.]/g, ''));
        const nextMovieRevenue = Number(movie[next].revenue.replace(/[^0-9.]/g, ''));

        if (nextMovieRevenue >= currentMovieRevenue) {
            if (movie[next + 1].title) {
                // set current score
                currentScore.innerHTML = `Score: ${index + 1}`;

                // set current info to current nexts info
                getImg(movie[next].title, currentImg);
                currentTitle.innerHTML = movie[next].title;
                currentRevenue.innerHTML = `Box Office: ${movie[next].revenue}`


                // set next movies info to nexts next
                getImg(movie[next + 1].title, nextImg);
                nextTitle.innerHTML = movie[next + 1].title;
            }
            // increment index
            index++;

        } else {
            // loss go to loss screen
            document.location.replace(`/loss/${index}/Revenue`);
        }

    });
}

// function for on click event listener to check if user answer is correct
const lower = async () => {
    movies.then(movie => {
        const current = index;
        const next = index + 1

        const currentMovieRevenue = Number(movie[current].revenue.replace(/[^0-9.]/g, ''))
        const nextMovieRevenue = Number(movie[next].revenue.replace(/[^0-9.]/g, ''))

        if (nextMovieRevenue <= currentMovieRevenue) {
            // change the win loss div to green and unhidden keep it up for 1 second before continuing

            if (movie[next + 1].title) {
                // set current score
                currentScore.innerHTML = `Score: ${index + 1}`;

                // set current info to current nexts info
                getImg(movie[next].title, currentImg);
                currentTitle.innerHTML = movie[next].title;
                currentRevenue.innerHTML = `Box Office: ${movie[next].revenue}`


                // set next movies info to nexts next
                getImg(movie[next + 1].title, nextImg);
                nextTitle.innerHTML = movie[next + 1].title;
            }
            // increment index
            index++;

        } else { // loss go to loss screen
            document.location.replace(`/loss/${index}/Revenue`);
        }

    });
}



document
    .querySelector('.higher')
    .addEventListener('click', higher);

document
    .querySelector('.lower')
    .addEventListener('click', lower);

document
    .querySelector('.style-sheet')
    .setAttribute('href', '/css/gamepage.css');


// set up the game page
const movies = getData();

movies.then(movie => {
    currentTitle.innerHTML = movie[index].title;
    currentRevenue.innerHTML = `Box Office: ${movie[index].revenue}`
    getImg(movie[index].title, currentImg);
});

movies.then(movie => {
    nextTitle.innerHTML = `${movie[index + 1].title}`
    getImg(movie[index + 1].title, nextImg)
});