const calculateCargo = async (Sequelize, db, desi) => {
  let cargoPrices = await db.query(
    `select * from cargoprice where desi=:desi`,
    {
      replacements: { desi: desi },
      raw: true,
      type: Sequelize.QueryTypes.SELECT,
    }
  );


}

module.exports = calculateCargo;