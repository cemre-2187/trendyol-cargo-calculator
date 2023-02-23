const dotenv = require('dotenv');
const Sequelize = require("sequelize");
const calculateCargo = require('./calculateCargo');

dotenv.config({ path: `${__dirname}/.env` });

const db = require('./db')

db.authenticate()
  .then(() => {
    console.log(`connected to ${db.config.database} successfully!`)

    calculateCargo(Sequelize, db, 101)
  }
  )
  .catch((err) =>
    console.log(`unable to connect ${db.config.database}!`, err.message)
  );
// db.sync({ force: false })
//   // .then(() => console.log(`synced ${db.config.database} successfully!`))
//   .catch((err) =>
//     console.log(`unable to sync ${db.config.database}!`, err.message)
//   );

