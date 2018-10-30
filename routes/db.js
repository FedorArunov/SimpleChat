const yaml = require('js-yaml');
const fs = require('fs');
const { connection } = yaml.safeLoad(fs.readFileSync('./config.yaml', 'utf8'));
const pgp = require('pg-promise')();
const db = pgp(connection);

module.exports = db;