const Sequelize = require('sequelize');
const db = require('./../database.js');

const { UUID, UUIDV4, STRING, DECIMAL, TEXT, INTEGER } = Sequelize;

const Product = db.define('products', {
  id: {
    primaryKey: true,
    type: UUID,
    defaultValue: UUIDV4,
  },
  productName: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        args: true,
        msg: 'Product name cannot be empty',
      },
      notNull: {
        arg: true,
        msg: 'Product name cannot be null',
      },
    },
  },
  productDescription: {
    type: TEXT,
  },
  unitPrice: {
    type: DECIMAL(10, 2),
    allowNull: false,
  },
  inventory: {
    type: INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  productImage: {
    type: STRING,
    defaultValue: 'No image',
  },
});

module.exports = Product;
