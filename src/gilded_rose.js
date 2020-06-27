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
  for (var i = 0; i < items.length; i++) {
    updateItem(items[i]);
  }
}

function updateItem(item) {
  if (item.name === "Sulfuras, Hand of Ragnaros") {
    return;
  }

  item.sell_in = item.sell_in - 1;
  const isExpired = item.sell_in < 0;

  const changeQuality = (() => {
    if (item.name === "Aged Brie") {
      return isExpired ? 2 : 1;
    } else if (item.name === "Backstage passes to a TAFKAL80ETC concert") {
      return isExpired
        ? -item.quality
        : item.sell_in < 5
        ? 3
        : item.sell_in < 10
        ? 2
        : 1;
    } else if (item.name === "Sulfuras, Hand of Ragnaros") {
      return 0;
    }
    return isExpired ? -2 : -1;
  })();

  item.quality = Math.min(Math.max(item.quality + changeQuality, 0), 50);
}
