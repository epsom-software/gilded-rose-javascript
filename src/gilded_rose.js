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

function updateItem(item) {
  if (item.name === "Sulfuras, Hand of Ragnaros") {
    return;
  }

  const isConjured = item.name.includes("Conjured ");
  const normalisedName = item.name.replace("Conjured ", "");

  item.sell_in = item.sell_in - 1;
  const isExpired = item.sell_in < 0;

  const changeQuality = (() => {
    if (normalisedName === "Aged Brie") {
      return isExpired ? 2 : 1;
    } else if (normalisedName === "Backstage passes to a TAFKAL80ETC concert") {
      return isExpired
        ? -item.quality
        : item.sell_in < 5
        ? 3
        : item.sell_in < 10
        ? 2
        : 1;
    }
    return isExpired ? -2 : -1;
  })();

  const multiplier = isConjured && changeQuality < 0 ? 2 : 1;
  const nextQuality = item.quality + changeQuality * multiplier;
  item.quality = Math.min(Math.max(nextQuality, 0), 50);
}
