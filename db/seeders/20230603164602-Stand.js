'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Stands',
      [
        {
          address: 'парк Дельфин',
        },
        {
          address: 'парк Донбасс',
        },
        {
          address: 'парк Бахмутск',
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Stands', null, {});
  },
};
