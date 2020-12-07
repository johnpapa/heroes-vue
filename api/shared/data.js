const data = {
  heroes: [
    {
      id: 10,
      name: 'Aslaug',
      description: 'warrior queen',
    },
    {
      id: 11,
      name: 'Bjorn Ironside',
      description: 'king of 9th century Sweden',
    },
    {
      id: 12,
      name: 'Ivar the Boneless',
      description: 'commander of the Great Heathen Army',
    },
    {
      id: 13,
      name: 'Lagertha the Shieldmaiden',
      description: 'aka Hlaðgerðr',
    },
    {
      id: 14,
      name: 'Ragnar Lothbrok',
      description: 'aka Ragnar Sigurdsson',
    },
    {
      id: 15,
      name: 'Thora Town-hart',
      description: 'daughter of Earl Herrauðr of Götaland',
    },
  ],
  villains: [
    {
      id: 40,
      name: 'Madelyn',
      description: 'the cat whisperer',
    },
    {
      id: 41,
      name: 'Haley',
      description: 'pen wielder',
    },
    {
      id: 42,
      name: 'Ella',
      description: 'fashionista',
    },
    {
      id: 43,
      name: 'Landon',
      description: 'Mandalorian mauler',
    },
  ],
};

const getRandomInt = () => {
  const max = 1000;
  const min = 100;
  return Math.floor(Math.random() * Math.floor(max) + min);
};

const addHero = (hero) => {
  hero.id = getRandomInt();
  data.heroes.push(hero);
  return hero;
};

const updateHero = (hero) => {
  const index = data.heroes.findIndex((v) => v.id === hero.id);
  console.log(hero);
  data.heroes.splice(index, 1, hero);
  return hero;
};

const deleteHero = (id) => {
  const value = parseInt(id, 10);
  data.heroes = data.heroes.filter((v) => v.id !== value);
  return true;
};

const getHeroes = () => {
  return data.heroes;
};

const addVillain = (villain) => {
  villain.id = getRandomInt();
  data.villains.push(villain);
  return villain;
};

const updateVillain = (villain) => {
  const index = data.villains.findIndex((v) => v.id === villain.id);
  console.log(villain);
  data.villains.splice(index, 1, villain);
  return villain;
};

const deleteVillain = (id) => {
  const value = parseInt(id, 10);
  data.villains = data.villains.filter((v) => v.id !== value);
  return true;
};

const getVillains = () => {
  return data.villains;
};

module.exports = {
  addVillain,
  updateVillain,
  deleteVillain,
  getVillains,
  addHero,
  updateHero,
  deleteHero,
  getHeroes,
};
