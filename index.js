const dotenv = require('dotenv');
const Sequelize = require("sequelize");
const calculateCargo = require('./calculateCargo');

dotenv.config({ path: `${__dirname}/.env` });

const db = require('./db')

db.authenticate()
  .then(() => {
    console.log(`connected to ${db.config.database} successfully!`)

    //You can adjust deci and price in here
    calculateCargo(Sequelize, db, 0, 175)
  }
  )
  .catch((err) =>
    console.log(`unable to connect ${db.config.database}!`, err.message)
  );

