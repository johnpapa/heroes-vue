const data = require('../shared/data');

module.exports = async function (context, req) {
  const hero = {
    id: undefined,
    name: req.body.name,
    description: req.body.description,
  };

  try {
    const newHero = data.addHero(hero);
    context.res.status(201).json(newHero);
  } catch (error) {
    context.res.status(500).send(error);
  }
};
