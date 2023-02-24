const calculateCargo = async (Sequelize, db, desi, basketTotal) => {
  let cargoPricesForDeci = await db.query(
    `select * from cargoprice where desi=:desi`,
    {
      replacements: { desi: desi },
      raw: true,
      type: Sequelize.QueryTypes.SELECT,
    }
  );
  let cargoPricesForProduct = {}

  const {
    aras,
    mng,
    ptt,
    sendeo,
    surat,
    tex,
    ups,
    yurtici,
    borusan,
    ceva,
    horoz
  } = cargoPricesForDeci[0]

  //Heavy Weight companies is always same with document
  cargoPricesForProduct["borusan"] = borusan
  cargoPricesForProduct["ceva"] = ceva
  cargoPricesForProduct["horoz"] = horoz

  if (basketTotal <= 59.99 && desi <= 10) {
    cargoPricesForProduct["ptt"] = cargoPricesForProduct["tex"] = 9.9946
    cargoPricesForProduct["aras"] = cargoPricesForProduct["surat"] = cargoPricesForProduct["mng"] = cargoPricesForProduct["ups"] = 12.0006
    cargoPricesForProduct["yurtici"] = cargoPricesForProduct["sendeo"] = cargoPricesForProduct["mng"] = 17.995
  } else if (basketTotal >= 60 && basketTotal <= 99.99 && desi <= 10) {
    cargoPricesForProduct["ptt"] = cargoPricesForProduct["tex"] = 23.4938
    cargoPricesForProduct["aras"] = cargoPricesForProduct["surat"] = cargoPricesForProduct["mng"] = cargoPricesForProduct["ups"] = 26.491
    cargoPricesForProduct["yurtici"] = cargoPricesForProduct["sendeo"] = 35.99
  } else {
    cargoPricesForProduct["ptt"] = (desi >= 100) ? ptt + 1450 : ptt
    cargoPricesForProduct["tex"] = (desi >= 100) ? tex + 1450 : tex
    cargoPricesForProduct["aras"] = (desi >= 100) ? aras + 1450 : aras
    cargoPricesForProduct["surat"] = (desi >= 100) ? surat + 1450 : surat
    cargoPricesForProduct["mng"] = (desi >= 100) ? mng + 1450 : mng
    cargoPricesForProduct["ups"] = (desi >= 100) ? ups + 1450 : ups
    cargoPricesForProduct["yurtici"] = (desi >= 100) ? yurtici + 1450 : yurtici
    cargoPricesForProduct["sendeo"] = (desi >= 100) ? sendeo + 1450 : sendeo
  }

  //add KDV with loop, If you remove this loop KDV calculation will be canceled. 
  Object.keys(cargoPricesForProduct).forEach(function (key, index) {
    cargoPricesForProduct[key] = Math.round(cargoPricesForProduct[key] * 1.18 * 100) / 100;
  });

  console.log(cargoPricesForProduct)

}

module.exports = calculateCargo;