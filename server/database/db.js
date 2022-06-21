module.exports = function dbInit() {
    'use strict';
    return new Promise(function initDb(resolve, reject) {
        const Sequelize = require('sequelize');
        const sequelize = new Sequelize('testapp', 'postgres', 'postpassgresword1427', {
            host: '127.0.0.1',
            dialect: 'postgres'
        });

        sequelize.authenticate().then(() => {
            const db = require('../models')(sequelize, Sequelize);
            resolve(db);
            console.info('Database connection successfully.');
          }).catch(e => reject(e));
    })
};