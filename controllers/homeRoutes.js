const router = require('express').Router();
const { User, Game } = require('../models');
const withAuth = require('../utils/auth');

// load game select screen
router.get('/', withAuth, async (req, res) => {
    try {
        const gamesData = await Game.findAll({where: {user_id: req.session.user_id}});

        if (gamesData.length > 0) {
            const games = gamesData.map(game => game.get({ plain: true }));
            res.render('gameSelect', { games, logged_in: req.session.logged_in })
        }

    } catch (err) {
        res.status(500).json(err);
    }
});


// random data array, pass index as id
// load game screen if logged in
router.get('/game/:game', withAuth, async (req, res) => {
    console.log('HERE', req.params.game);
    if (req.params.game.trim() == 'Revenue') {
        res.render('game', { revenue: true });
    } else if( req.params.game == 'Raiting'){
        res.render('game', {raiting: true} )
    }


});

router.get('/loss/:score/:title', withAuth, async (req, res) => {
    let index = 0;
    const score = req.params.score;
    const title = req.params.title;

    if(title == 'Revenue') index = 0;
    else if(title == 'Raiting') index = 1;

    const userData = await User.findByPk(req.session.user_id, {
        include: [{ model: Game }]
    });


    const user = userData.get({ plain: true });

    console.log(user);

    const high_score = user.games[index].high_score;

    const gameToUpdate = await Game.findByPk(user.games[index].id);

    if (score > high_score) {
        console.log(gameToUpdate);
        await gameToUpdate.update({
            high_score: score
        });
    }

    const game = gameToUpdate.get({ plain: true })


    res.render('loss', { username: user.name, high_score: game.high_score, score: req.params.score, game_title: title });
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/signup', (req, res) => {
    res.render('signup');
});



module.exports = router;