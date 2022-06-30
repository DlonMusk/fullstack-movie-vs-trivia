// import appropriate libraries
const express = require('express');
const session = require('express-session');
const routes = require('./controllers');
const exphbs = require('express-handlebars');
const path = require('path');
const helpers = require('./utils/helpers');

// import sequelize and create new sequelize store
const sequelize = require('./config/connection');
const sequelizeStore = require('connect-session-sequelize')(session.Store);

// create a new express app and create port
const app = express();
const PORT = process.env.PORT || 3001;

// create a new instance of handlebars and pass in helper functions
const hbs = exphbs.create({helpers});

// set our apps view engine to handlebars
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// set up session parameters
const sess = {
    secret: 'Super secret secret',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new sequelizeStore({
        db: sequelize,
        checkExpirationInterval: 1000 * 10,
        expiration: 1000 * 120
    })
}

// set express app session
app.use(session(sess));

// set middleware for data parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// set middleware for routes
app.use(routes);

//start the sequelize database then start the express app
sequelize.sync({force: false}).then(() => {
    app.listen(PORT, () => console.log(`Now listening at http://localhost:${PORT}`));
});