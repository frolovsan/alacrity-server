'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Games',
      [
        {
          standId: 1,
          name: 'PixelGun',
          duration: 1000,
          price: 70,
          score: 7000,
        },
        {
          standId: 1,
          name: 'PixelGun',
          duration: 1200,
          price: 70,
          score: 9000,
        },
        {
          standId: 1,
          name: 'Dota 2',
          duration: 23000,
          price: 70,
          score: 12300,
        },
        {
          standId: 1,
          name: 'Minecraft',
          duration: 200,
          price: 70,
          score: 700,
        },
        {
          standId: 2,
          name: 'PixelGun',
          duration: 12000,
          price: 70,
          score: 73000,
        },
        {
          standId: 2,
          name: 'Minecraft',
          duration: 12000,
          price: 70,
          score: 71000,
        },
        {
          standId: 3,
          name: 'PixelGun',
          duration: 17000,
          price: 70,
          score: 19000,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Games', null, {});
  },
};
