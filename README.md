## Tech-Blog

A CMS style blog using a MVC framework that revolves around users sharing their thoughts on tech.

## Desription

The landing page of the tech blog shows any exisitng posts by users. 

Navigation is served by express routes where users can sign up, log in, log out and visit their dashboard where they can create/delete/and comment on posts. 

Once a user signs up, their login information will be saved safely on the server side using a mysql database with encrypted passwords. 


# Installation
 
To utilize the blog framework, clone the repo to you local environment.

You will need the following dependencies, which are in the package.json file.
    `bcrypt`
    `connect-session-sequelize`
    `dotenv`
    `express`
    `express-handlebars`
    `express-session`
    `mysql2`
    `nodemon`
    `sequelize`

Run `npm i` at the project root to install needed dependencies and create your own .env file with database credentials.
Run `npm start` to start the server.
The default port is 3000 and will run on http://localhost:3000/.

# Preview
