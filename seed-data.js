const EXPIRATION_DATE = new Date('01/01/2024').toISOString();
const bcrypt = require('bcrypt');

const products = [
  {
    productName: 'Prada Juul',
    productDescription: 'Happy Halloween!',
    productImage:
      'https://di2ponv0v5otw.cloudfront.net/posts/2019/11/23/5dd9e1ee9ed36dee46aac908/m_5dd9e21d21cd0a2f4b5215ef.jpg',
    inventory: 100,
    unitPrice: 899.99,
    tags: 'Accessory'
  },
  {
    productName: 'Prada Juul',
    productDescription: 'Happy Halloween!',
    productImage:
      'https://cdn.shopify.com/s/files/1/1998/2969/products/red_goyard_300x300.jpg?v=1550867492',
    inventory: 100,
    unitPrice: 899.99,
    tags: 'Accessory'
  },
  {
    productName: 'Fendi Juul',
    productDescription: 'Happy Halloween!',
    productImage:
      'https://cdn.shopify.com/s/files/1/2879/9822/products/juul-wraps-color-fendi-juul-skin-1.jpg?v=1556908550',
    inventory: 100,
    unitPrice: 899.99,
    tags: 'Accessory'
  },
  {
    productName: 'Louis Vuitton Juul',
    productDescription: 'Happy Halloween!',
    productImage:
      'https://cdn.shopify.com/s/files/1/1998/2969/products/LVblack_1024x1024@2x.png?v=1550866604',
    inventory: 100,
    unitPrice: 899.99,
    tags: 'Accessory'
  },
  {
    productName: 'Alpine Berry',
    productDescription:
      'Sweet sweet alpine berry.\nEach JUULpod contains ~0.7mL with 5 % nicotine by weight',
    productImage:
      'https://d1q4q7ketxgxfn.cloudfront.net/media/catalog/product/cache/9f8d2b6c4380d79b762744d4373a4f38/j/u/ju-ju-po-ab-20-pg-juul-alpine-berry-refill-pods-20mg.jpg',
    inventory: 100,
    unitPrice: 15.99,
    tags: 'Pod'
  },
  {
    productName: 'Juul Costume',
    productDescription: 'Happy Halloween!',
    productImage:
      'https://www.collegemagazine.com/wp-content/uploads/2018/10/IMG_38C3DE209E48-1.jpeg',
    inventory: 100,
    unitPrice: 399.99,
    tags: 'Accessory'
  },
  {
    productName: 'Juul Super Charger',
    productDescription: 'Stay super charged!',
    productImage:
      'https://cdn.shopify.com/s/files/1/1448/7344/products/fuul-tech-portable-juul-charger-2.jpg?v=1556100516',
    inventory: 100,
    unitPrice: 56.99,
    tags: 'Charger'
  },
  {
    productName: 'Juul Gucci',
    productDescription: 'Gucci!',
    productImage:
      'https://images-na.ssl-images-amazon.com/images/I/81Lw0GW5FDL._SY355_.jpg',
    inventory: 100,
    unitPrice: 899.99,
    tags: 'Accessory'
  },
  {
    productName: 'Juul necklace',
    productDescription: 'Cool necklace!',
    productImage:
      'https://images-na.ssl-images-amazon.com/images/I/41PB0a0fcoL.jpg',
    inventory: 100,
    unitPrice: 40.0,
    tags: 'Accessory'
  },
  {
    productName: 'Juul carry case',
    productDescription: 'Carry the squad!',
    productImage:
      'https://ae01.alicdn.com/kf/HTB1B8TneBKw3KVjSZTEq6AuRpXaJ.jpg',
    inventory: 100,
    unitPrice: 14.99,
    tags: 'Accessory'
  },
  {
    productName: 'Starter Kit',
    productDescription: 'Get off on the right foot!',
    productImage:
      'https://rfdtv.images.worldnow.com/images/18863480_G.jpg?lastEditedDate=1571327249000',
    inventory: 100,
    unitPrice: 14.99,
    tags: 'Device'
  },
  {
    productName: 'Juulboro',
    productDescription: 'Surprise your friends!',
    productImage:
      'https://studybreaks.com/wp-content/uploads/2018/12/1543603673631.jpg',
    inventory: 100,
    unitPrice: 14.99,
    tags: 'Device'
  },
  {
    productName: 'Juulboro',
    productDescription: 'Surprise your friends!',
    productImage:
      'https://studybreaks.com/wp-content/uploads/2018/12/1543603673631.jpg',
    inventory: 100,
    unitPrice: 14.99,
    tags: 'Device'
  },
  {
    productName: 'Slate Juul Device',
    productDescription:
      'For adult smokers seeking a satisfying alternative to cigarettes. The slate JUUL Device comes with a USB Charging Dock and a one year limited device warranty. JUULpods are not included.',
    productImage:
      'https://assets.juul.com/ctf/images/tc11z0kp0vll/23AlDSR8FzdEh27XPLOIBe/340def934dc9b9afe7be0b8fd8863a28/US_EN_Slate_-_Product_Page_Header_4x.png?w=860&h=860&fit=pad&bg=rgb:ffffff&fm=jpg',
    inventory: 100,
    unitPrice: 14.99,
    tags: 'Device'
  },
  {
    productName: 'Silver Juul Device',
    productDescription:
      'For adult smokers seeking a satisfying alternative to cigarettes. The silver JUUL Device comes with a USB Charging Dock and a one year limited device warranty. JUULpods are not included.',
    productImage:
      'https://assets.juul.com/ctf/images/tc11z0kp0vll/774ZFJS70DstldqhYirmW4/a87b9323d445c3849a5dba568559c4a9/US_EN_Silver_-_Product_Page_Header_4x.png?w=860&h=860&fit=pad&bg=rgb:ffffff&fm=jpg',
    inventory: 100,
    unitPrice: 14.99,
    tags: 'Device'
  },
  {
    productName: 'LIMITED EDITION AQUA JUUL DEVICE',
    productDescription:
      'For adult smokers seeking a satisfying alternative to cigarettes. The limited edition aqua JUUL Device comes with a USB Charging Dock and a one year limited device warranty. JUULpods are not included.',
    productImage:
      'https://assets.juul.com/ctf/images/dtbhzmanuqgb/58pmW8ZOMVKIdSVaR94Sb7/3aa7de751b3bfeffb59d8852deeb56e2/US_AQUA_STANDUP.png?w=860&h=860&fit=pad&bg=rgb:ffffff&fm=jpg',
    inventory: 100,
    unitPrice: 19.99,
    tags: 'Device'
  },
  {
    productName: 'LIMITED EDITION ONYX JUUL DEVICE',
    productDescription:
      'For adult smokers seeking a satisfying alternative to cigarettes. The Limited Edition Onyx JUUL Device comes with a USB Charging Dock and a one year limited device warranty. JUULpods are not included.',
    productImage:
      'https://assets.juul.com/ctf/images/dtbhzmanuqgb/1eUPlwtX5K3NveOc0Hxyzc/580ac725e7252fa74523fb7fc43babeb/US_EN_Onyx_-_Product_Page_Header_RMA_4x.png?w=860&h=860&fit=pad&bg=rgb:ffffff&fm=jpg',
    inventory: 100,
    unitPrice: 19.99,
    tags: 'Device'
  },
  {
    productName: 'VIRGINIA TOBACCO',
    productDescription:
      'Rich flavor of American tobacco.\nEach JUULpod contains ~0.7mL with 5 % nicotine by weight',
    productImage:
      'https://assets.juul.com/ctf/images/dtbhzmanuqgb/6xAIDq2yTSc06MOwmSMuG4/943d51f85d8e5051ae37c3e80e1b7cb7/US_EN_Virginia_Tobacco_-_Product_Page_Header_v1.5_-_4_Pods_4x.png?w=860&h=860&fit=pad&bg=rgb:ffffff&fm=jpg',
    inventory: 100,
    unitPrice: 15.99,
    tags: 'Pod'
  },
  {
    productName: 'CLASSIC TOBACCO',
    productDescription:
      'Rich flavor of American tobacco.\nEach JUULpod contains ~0.7mL with 5 % nicotine by weight',
    productImage:
      'https://assets.juul.com/ctf/images/dtbhzmanuqgb/6PhsT5q4mWSIYCaksQQaqg/911d65c4f157dd3598f7adc8fee880e1/US_EN_Classic_Tobacco_-_Product_Page_Header_v1.5_-_4_Pods_4x.png?w=860&h=860&fit=pad&bg=rgb:ffffff&fm=jpg',
    inventory: 100,
    unitPrice: 15.99,
    tags: 'Pod'
  },
  {
    productName: 'MENTHOL',
    productDescription:
      'Traditional menthol flavor with a brisk finish.\nEach JUULpod contains ~0.7mL with 5 % nicotine by weight.',
    productImage:
      'https://assets.juul.com/ctf/images/dtbhzmanuqgb/4W33rIGvsAGkUC0smYOWkE/3543d8e73db91d41b22bef17e4df4766/US_EN_Menthol_-_Product_Page_Header_v1.5_-_4_Pods_4x.png?w=860&h=860&fit=pad&bg=rgb:ffffff&fm=jpg',
    inventory: 100,
    unitPrice: 15.99,
    tags: 'Pod'
  },
  {
    productName: 'USB CHARGING DOCK',
    productDescription: 'In case you need a spare.',
    productImage:
      'https://assets.juul.com/ctf/images/dtbhzmanuqgb/2qIR02nGZOcMOS6Ks4wYMg/4fe636d3863783511c5d08cd9e61ed62/CH_GR_-_Product_Gallery_4x.png?w=860&h=860&fit=pad&bg=rgb:ffffff&fm=jpg',
    inventory: 100,
    unitPrice: 5.99,
    tags: 'Charger'
  },
  {
    productName: 'PORTABLE CHARGING CASE',
    productDescription:
      'The JUUL Portable Charging Case allows you to charge your JUUL Device while you’re on the go.',
    productImage:
      'https://assets.juul.com/ctf/images/dtbhzmanuqgb/73BzDrSyfTizeMkn3M7R4g/f06cef50bdc4c33a0020ab669a6323f9/juul-chargingcase-front.png?w=860&h=860&fit=pad&bg=rgb:ffffff&fm=jpg',
    inventory: 100,
    unitPrice: 5.99,
    tags: 'Accessory'
  }
];

const users = [
  {
    userType: 'Admin',
    email: 'cissy5120@gmail.com',
    password: bcrypt.hashSync('123', 10),
    lastName: 'Bai',
    firstName: 'Cissy',
    phone: 2122222222,
    shippingAddress: '5 Hanover Square',
    shippingCity: 'New York',
    shippingState: 'NY',
    shippingZip: '10001',
    cardNumber: bcrypt.hashSync('4242424242424242', 10),
    cardHolder: 'Cissy Bae',
    expirationDate: EXPIRATION_DATE,
    securityCode: bcrypt.hashSync('123', 10),
    billingAddress: '5 Hanover Square',
    billingCity: 'New York',
    billingState: 'NY',
    billingZip: '10001'
  },
  {
    userType: 'Admin',
    email: 'nries1@gmail.com',
    password: bcrypt.hashSync('123', 10),
    lastName: 'Ries',
    firstName: 'Nicolas',
    phone: 2122222222,
    shippingAddress: '5 Hanover Square',
    shippingCity: 'New York',
    shippingState: 'NY',
    shippingZip: '10001',
    cardNumber: bcrypt.hashSync('4242424242424242', 10),
    cardHolder: 'Nicolas Ries',
    expirationDate: EXPIRATION_DATE,
    securityCode: bcrypt.hashSync('123', 10),
    billingAddress: '5 Hanover Square',
    billingCity: 'New York',
    billingState: 'NY',
    billingZip: '10001'
  },
  {
    userType: 'Admin',
    email: 'orockshel@gmail.com',
    password: bcrypt.hashSync('123', 10),
    lastName: 'Orlock',
    firstName: 'Shel',
    phone: 2122222222,
    shippingAddress: '5 Hanover Square',
    shippingCity: 'New York',
    shippingState: 'NY',
    shippingZip: '10001',
    cardNumber: bcrypt.hashSync('4242424242424242', 10),
    cardHolder: 'Shel Orlock',
    expirationDate: EXPIRATION_DATE,
    securityCode: bcrypt.hashSync('123', 10),
    billingAddress: '5 Hanover Square',
    billingCity: 'New York',
    billingState: 'NY',
    billingZip: '10001'
  },
  {
    userType: 'Admin',
    email: 'raymond.ng47@gmail.com',
    password: bcrypt.hashSync('123', 10),
    lastName: 'Ng',
    firstName: 'Raymond',
    phone: 2122222222,
    shippingAddress: '5 Hanover Square',
    shippingCity: 'New York',
    shippingState: 'NY',
    shippingZip: '10001',
    cardNumber: bcrypt.hashSync('4242424242424242', 10),
    cardHolder: 'Raymon Ng',
    expirationDate: EXPIRATION_DATE,
    securityCode: bcrypt.hashSync('123', 10),
    billingAddress: '5 Hanover Square',
    billingCity: 'New York',
    billingState: 'NY',
    billingZip: '10001'
  },
  {
    userType: 'Existing customer',
    email: 'mojo.jojo@gmail.com',
    password: bcrypt.hashSync('123', 10),
    lastName: 'Jojo',
    firstName: 'Mojo',
    phone: 2122222222,
    shippingAddress: '5 Hanover Square',
    shippingCity: 'New York',
    shippingState: 'NY',
    shippingZip: '10001',
    cardNumber: bcrypt.hashSync('4242424242424242', 10),
    cardHolder: 'Mojo Jojo',
    expirationDate: EXPIRATION_DATE,
    securityCode: bcrypt.hashSync('123', 10),
    billingAddress: '5 Hanover Square',
    billingCity: 'New York',
    billingState: 'NY',
    billingZip: '10001'
  }
];

module.exports = {
  users,
  products
};
