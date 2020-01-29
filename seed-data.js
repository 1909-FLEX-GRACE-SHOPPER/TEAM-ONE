const EXPIRATION_DATE = new Date("01/01/2024").toISOString();

const products = [
  {
    productName: "Slate Juul Device",
    productDescription:
      "For adult smokers seeking a satisfying alternative to cigarettes. The slate JUUL Device comes with a USB Charging Dock and a one year limited device warranty. JUULpods are not included.",
    productImage:
      "https://assets.juul.com/ctf/images/tc11z0kp0vll/23AlDSR8FzdEh27XPLOIBe/340def934dc9b9afe7be0b8fd8863a28/US_EN_Slate_-_Product_Page_Header_4x.png?w=860&h=860&fit=pad&bg=rgb:ffffff&fm=jpg",
    inventory: 100,
    unitPrice: 14.99
  },
  {
    productName: "Silver Juul Device",
    productDescription:
      "For adult smokers seeking a satisfying alternative to cigarettes. The silver JUUL Device comes with a USB Charging Dock and a one year limited device warranty. JUULpods are not included.",
    productImage:
      "https://assets.juul.com/ctf/images/tc11z0kp0vll/774ZFJS70DstldqhYirmW4/a87b9323d445c3849a5dba568559c4a9/US_EN_Silver_-_Product_Page_Header_4x.png?w=860&h=860&fit=pad&bg=rgb:ffffff&fm=jpg",
    inventory: 100,
    unitPrice: 14.99
  },
  {
    productName: "LIMITED EDITION AQUA JUUL DEVICE",
    productDescription:
      "For adult smokers seeking a satisfying alternative to cigarettes. The limited edition aqua JUUL Device comes with a USB Charging Dock and a one year limited device warranty. JUULpods are not included.",
    productImage:
      "https://assets.juul.com/ctf/images/dtbhzmanuqgb/58pmW8ZOMVKIdSVaR94Sb7/3aa7de751b3bfeffb59d8852deeb56e2/US_AQUA_STANDUP.png?w=860&h=860&fit=pad&bg=rgb:ffffff&fm=jpg",
    inventory: 100,
    unitPrice: 19.99
  },
  {
    productName: "LIMITED EDITION ONYX JUUL DEVICE",
    productDescription:
      "For adult smokers seeking a satisfying alternative to cigarettes. The Limited Edition Onyx JUUL Device comes with a USB Charging Dock and a one year limited device warranty. JUULpods are not included.",
    productImage:
      "https://assets.juul.com/ctf/images/dtbhzmanuqgb/1eUPlwtX5K3NveOc0Hxyzc/580ac725e7252fa74523fb7fc43babeb/US_EN_Onyx_-_Product_Page_Header_RMA_4x.png?w=860&h=860&fit=pad&bg=rgb:ffffff&fm=jpg",
    inventory: 100,
    unitPrice: 19.99
  },
  {
    productName: "VIRGINIA TOBACCO",
    productDescription:
      "Rich flavor of American tobacco.\nEach JUULpod contains ~0.7mL with 5 % nicotine by weight",
    productImage:
      "https://assets.juul.com/ctf/images/dtbhzmanuqgb/6xAIDq2yTSc06MOwmSMuG4/943d51f85d8e5051ae37c3e80e1b7cb7/US_EN_Virginia_Tobacco_-_Product_Page_Header_v1.5_-_4_Pods_4x.png?w=860&h=860&fit=pad&bg=rgb:ffffff&fm=jpg",
    inventory: 100,
    unitPrice: 15.99
  },
  {
    productName: "CLASSIC TOBACCO",
    productDescription:
      "Rich flavor of American tobacco.\nEach JUULpod contains ~0.7mL with 5 % nicotine by weight",
    productImage:
      "https://assets.juul.com/ctf/images/dtbhzmanuqgb/6PhsT5q4mWSIYCaksQQaqg/911d65c4f157dd3598f7adc8fee880e1/US_EN_Classic_Tobacco_-_Product_Page_Header_v1.5_-_4_Pods_4x.png?w=860&h=860&fit=pad&bg=rgb:ffffff&fm=jpg",
    inventory: 100,
    unitPrice: 15.99
  },
  {
    productName: "MENTHOL",
    productDescription:
      "Traditional menthol flavor with a brisk finish.\nEach JUULpod contains ~0.7mL with 5 % nicotine by weight.",
    productImage:
      "https://assets.juul.com/ctf/images/dtbhzmanuqgb/4W33rIGvsAGkUC0smYOWkE/3543d8e73db91d41b22bef17e4df4766/US_EN_Menthol_-_Product_Page_Header_v1.5_-_4_Pods_4x.png?w=860&h=860&fit=pad&bg=rgb:ffffff&fm=jpg",
    inventory: 100,
    unitPrice: 15.99
  },
  {
    productName: "USB CHARGING DOCK",
    productDescription: "In case you need a spare.",
    productImage:
      "https://assets.juul.com/ctf/images/dtbhzmanuqgb/2qIR02nGZOcMOS6Ks4wYMg/4fe636d3863783511c5d08cd9e61ed62/CH_GR_-_Product_Gallery_4x.png?w=860&h=860&fit=pad&bg=rgb:ffffff&fm=jpg",
    inventory: 100,
    unitPrice: 5.99
  },
  {
    productName: "PORTABLE CHARGING CASE",
    productDescription:
      "The JUUL Portable Charging Case allows you to charge your JUUL Device while you’re on the go.",
    productImage:
      "https://assets.juul.com/ctf/images/dtbhzmanuqgb/73BzDrSyfTizeMkn3M7R4g/f06cef50bdc4c33a0020ab669a6323f9/juul-chargingcase-front.png?w=860&h=860&fit=pad&bg=rgb:ffffff&fm=jpg",
    inventory: 100,
    unitPrice: 5.99
  }
];

const users = [
  {
    userType: "Admin",
    email: "cissy5120@gmail.com",
    password: "123",
    lastName: "Bae",
    firstName: "Cissy",
    phone: 2122222222,
    shippingAddress: "5 Hanover Square",
    shippingCity: "New York",
    shippingState: "NY",
    shippingZip: "10001",
    cardNumber: "4242424242424242",
    cardHolder: "Cissy Bae",
    expirationDate: EXPIRATION_DATE,
    securityCode: "123",
    billingAddress: "5 Hanover Square",
    billingCity: "New York",
    billingState: "NY",
    billingZip: "10001",
    loggedIn: false
  },
  {
    userType: "Admin",
    email: "nries1@gmail.com",
    password: "123",
    lastName: "Ries",
    firstName: "Nicolas",
    phone: 2122222222,
    shippingAddress: "5 Hanover Square",
    shippingCity: "New York",
    shippingState: "NY",
    shippingZip: "10001",
    cardNumber: "4242424242424242",
    cardHolder: "Nicolas Ries",
    expirationDate: EXPIRATION_DATE,
    securityCode: "123",
    billingAddress: "5 Hanover Square",
    billingCity: "New York",
    billingState: "NY",
    billingZip: "10001",
    loggedIn: false
  },
  {
    userType: "Admin",
    email: "orockshel@gmail.com",
    password: "123",
    lastName: "Orlock",
    firstName: "Shel",
    phone: 2122222222,
    shippingAddress: "5 Hanover Square",
    shippingCity: "New York",
    shippingState: "NY",
    shippingZip: "10001",
    cardNumber: "4242424242424242",
    cardHolder: "Shel Orlock",
    expirationDate: EXPIRATION_DATE,
    securityCode: "123",
    billingAddress: "5 Hanover Square",
    billingCity: "New York",
    billingState: "NY",
    billingZip: "10001",
    loggedIn: false
  },
  {
    userType: "Admin",
    email: "raymond.ng47@gmail.com",
    password: "123",
    lastName: "Ng",
    firstName: "Raymond",
    phone: 2122222222,
    shippingAddress: "5 Hanover Square",
    shippingCity: "New York",
    shippingState: "NY",
    shippingZip: "10001",
    cardNumber: "4242424242424242",
    cardHolder: "Raymon Ng",
    expirationDate: EXPIRATION_DATE,
    securityCode: "123",
    billingAddress: "5 Hanover Square",
    billingCity: "New York",
    billingState: "NY",
    billingZip: "10001",
    loggedIn: false
  },
  {
    userType: "Existing customer",
    email: "mojo.jojo@gmail.com",
    password: "123",
    lastName: "Jojo",
    firstName: "Mojo",
    phone: 2122222222,
    shippingAddress: "5 Hanover Square",
    shippingCity: "New York",
    shippingState: "NY",
    shippingZip: "10001",
    cardNumber: "4242424242424242",
    cardHolder: "Mojo Jojo",
    expirationDate: EXPIRATION_DATE,
    securityCode: "123",
    billingAddress: "5 Hanover Square",
    billingCity: "New York",
    billingState: "NY",
    billingZip: "10001",
    loggedIn: false
  }
];

const carts = [
  {
    productQuantity: 2
    // productId: "26e00b4f-9957-46c6-a6e5-85045b0bbf32"
    // userId: "a829f92e-bffa-4f1f-aaa0-fd3906fe02dc"
  },
  {
    productQuantity: 3
    // productId: "3e2481d0-49f3-4a28-b7a2-3641e795ef43",
    // userId: "54be1173-b525-4158-840d-0b4c02f8afb8"
  }
];

module.exports = {
  users,
  products,
  carts
};
