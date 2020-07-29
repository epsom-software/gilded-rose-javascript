function Item(name, sell_in, quality) {
  this.name = name;
  this.sell_in = sell_in;
  this.quality = quality;
}

var items = [];

items.push(new Item("+5 Dexterity Vest", 10, 20));
items.push(new Item("Aged Brie", 2, 0));
items.push(new Item("Elixir of the Mongoose", 5, 7));
items.push(new Item("Sulfuras, Hand of Ragnaros", 0, 80));
items.push(new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20));
items.push(new Item("Conjured Mana Cake", 3, 6));

function update_quality() {
  items.forEach(updateItem);
}

const products = [
  {
    name: "Sulfuras, Hand of Ragnaros",
    isLegendary: true,
  },
  {
    name: "Aged Brie",
    changeQuality: (isExpired) => (isExpired ? 2 : 1),
  },
  {
    name: "Backstage passes to a TAFKAL80ETC concert",
    changeQuality: (isExpired, item) =>
      isExpired
        ? -item.quality
        : item.sell_in < 5
        ? 3
        : item.sell_in < 10
        ? 2
        : 1,
  },
  {
    name: "Conjured Mana Cake",
    changeQuality: (isExpired) => (isExpired ? -4 : -2),
  },
];

const defaultProduct = {
  name: "default",
  changeQuality: (isExpired) => (isExpired ? -2 : -1),
};

function updateItem(item) {
  const product =
    products.find(({ name }) => name === item.name) || defaultProduct;

  if (product.isLegendary) return;

  item.sell_in -= 1;
  const isExpired = item.sell_in < 0;
  const nextQuality = item.quality + product.changeQuality(isExpired, item);
  item.quality = Math.min(Math.max(nextQuality, 0), 50);
}
