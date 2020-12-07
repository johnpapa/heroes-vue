const data = require('../shared/data');

module.exports = async function (context, req) {
  try {
    const villains = data.getVillains();
    context.res.status(200).json(villains);
  } catch (error) {
    context.res.status(500).send(error);
  }
};
