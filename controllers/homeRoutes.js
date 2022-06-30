const router = require('express').Router();
const { User, Game } = require('../models');

// load game select screen
router.get('/', async (req, res) => {
    try {
        const gamesData = Game.findAll();

        const games = gamesData.map(game => game.get({plain: true}));

        res.render('gameSelect', { games, logged_in: req.session.logged_in })
    } catch (err) {
        res.status(500).json(err);
    }
});

// load game screen if logged in
router.get('/game', async (req, res) => {

});

module.exports = router;