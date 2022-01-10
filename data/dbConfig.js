const knexImport = require('knex');
const knexConfig = require('../knexfile.js');
const environment = process.env.DB_ENV || 'development';

module.exports = () => knexImport(knexConfig[environment]);
