function updateItemOld(item) {
  if (
    item.name != "Aged Brie" &&
    item.name != "Backstage passes to a TAFKAL80ETC concert"
  ) {
    if (item.quality > 0) {
      if (item.name != "Sulfuras, Hand of Ragnaros") {
        item.quality = item.quality - 1;
      }
    }
  } else {
    if (item.quality < 50) {
      item.quality = item.quality + 1;
      if (item.name == "Backstage passes to a TAFKAL80ETC concert") {
        if (item.sell_in < 11) {
          if (item.quality < 50) {
            item.quality = item.quality + 1;
          }
        }
        if (item.sell_in < 6) {
          if (item.quality < 50) {
            item.quality = item.quality + 1;
          }
        }
      }
    }
  }
  if (item.name != "Sulfuras, Hand of Ragnaros") {
    item.sell_in = item.sell_in - 1;
  }
  if (item.sell_in < 0) {
    if (item.name != "Aged Brie") {
      if (item.name != "Backstage passes to a TAFKAL80ETC concert") {
        if (item.quality > 0) {
          if (item.name != "Sulfuras, Hand of Ragnaros") {
            item.quality = item.quality - 1;
          }
        }
      } else {
        item.quality = item.quality - item.quality;
      }
    } else {
      if (item.quality < 50) {
        item.quality = item.quality + 1;
      }
    }
  }
}

describe("xx", function () {
  let names = [
    "+5 Dexterity Vest",
    "Aged Brie",
    "Elixir of the Mongoose",
    "Backstage passes to a TAFKAL80ETC concert",
    // "Conjured Mana Cake",
  ];
  let numbers = [-1, 0, 1, 4, 5, 6, 9, 10, 11, 19, 20, 21, 49, 50 /*51, 80*/];
  // let i = -5;
  // numbers = Array(100)
  //   .fill(0)
  //   .map(() => i++)
  //   .filter((x) => x <= 50);

  names.forEach((name) => {
    numbers.forEach((sell_in) => {
      numbers
        .filter((x) => x >= 0)
        .forEach((quality) => {
          inner(name, sell_in, quality);
        });
    });
  });

  inner("Sulfuras, Hand of Ragnaros", 0, 80);
});

function inner(name, sell_in, quality) {
  it(`should name:${name} sell_in:${sell_in} quality:${quality}`, () => {
    let itemOld = new Item(name, sell_in, quality);
    updateItemOld(itemOld);
    let item = new Item(name, sell_in, quality);
    updateItem(item);

    expect("s_" + item.sell_in).toBe("s_" + itemOld.sell_in);
    expect("q_" + item.quality).toBe("q_" + itemOld.quality);
  });
}

describe("updateItem", function () {
  describe("happy path", function () {
    it("should lower sell_in", function () {
      let item = new Item("+5 Dexterity Vest", 10, 20);
      updateItem(item);
      expect(item.sell_in).toBe(9);
    });
    it("should lower quality", function () {
      let item = new Item("+5 Dexterity Vest", 10, 20);
      updateItem(item);
      expect(item.quality).toBe(19);
    });
  });
  describe("sell_in less than zero", function () {
    it("quality degrades twice as fast", function () {
      let item = new Item("+5 Dexterity Vest", -1, 20);
      updateItem(item);
      expect(item.quality).toBe(18);
    });
  });
  it("quality is never negative", function () {
    let item = new Item("+5 Dexterity Vest", -1, 0);
    updateItem(item);
    expect(item.quality).toBe(0);
  });
  it("Aged Brie increases in quality the older it gets", function () {
    let item = new Item("Aged Brie", 10, 10);
    updateItem(item);
    expect(item.quality).toBe(11);
  });
  it("quality is never more than 50", function () {
    let item = new Item("Aged Brie", 10, 50);
    updateItem(item);
    expect(item.quality).toBe(50);
  });
  describe("legendary items", function () {
    it("never has to be sold", function () {
      let item = new Item("Aged Brie", 10, 50);
      updateItem(item);
      expect(item.quality).toBe(50);
    });
    it("never decreases quality", function () {
      let item = new Item("Aged Brie", 10, 50);
      updateItem(item);
      expect(item.quality).toBe(50);
    });
  });
  describe("'Backstage passes'", function () {
    it("normally increases quality by 1", function () {
      let item = new Item("Backstage passes to a TAFKAL80ETC concert", 11, 40);
      updateItem(item);
      expect(item.quality).toBe(41);
    });
    it("when there are 10 days or less it increases quality by 2", function () {
      let item = new Item("Backstage passes to a TAFKAL80ETC concert", 10, 40);
      updateItem(item);
      expect(item.quality).toBe(42);
    });
    it("when there are 5 days or less it increases quality by 3", function () {
      let item = new Item("Backstage passes to a TAFKAL80ETC concert", 5, 40);
      updateItem(item);
      expect(item.quality).toBe(43);
    });
    it("quality drops to 0 after the concert", function () {
      let item = new Item("Backstage passes to a TAFKAL80ETC concert", 0, 40);
      updateItem(item);
      expect(item.quality).toBe(0);
    });
  });

  describe("Conjured Mana Cake", function () {
    it("should lower quality", function () {
      let item = new Item("Conjured +5 Dexterity Vest", 10, 20);
      updateItem(item);
      expect(item.quality).toBe(18);
    });
  });
});
