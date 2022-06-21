const sequelize = require('./db');

const persoana = require('./models/persoane');
const masina = require('./models/masini');

sequelize
    .sync()
    .then((result) => {
        console.log(result);
    }).catch((err) => {
        console.log(err);
    })