// Dependencies
const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const sequelize = require('./config/connection');

// Sets up the Express App
const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');


app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
// Sets up the routes
app.use(routes);

// Starts the server to begin listening
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now Listening To Ya'));
});

