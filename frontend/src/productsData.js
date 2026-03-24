// frontend/src/productsData.js - Novacart-style grocery + electronics products

const productsData = [
  // ============ GROCERY ITEMS ============
  
  // Fruits & Vegetables (department_id: 1, aisle_id: 1)
  {
    id: 1,
    name: "Organic Bananas",
    price: 29,
    originalPrice: 39,
    discount: 25,

    category: "Fruits & Vegetables",
    department: "Fruits",
    image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=300&h=300&fit=crop",
    aisle_id: 1,
    department_id: 1
  },
  {
    id: 2,
    name: "Fresh Red Apples (1kg)",
    price: 189,
    originalPrice: 249,
    discount: 24,

    category: "Fruits & Vegetables",
    department: "Fruits",
    image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=300&h=300&fit=crop",
    aisle_id: 1,
    department_id: 1
  },
  {
    id: 3,
    name: "Baby Spinach (200g)",
    price: 79,
    originalPrice: 99,
    discount: 20,

    category: "Fruits & Vegetables",
    department: "Fruits",
    image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=300&h=300&fit=crop",
    aisle_id: 1,
    department_id: 1
  },
  {
    id: 4,
    name: "Fresh Carrots (500g)",
    price: 45,
    originalPrice: 55,
    discount: 18,

    category: "Fruits & Vegetables",
    department: "Fruits",
    image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=300&h=300&fit=crop",
    aisle_id: 1,
    department_id: 1
  },

  // Dairy & Eggs (department: Fruits, aisle_id: 2)
  {
    id: 5,
    name: "Whole Milk (1L)",
    price: 68,
    originalPrice: 75,
    discount: 10,

    category: "Dairy & Eggs",
    department: "Fruits",
    image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=300&h=300&fit=crop",
    aisle_id: 2,
    department_id: 1
  },
  {
    id: 6,
    name: "Fresh Eggs (12 pack)",
    price: 95,
    originalPrice: 110,
    discount: 14,

    category: "Dairy & Eggs",
    department: "Fruits",
    image: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=300&h=300&fit=crop",
    aisle_id: 2,
    department_id: 1
  },
  {
    id: 7,
    name: "Greek Yogurt (500g)",
    price: 120,
    originalPrice: 150,
    discount: 20,

    category: "Dairy & Eggs",
    department: "Fruits",
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=300&h=300&fit=crop",
    aisle_id: 2,
    department_id: 1
  },
  {
    id: 8,
    name: "Butter (500g)",
    price: 250,
    originalPrice: 280,
    discount: 11,
    category: "Dairy & Eggs",
    department: "Fruits",
    image: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=300&h=300&fit=crop",
    aisle_id: 2,
    department_id: 1
  },

  // Bread & Bakery (department: Fruits, aisle_id: 3)
  {
    id: 9,
    name: "Whole Wheat Bread",
    price: 45,
    originalPrice: 50,
    discount: 10,
    category: "Bread & Bakery",
    department: "Fruits",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300&h=300&fit=crop",
    aisle_id: 3,
    department_id: 1
  },
  {
    id: 10,
    name: "Croissants (4 pack)",
    price: 150,
    originalPrice: 180,
    discount: 17,

    category: "Bread & Bakery",
    department: "Fruits",
    image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=300&h=300&fit=crop",
    aisle_id: 3,
    department_id: 1
  },

  // Beverages (department: Fruits, aisle_id: 4)
  {
    id: 11,
    name: "Orange Juice (1L)",
    price: 120,
    originalPrice: 150,
    discount: 20,

    category: "Beverages",
    department: "Fruits",
    image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=300&h=300&fit=crop",
    aisle_id: 4,
    department_id: 2
  },
  {
    id: 12,
    name: "Mineral Water (1L, 6 pack)",
    price: 90,
    originalPrice: 100,
    discount: 10,

    category: "Beverages",
    department: "Fruits",
    image: "https://images.unsplash.com/photo-1523362628745-0c100150b504?w=300&h=300&fit=crop",
    aisle_id: 4,
    department_id: 2
  },
  {
    id: 13,
    name: "Cold Coffee (250ml)",
    price: 45,
    originalPrice: 55,
    discount: 18,

    category: "Beverages",
    department: "Fruits",
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=300&h=300&fit=crop",
    aisle_id: 4,
    department_id: 2
  },
  {
    id: 14,
    name: "Green Tea (25 bags)",
    price: 80,
    originalPrice: 99,
    discount: 19,

    category: "Beverages",
    department: "Fruits",
    image: "https://images.unsplash.com/photo-1556881286-fc6915169721?w=300&h=300&fit=crop",
    aisle_id: 4,
    department_id: 2
  },

  // Snacks (department_id: 2, aisle_id: 5)
  {
    id: 15,
    name: "Potato Chips (150g)",
    price: 50,
    originalPrice: 60,
    discount: 17,

    category: "Snacks",
    department: "Fruits",
    image: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=300&h=300&fit=crop",
    aisle_id: 5,
    department_id: 2
  },
  {
    id: 16,
    name: "Mixed Nuts (200g)",
    price: 299,
    originalPrice: 399,
    discount: 25,

    category: "Snacks",
    department: "Fruits",
    image: "https://images.unsplash.com/photo-1536816579748-4ecb3f03d72a?w=300&h=300&fit=crop",
    aisle_id: 5,
    department_id: 2
  },
  {
    id: 17,
    name: "Chocolate Cookies (300g)",
    price: 120,
    originalPrice: 150,
    discount: 20,

    category: "Snacks",
    department: "Fruits",
    image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=300&h=300&fit=crop",
    aisle_id: 5,
    department_id: 2
  },

  // Meat & Seafood (department_id: 3, aisle_id: 6)
  {
    id: 18,
    name: "Chicken Breast (1kg)",
    price: 350,
    originalPrice: 420,
    discount: 17,

    category: "Meat & Seafood",
    department: "Fruits",
    image: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=300&h=300&fit=crop",
    aisle_id: 6,
    department_id: 3
  },
  {
    id: 19,
    name: "Fresh Salmon (500g)",
    price: 550,
    originalPrice: 699,
    discount: 21,

    category: "Meat & Seafood",
    department: "Fruits",
    image: "https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?w=300&h=300&fit=crop",
    aisle_id: 6,
    department_id: 3
  },
  {
    id: 20,
    name: "Ground Beef (500g)",
    price: 280,
    originalPrice: 340,
    discount: 18,

    category: "Meat & Seafood",
    department: "Fruits",
    image: "https://images.unsplash.com/photo-1588168333986-5078d3ae3976?w=300&h=300&fit=crop",
    aisle_id: 6,
    department_id: 3
  },

  // Frozen Foods (department_id: 3, aisle_id: 7)
  {
    id: 21,
    name: "Vanilla Ice Cream (1L)",
    price: 250,
    originalPrice: 300,
    discount: 17,
    category: "Frozen Foods",
    department: "Fruits",
    image: "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=300&h=300&fit=crop",
    aisle_id: 7,
    department_id: 3
  },
  {
    id: 22,
    name: "Frozen Peas (500g)",
    price: 89,
    originalPrice: 110,
    discount: 19,
    category: "Frozen Foods",
    department: "Fruits",
    image: "https://images.unsplash.com/photo-1587735243615-c03f25aaff15?w=300&h=300&fit=crop",
    aisle_id: 7,
    department_id: 3
  },

  // ============ ELECTRONICS (department_id: 6) ============
  
  // Smartphones (aisle_id: 12)
  {
    id: 23,
    name: "Apple iPhone 15 (128GB)",
    price: 79999,
    originalPrice: 89999,
    discount: 11,

    category: "Smartphones",
    department: "Electronics",
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=300&h=300&fit=crop",
    aisle_id: 12,
    department_id: 6
  },
  {
    id: 24,
    name: "Samsung Galaxy S24",
    price: 69999,
    originalPrice: 79999,
    discount: 13,

    category: "Smartphones",
    department: "Electronics",
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=300&h=300&fit=crop",
    aisle_id: 12,
    department_id: 6
  },
  {
    id: 25,
    name: "OnePlus 12",
    price: 54999,
    originalPrice: 64999,
    discount: 15,

    category: "Smartphones",
    department: "Electronics",
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=300&h=300&fit=crop",
    aisle_id: 12,
    department_id: 6
  },
  {
    id: 26,
    name: "Redmi Note 13 Pro",
    price: 19999,
    originalPrice: 24999,
    discount: 20,

    category: "Smartphones",
    department: "Electronics",
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300&h=300&fit=crop",
    aisle_id: 12,
    department_id: 6
  },

  // Laptops (aisle_id: 13)
  {
    id: 27,
    name: "MacBook Air M3",
    price: 114900,
    originalPrice: 129900,
    discount: 12,

    category: "Laptops",
    department: "Electronics",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300&h=300&fit=crop",
    aisle_id: 13,
    department_id: 6
  },
  {
    id: 28,
    name: "Dell XPS 15",
    price: 159990,
    originalPrice: 189990,
    discount: 16,
    category: "Laptops",
    department: "Electronics",
    image: "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=300&h=300&fit=crop",
    aisle_id: 13,
    department_id: 6
  },
  {
    id: 29,
    name: "HP Pavilion Laptop",
    price: 65999,
    originalPrice: 79999,
    discount: 18,

    category: "Laptops",
    department: "Electronics",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=300&fit=crop",
    aisle_id: 13,
    department_id: 6
  },
  {
    id: 30,
    name: "Lenovo ThinkPad",
    price: 74999,
    originalPrice: 89999,
    discount: 17,

    category: "Laptops",
    department: "Electronics",
    image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=300&h=300&fit=crop",
    aisle_id: 13,
    department_id: 6
  },

  // Headphones & Audio (aisle_id: 14)
  {
    id: 31,
    name: "Apple AirPods Pro",
    price: 24999,
    originalPrice: 27999,
    discount: 11,

    category: "Headphones",
    department: "Electronics",
    image: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=300&h=300&fit=crop",
    aisle_id: 14,
    department_id: 6
  },
  {
    id: 32,
    name: "Sony WH-1000XM5",
    price: 27990,
    originalPrice: 32990,
    discount: 15,
    category: "Headphones",
    department: "Electronics",
    image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=300&h=300&fit=crop",
    aisle_id: 14,
    department_id: 6
  },
  {
    id: 33,
    name: "Boat Headphones",
    price: 1499,
    originalPrice: 1999,
    discount: 25,

    category: "Headphones",
    department: "Electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop",
    aisle_id: 14,
    department_id: 6
  },
  {
    id: 34,
    name: "JBL Bluetooth Speaker",
    price: 3999,
    originalPrice: 4999,
    discount: 20,

    category: "Audio",
    department: "Electronics",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300&h=300&fit=crop",
    aisle_id: 14,
    department_id: 6
  },

  // Tablets & iPads (aisle_id: 15)
  {
    id: 35,
    name: "iPad Pro 11 inch",
    price: 75999,
    originalPrice: 85999,
    discount: 12,

    category: "Tablets",
    department: "Electronics",
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=300&h=300&fit=crop",
    aisle_id: 15,
    department_id: 6
  },
  {
    id: 36,
    name: "Samsung Galaxy Tab S9",
    price: 54999,
    originalPrice: 64999,
    discount: 15,
    category: "Tablets",
    department: "Electronics",
    image: "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=300&h=300&fit=crop",
    aisle_id: 15,
    department_id: 6
  },

  // Accessories (aisle_id: 16)
  {
    id: 37,
    name: "Wireless Mouse",
    price: 799,
    originalPrice: 999,
    discount: 20,

    category: "Accessories",
    department: "Electronics",
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300&h=300&fit=crop",
    aisle_id: 16,
    department_id: 6
  },
  {
    id: 38,
    name: "USB-C Hub",
    price: 2499,
    originalPrice: 2999,
    discount: 17,

    category: "Accessories",
    department: "Electronics",
    image: "https://images.unsplash.com/photo-1625723044792-44de16ccb4e9?w=300&h=300&fit=crop",
    aisle_id: 16,
    department_id: 6
  },
  {
    id: 39,
    name: "Laptop Bag",
    price: 1299,
    originalPrice: 1599,
    discount: 19,

    category: "Accessories",
    department: "Electronics",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop",
    aisle_id: 16,
    department_id: 6
  },
  {
    id: 40,
    name: "Phone Cover",
    price: 499,
    originalPrice: 699,
    discount: 29,

    category: "Accessories",
    department: "Electronics",
    image: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=300&h=300&fit=crop",
    aisle_id: 16,
    department_id: 6
  },

  // Smart Watches (aisle_id: 17)
  {
    id: 41,
    name: "Apple Watch Series 9",
    price: 41900,
    originalPrice: 46900,
    discount: 11,

    category: "Smart Watches",
    department: "Electronics",
    image: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=300&h=300&fit=crop",
    aisle_id: 17,
    department_id: 6
  },
  {
    id: 42,
    name: "Samsung Galaxy Watch 6",
    price: 28999,
    originalPrice: 34999,
    discount: 17,

    category: "Smart Watches",
    department: "Electronics",
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=300&h=300&fit=crop",
    aisle_id: 17,
    department_id: 6
  },
  {
    id: 43,
    name: "Noise Smart Watch",
    price: 4999,
    originalPrice: 6999,
    discount: 29,

    category: "Smart Watches",
    department: "Electronics",
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=300&h=300&fit=crop",
    aisle_id: 17,
    department_id: 6
  },

  // Cameras (aisle_id: 18)
  {
    id: 44,
    name: "Canon DSLR Camera",
    price: 65999,
    originalPrice: 79999,
    discount: 18,
    category: "Cameras",
    department: "Electronics",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=300&h=300&fit=crop",
    aisle_id: 18,
    department_id: 6
  },
  {
    id: 45,
    name: "Sony Action Camera",
    price: 34990,
    originalPrice: 42990,
    discount: 19,

    category: "Cameras",
    department: "Electronics",
    image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=300&h=300&fit=crop",
    aisle_id: 18,
    department_id: 6
  },

  // Gaming (aisle_id: 19)
  {
    id: 46,
    name: "PS5 Console",
    price: 49990,
    originalPrice: 54990,
    discount: 9,

    category: "Gaming",
    department: "Electronics",
    image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=300&h=300&fit=crop",
    aisle_id: 19,
    department_id: 6
  },
  {
    id: 47,
    name: "Xbox Series X",
    price: 52990,
    originalPrice: 57990,
    discount: 9,
    category: "Gaming",
    department: "Electronics",
    image: "https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=300&h=300&fit=crop",
    aisle_id: 19,
    department_id: 6
  },
  {
    id: 48,
    name: "Gaming Headset",
    price: 2999,
    originalPrice: 3999,
    discount: 25,

    category: "Gaming",
    department: "Electronics",
    image: "https://images.unsplash.com/photo-1599669454699-248893623440?w=300&h=300&fit=crop",
    aisle_id: 19,
    department_id: 6
  },
  {
    id: 49,
    name: "Wireless Controller",
    price: 2499,
    originalPrice: 2999,
    discount: 17,

    category: "Gaming",
    department: "Electronics",
    image: "https://images.unsplash.com/photo-1580327344181-c1163234e5a0?w=300&h=300&fit=crop",
    aisle_id: 19,
    department_id: 6
  },

  // TVs & Monitors (aisle_id: 20)
  {
    id: 50,
    name: "LG 55 inch OLED TV",
    price: 149990,
    originalPrice: 199990,
    discount: 25,

    category: "Televisions",
    department: "Electronics",
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=300&h=300&fit=crop",
    aisle_id: 20,
    department_id: 6
  },
  {
    id: 51,
    name: "Samsung 43 inch LED TV",
    price: 42990,
    originalPrice: 52990,
    discount: 19,
    category: "Televisions",
    department: "Electronics",
    image: "https://images.unsplash.com/photo-1461151304267-38535e780c79?w=300&h=300&fit=crop",
    aisle_id: 20,
    department_id: 6
  },
  {
    id: 52,
    name: "Dell 27 inch Monitor",
    price: 18999,
    originalPrice: 24999,
    discount: 24,

    category: "Monitors",
    department: "Electronics",
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=300&h=300&fit=crop",
    aisle_id: 20,
    department_id: 6
  }
];

export default productsData;
