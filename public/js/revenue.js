
// initialize the game variables
let index = 0;

const currentImg = document.querySelector('.current-img');
const currentTitle = document.querySelector('.current');
const currentRevenue = document.querySelector('.current-revenue');
const currentScore = document.querySelector('.current-score');

const nextImg = document.querySelector('.next-img');
const nextTitle = document.querySelector('.next');


const shuffle = (array) => {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}


// function to set up the data for the game
const getData = async () => {
    let movieArray = await fetch('https://imdb-api.com/en/API/BoxOfficeAllTime/k_3pe08o4k', {
        method: 'GET',
        redirect: 'follow'
    }).then(response => response.text())
        .then(result => JSON.parse(result).items)
        .then(obj => shuffle(obj))
        .catch(err => console.error(err));

    return movieArray.map(movie => ({ id: movie.id, title: movie.title, year: movie.year, revenue: movie.worldwideLifetimeGross }));

}









const getImg = async (title, image) => {

    await fetch(`https://imdb-api.com/en/API/SearchMovie/k_3pe08o4k/${title}`, {
        method: 'GET',
        redirect: 'follow'
    }).then(response => response.text())
        .then(result => JSON.parse(result))
        .then(obj => {
            image.src = obj.results[0].image
        });

}






const higher = async () => {
    movies.then(movie => {
        const current = index;
        const next = index + 1

        const currentMovieRevenue = Number(movie[current].revenue.replace(/[^0-9.]/g, ''))
        const nextMovieRevenue = Number(movie[next].revenue.replace(/[^0-9.]/g, ''))
        if (nextMovieRevenue > currentMovieRevenue) {
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
            alert('WIN')

        } else {
            // check user and set highscore and current score
            document.location.replace(`/loss/${index}/1`);
        }

    });
}

const lower = async () => {

    movies.then(movie => {
        const current = index;
        const next = index + 1

        const currentMovieRevenue = Number(movie[current].revenue.replace(/[^0-9.]/g, ''))
        const nextMovieRevenue = Number(movie[next].revenue.replace(/[^0-9.]/g, ''))
        console.log('HELLO', currentMovieRevenue);
        console.log(nextMovieRevenue);
        if (nextMovieRevenue < currentMovieRevenue) {
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
            alert('WIN')

        } else {
            alert("LOSE")

            document.location.replace(`/loss/${index}/1`);

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