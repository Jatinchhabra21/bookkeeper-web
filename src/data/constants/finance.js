const PER_DAY_FINANCE = [
  {
    Date: '27-02-2023',
    Amount: 1276,
  },
  {
    Date: '28-02-2023',
    Amount: 207.75,
  },
  {
    Date: '01-03-2023',
    Amount: 1650,
  },
  {
    Date: '02-03-2023',
    Amount: 72,
  },
  {
    Date: '03-03-2023',
    Amount: 392,
  },
  {
    Date: '04-03-2023',
    Amount: 908,
  },
  {
    Date: '05-03-2023',
    Amount: 1114,
  },
  {
    Date: '06-03-2023',
    Amount: 5238,
  },
  {
    Date: '07-03-2023',
    Amount: 384,
  },
  {
    Date: '08-03-2023',
    Amount: 189,
  },
  {
    Date: '09-03-2023',
    Amount: 28,
  },
  {
    Date: '10-03-2023',
    Amount: 452,
  },
  {
    Date: '11-03-2023',
    Amount: 169,
  },
  {
    Date: '12-03-2023',
    Amount: 161,
  },
  {
    Date: '13-03-2023',
    Amount: 312,
  },
  {
    Date: '14-03-2023',
    Amount: 232,
  },
  {
    Date: '15-03-2023',
    Amount: 365,
  },
  {
    Date: '16-03-2023',
    Amount: 267,
  },
];

const CATEGORY_FINANCE = [
  {
    Category: 'Commute',
    Amount: 478,
  },
  {
    Category: 'Food',
    Amount: 2175.75,
  },
  {
    Category: 'Grocery',
    Amount: 719,
  },
  {
    Category: 'Living',
    Amount: 7913,
  },
  {
    Category: 'Self',
    Amount: 2131,
  },
];

const CATEGORY_FINANCE_BY_WEEK = [
  {
    Category: 'Commute',
    Amount: 75,
  },
  {
    Category: 'Food',
    Amount: 250,
  },
  {
    Category: 'Grocery',
    Amount: 400,
  },
  {
    Category: 'Living',
    Amount: 2000,
  },
];

const RAW_FINANCE_DATA = [
  {
    Date: '30-01-2023',
    Expense: 'Highlighter, sticky notes',
    Category: 'Self',
    Amount: 525,
  },
  {
    Date: '30-01-2023',
    Expense: 'Book, water softner',
    Category: 'Self',
    Amount: 697,
  },
  {
    Date: '31-01-2023',
    Expense: 'Rapido',
    Category: 'Commute',
    Amount: 27,
  },
  {
    Date: '31-01-2023',
    Expense: 'Milk',
    Category: 'Grocery',
    Amount: 51,
  },
  {
    Date: '01-02-2023',
    Expense: 'Maintenance',
    Category: 'Living',
    Amount: 1650,
  },
  {
    Date: '30-01-2023',
    Expense: 'Breakfast',
    Category: 'Food',
    Amount: 25,
  },
  {
    Date: '30-01-2023',
    Expense: 'Veg Roll',
    Category: 'Food',
    Amount: 29,
  },
  {
    Date: '31-01-2023',
    Expense: 'Breakfast',
    Category: 'Food',
    Amount: 46,
  },
  {
    Date: '31-01-2023',
    Expense: 'Lunch',
    Category: 'Food',
    Amount: 50,
  },
  {
    Date: '31-01-2023',
    Expense: 'Colddrink',
    Category: 'Food',
    Amount: 20,
  },
  {
    Date: '31-01-2023',
    Expense: 'Snacks',
    Category: 'Food',
    Amount: 13.75,
  },
  {
    Date: '02-02-2023',
    Expense: 'Milk',
    Category: 'Grocery',
    Amount: 72,
  },
  {
    Date: '03-02-2023',
    Expense: 'Chai',
    Category: 'Food',
    Amount: 10,
  },
  {
    Date: '03-02-2023',
    Expense: 'Lunch',
    Category: 'Food',
    Amount: 50,
  },
  {
    Date: '03-02-2023',
    Expense: 'Momo',
    Category: 'Food',
    Amount: 50,
  },
  {
    Date: '03-02-2023',
    Expense: 'Milk + Aluminum Foil',
    Category: 'Grocery',
    Amount: 102,
  },
  {
    Date: '03-02-2023',
    Expense: 'RO',
    Category: 'Living',
    Amount: 150,
  },
  {
    Date: '03-02-2023',
    Expense: 'Onions and Chillies',
    Category: 'Grocery',
    Amount: 30,
  },
  {
    Date: '04-02-2023',
    Expense: 'Milk + Tomato',
    Category: 'Grocery',
    Amount: 27,
  },
  {
    Date: '04-02-2023',
    Expense: 'Skin care',
    Category: 'Self',
    Amount: 798,
  },
  {
    Date: '04-02-2023',
    Expense: 'Basket',
    Category: 'Living',
    Amount: 60,
  },
  {
    Date: '04-02-2023',
    Expense: 'Auto',
    Category: 'Commute',
    Amount: 23,
  },
  {
    Date: '05-02-2023',
    Expense: 'Gas',
    Category: 'Living',
    Amount: 542,
  },
  {
    Date: '05-02-2023',
    Expense: 'Refrigerator + Washing machine',
    Category: 'Living',
    Amount: 525,
  },
  {
    Date: '05-02-2023',
    Expense: 'Milk + Sugar + Chilli powder',
    Category: 'Grocery',
    Amount: 47,
  },
  {
    Date: '06-02-2023',
    Expense: 'Snacks',
    Category: 'Food',
    Amount: 30,
  },
  {
    Date: '06-02-2023',
    Expense: 'Tape',
    Category: 'Self',
    Amount: 52,
  },
  {
    Date: '06-02-2023',
    Expense: 'rent  + cook',
    Category: 'Living',
    Amount: 4986,
  },
  {
    Date: '06-02-2023',
    Expense: 'Snacks',
    Category: 'Food',
    Amount: 110,
  },
  {
    Date: '06-02-2023',
    Expense: 'Breakfast',
    Category: 'Food',
    Amount: 50,
  },
  {
    Date: '06-02-2023',
    Expense: 'Milk',
    Category: 'Grocery',
    Amount: 10,
  },
  {
    Date: '07-02-2023',
    Expense: 'Breakfast',
    Category: 'Food',
    Amount: 25,
  },
  {
    Date: '07-02-2023',
    Expense: 'Juice',
    Category: 'Food',
    Amount: 30,
  },
  {
    Date: '07-02-2023',
    Expense: 'Milk',
    Category: 'Grocery',
    Amount: 17,
  },
  {
    Date: '07-02-2023',
    Expense: 'BigBasket',
    Category: 'Grocery',
    Amount: 152,
  },
  {
    Date: '07-02-2023',
    Expense: 'Fried rice',
    Category: 'Food',
    Amount: 160,
  },
  {
    Date: '08-02-2023',
    Expense: 'Breakfast',
    Category: 'Food',
    Amount: 25,
  },
  {
    Date: '08-02-2023',
    Expense: 'Milk',
    Category: 'Grocery',
    Amount: 13,
  },
  {
    Date: '08-02-2023',
    Expense: 'Potatoes',
    Category: 'Grocery',
    Amount: 20,
  },
  {
    Date: '08-02-2023',
    Expense: 'Late night snack',
    Category: 'Food',
    Amount: 131,
  },
  {
    Date: '09-02-2023',
    Expense: 'Tomato + Cauliflower + Milk',
    Category: 'Grocery',
    Amount: 28,
  },
  {
    Date: '10-02-2023',
    Expense: 'Milk',
    Category: 'Grocery',
    Amount: 13,
  },
  {
    Date: '10-02-2023',
    Expense: 'Breakfast',
    Category: 'Food',
    Amount: 21,
  },
  {
    Date: '10-02-2023',
    Expense: 'Evening tea',
    Category: 'Food',
    Amount: 15,
  },
  {
    Date: '11-02-2023',
    Expense: 'Breakfast',
    Category: 'Food',
    Amount: 60,
  },
  {
    Date: '11-02-2023',
    Expense: 'Colddrink',
    Category: 'Food',
    Amount: 15,
  },
  {
    Date: '11-02-2023',
    Expense: 'Milk',
    Category: 'Grocery',
    Amount: 39,
  },
  {
    Date: '11-02-2023',
    Expense: 'Bun Tikki',
    Category: 'Food',
    Amount: 30,
  },
  {
    Date: '10-02-2023',
    Expense: 'Train',
    Category: 'Commute',
    Amount: 403,
  },
  {
    Date: '11-02-2023',
    Expense: 'Uber',
    Category: 'Commute',
    Amount: 25,
  },
  {
    Date: '12-02-2023',
    Expense: 'Milk',
    Category: 'Grocery',
    Amount: 17,
  },
  {
    Date: '12-02-2023',
    Expense: 'Dinner',
    Category: 'Food',
    Amount: 103,
  },
  {
    Date: '12-02-2023',
    Expense: 'Breakfast',
    Category: 'Food',
    Amount: 41,
  },
  {
    Date: '13-02-2023',
    Expense: 'Breakfast',
    Category: 'Food',
    Amount: 25,
  },
  {
    Date: '13-02-2023',
    Expense: 'Spotify',
    Category: 'Self',
    Amount: 59,
  },
  {
    Date: '13-02-2023',
    Expense: 'Lunch',
    Category: 'Food',
    Amount: 80,
  },
  {
    Date: '13-02-2023',
    Expense: 'Colddrink',
    Category: 'Food',
    Amount: 20,
  },
  {
    Date: '13-02-2023',
    Expense: 'Chai',
    Category: 'Food',
    Amount: 10,
  },
  {
    Date: '13-02-2023',
    Expense: 'Milk',
    Category: 'Grocery',
    Amount: 13,
  },
  {
    Date: '13-02-2023',
    Expense: 'Dinner',
    Category: 'Food',
    Amount: 105,
  },
  {
    Date: '14-02-2023',
    Expense: 'Breakfast',
    Category: 'Food',
    Amount: 25,
  },
  {
    Date: '14-02-2023',
    Expense: 'Lunch',
    Category: 'Food',
    Amount: 50,
  },
  {
    Date: '14-02-2023',
    Expense: 'Maggi + Milk',
    Category: 'Grocery',
    Amount: 54,
  },
  {
    Date: '14-02-2023',
    Expense: 'Dinner',
    Category: 'Food',
    Amount: 103,
  },
  {
    Date: '15-02-2023',
    Expense: 'Lunch',
    Category: 'Food',
    Amount: 80,
  },
  {
    Date: '15-02-2023',
    Expense: 'sweets',
    Category: 'Food',
    Amount: 235,
  },
  {
    Date: '16-02-2023',
    Expense: 'Dinner',
    Category: 'Food',
    Amount: 82,
  },
  {
    Date: '16-02-2023',
    Expense: 'Pizza',
    Category: 'Food',
    Amount: 171,
  },
  {
    Date: '16-02-2023',
    Expense: 'Milk',
    Category: 'Grocery',
    Amount: 14,
  },
  {
    Date: '15-02-2023',
    Expense: 'Kachori',
    Category: 'Food',
    Amount: 50,
  },
];

const BUDGET = 14000;

export {
  PER_DAY_FINANCE,
  CATEGORY_FINANCE,
  CATEGORY_FINANCE_BY_WEEK,
  BUDGET,
  RAW_FINANCE_DATA,
};
