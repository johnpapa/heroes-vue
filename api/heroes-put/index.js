const data = require('../shared/data');

module.exports = async function (context, req) {
  const hero = {
    id: parseInt(req.params.id, 10),
    name: req.body.name,
    description: req.body.description,
  };

  try {
    const updatedHero = data.updateHero(hero);
    context.res.status(200).json(updatedHero);
  } catch (error) {
    context.res.status(500).send(error);
  }
};
