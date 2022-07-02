const router = require('express').Router();
const { User, Game } = require('../models');
const withAuth = require('../utils/auth');

// load game select screen
router.get('/', async (req, res) => {
    try {
        const gamesData = await Game.findAll();

        if(gamesData.length > 0){
            const games = gamesData.map(game => game.get({plain: true}));
            res.render('gameSelect', { games, logged_in: req.session.logged_in })
        } else {

            const user = await User.create({
                name: 'rahn',
                email: 'rahn@hotmail.com',
                password: '12345678'
            });
            
            const game1 = await Game.create({
                title: 'Ratings VS',
                user_id: req.session.user_id,
                image: 'https://assets.nautil.us/5408_0678ca2eae02d542cc931e81b74de122.jpg'
            });

            const game2 = await Game.create({
                title: 'all time gross VS',
                user_id: req.session.user_id,
                image: 'https://m.media-amazon.com/images/M/MV5BMWFmYmRiYzMtMTQ4YS00NjA5LTliYTgtMmM3OTc4OGY3MTFkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_.jpg'
            }) 

            const gamesData = await Game.findAll({include: [{model: User}]});

            const games = gamesData.map(game => game.get({plain: true}));

            res.render('gameSelect', {games, logged_in: req.session.logged_in})
        }


    } catch (err) {
        res.status(500).json(err);
    }
});


// random data array, pass index as id
// load game screen if logged in
router.get('/game/:id', async (req, res) => {
    if(req.params.id == 1){
        res.render('revenue');
    }
});

router.get('/loss', (req, res) => {
    res.render('loss');
})

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/signup', (req, res) => {
    res.render('signup');
});



module.exports = router;