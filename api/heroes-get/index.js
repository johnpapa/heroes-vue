const data = require('../shared/data');

module.exports = async function (context, req) {
  try {
    const heroes = data.getHeroes();
    context.res.status(200).json(heroes);
  } catch (error) {
    context.res.status(500).send(error);
  }
};
