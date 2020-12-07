const data = require('../shared/data');

module.exports = async function (context, req) {
  const hero = {
    id: parseInt(req.params.id, 10),
    name: req.body.name,
    description: req.body.description,
  };

  try {
    const updatedVillain = data.updateHero(villain);
    context.res.status(200).json(updatedVillain);
  } catch (error) {
    context.res.status(500).send(error);
  }
};
