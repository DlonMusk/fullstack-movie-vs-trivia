// import router and user model
const router = require('express').Router();
const { User, Game } = require('../../models/index');

// route to sign up a new user and save information to the session
router.post('/', async (req, res) => {
    try{

        const userDataDb = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }); 


        req.session.save(() => {
            req.session.logged_in = true,
            req.session.user_id = userDataDb.dataValues.id,
            req.session.username = userDataDb.dataValues.name,
            res.status(200).json(userDataDb)
        })

        // add games to user
        await Game.create({
            title: 'Revenue',
            user_id: userDataDb.dataValues.id,
            image: 'https://m.media-amazon.com/images/M/MV5BMWFmYmRiYzMtMTQ4YS00NjA5LTliYTgtMmM3OTc4OGY3MTFkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_.jpg'
        });

        await Game.create({
            title: 'Rating',
            user_id: userDataDb.dataValues.id,
            image: 'https://upload.wikimedia.org/wikipedia/en/9/92/2001_A_Space_Odyssey_%28soundtrack%29.jpeg'
        })

    } catch (err) {
        res.status(500).json(err);
    }
})

// route to login a user and save their informatin to the session 
router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({where: {email: req.body.email}});

        if(!userData){
            res
               .status(400)
               .json({message: 'Incorrect E-mail or Password, please try again'});

            return;
        }

        const userPassword = await userData.checkPassword(req.body.password);

        if(!userPassword){
            res
               .status(400)
               .json({message: 'Incorrect E-mail or Password, please try again'});

            return;
        }

        req.session.save(() => {
            req.session.user_id = userData.id,
            req.session.logged_in = true,
            req.session.username = userData.dataValues.name,

            res.json({user: userData, message: 'You are now logged in!'});
        })
    }
    catch (err) {
        res.status(400).json(err);
    }

});

// route to logout current user and destroy their session
router.post('/logout', (req, res) => {
    if(req.session.logged_in){
        req.session.destroy(() => {
            res.status(204).end()
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;
