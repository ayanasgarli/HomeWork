 class Device {
    constructor(brand, model, screenSize, batteryLevel, price, salePrice, discountPercentage, stockCount) {
      this.brand = brand;
      this.model = model;
      this.screenSize = screenSize;
      this.batteryLevel = batteryLevel;
      this.price = price;
      this.salePrice = salePrice;
      this.discountPercentage = discountPercentage;
      this.stockCount = stockCount;
      this.saleCount = 0;
    }
  
    get profit() {
      return this.calculateProfit();
    }
  
    DisplayBatteryLevel() {
      return `Battery Level: ${this.batteryLevel}%`;
    }
  
    SellProduct(quantity) {
      if (quantity > 0 && quantity <= this.stockCount) {
        this.stockCount -= quantity;
        this.saleCount += quantity;
        return `Satilanlarin sayi ${this.saleCount}`;
      } else {
        return "Stock out";
      }
    }
  
    DisplayDetails() {
      return `Model: ${this.model}, Brand: ${this.brand}, Screen Size: ${this.screenSize} inches`;
    }
  
    calculateProfit() {
      const salary = this.saleCount * this.price;
      const cost = this.saleCount * this.salePrice;
      const profit = salary - cost;
  
      if (profit < 0) {
        const loss = -profit;
        return `Ziyan: ${loss} azn`;
      } else {
        return `Gelir: ${profit} azn`;
      }
    }
  
    applyDiscount() {
      if (this.discountPercentage > 0) {
        this.salePrice = this.price - (this.price * this.discountPercentage / 100);
        return `Endirim olundu, yeni qiymet: ${this.salePrice} azn`;
      } else {
        return "Endirim yoxdur.";
      }
    }
  }

  const smartphone = new Device("Samsung", "Galaxy S21", 6.2, 95, 1200, 1100, 5, 25, 5);
  
  console.log(smartphone.SellProduct(20)); 
  console.log(smartphone.DisplayBatteryLevel()); 
  console.log(smartphone.DisplayDetails());
  console.log(smartphone.calculateProfit()); 
  console.log(smartphone.applyDiscount());


class Phone extends Device {
    constructor(brand, model, screenSize, batteryLevel, price, salePrice, discountPercentage, saleCount, stockCount, isSmart, ringtone) {
        super(brand, model, screenSize, batteryLevel, price, salePrice, discountPercentage, saleCount, stockCount);
        this.isSmart = isSmart;
        this.ringtone = ringtone;
    }

    DisplayDetails() {
        const deviceDetails = super.DisplayDetails();
        if (this.isSmart) {
            console.log(deviceDetails + " - This is a Smartphone");
        } else {
            console.log(deviceDetails + " - This is not a Smartphone");
        }
    }

    Ring() {
        console.log(this.ringtone);
    }
}

const smartphone1 = new Phone("Apple", " Iphone 12 pro", 6.1, 90, 3500, 3150, 10, 0, 50, true, "Ring Ring");
const smartPhone2 = new Phone("Samsung", "Galaxy S23+ ", 6.6, 100, 2600, 2200, 15, 0, 0, true, "Beep Beep");

smartphone1.DisplayDetails();
smartPhone2.DisplayDetails();

smartphone1.Ring();
smartPhone2.Ring();

class Laptop extends Device {
    constructor(brand, model, screenSize, batteryLevel, price, salePrice, discountPercentage, saleCount, stockCount, isRGBkeyboard, operatingSystem) {
        super(brand, model, screenSize, batteryLevel, price, salePrice, discountPercentage, saleCount, stockCount);
        this.isRGBkeyboard = isRGBkeyboard;
        this.operatingSystem = operatingSystem;
    }

    DisplayDetails() {
        const deviceDetails = super.DisplayDetails();
        const rgbKeyboardStatus = this.isRGBkeyboard ? "RGB Keyboard Var" : "RGB Keyboard Yoxdur";
        return `${deviceDetails}, RGB Keyboard: ${rgbKeyboardStatus}, OS: ${this.operatingSystem}`;
    }
}

const laptop1 = new Laptop("HP", "Pavilion 14", 14, 100, 1800, 1650, 10, 20, 15, false, "Windows 10");
const laptop2 = new Laptop("Lenovo", "Legion 5", 15.6, 97, 4100, 3900, 5, 13, 20, true, "Linux");

console.log(laptop1.DisplayDetails());
console.log(laptop2.DisplayDetails());

let products = [
    new Phone("Apple", "iPhone 15", 6.1, 100, 2900, 2700, 10, 25, 10, true, "Ring Ring"),
    new Phone("Samsung", "Galaxy S21", 6.2, 95, 1200, 1100, 10, 30, 12, true, "Ring Ring"),
    new Laptop("Asus", "Vivobook", 16, 90, 1150, 1000, 15, 8, 20, false, "Windows 10"),
    new Laptop("Lenovo", "Thinkpad", 14, 100, 4000, 3800, 5, 15, 6, true, "Windows 10"),
    new Laptop("Apple", "MacBook Pro 14", 14.2, 100, 8500, 8000, 5, 10, 3, true, "MacOS")
];

function FilterbyPrice(array, price) {
    const filteredProducts = [];
    for (let i = 0; i < array.length; i++) {
        const product = array[i];
        if (product.price > price) {
            filteredProducts.push(product.brand + ' ' + product.model);
        }
    }
    return filteredProducts;
}

const filteredProducts = FilterbyPrice(products, 3000);
console.log(filteredProducts);

function FilterbyName(array, name) {
    let count = 0;
    for (let i = 0; i < array.length; i++) {
        const product = array[i];
        if (product.brand.toLowerCase() === name.toLowerCase() || product.model.toLowerCase() === name.toLowerCase()) {
            count++;
        }
    }
    return count;
}

const appleCount = FilterbyName(products, "Apple");
const lenovoCount = FilterbyName(products, "Lenovo");
const samsungCount = FilterbyName(products, "Samsung");
const asusCount = FilterbyName(products, "Asus");

console.log(`Apple sayi: ${appleCount}`);
console.log(`Lenovo sayi: ${lenovoCount}`);
console.log(`Samsung sayi: ${samsungCount}`);
console.log(`asus sayi: ${asusCount}`);

function GetTotalProfit(array) {
    let totalProfit = 0;
    for (let i = 0; i < array.length; i++) {
        const product = array[i];
        const productProfit = product.profit;
        console.log(`mehsul: ${product.brand} ${product.model}, qazanc: ${productProfit}`);
        totalProfit += productProfit;
    }
    return totalProfit;
}

const totalProfit = GetTotalProfit(products);
console.log(`Umumi qazanc: ${totalProfit}`);

function FilterByOperatingSystem(os, array) {
    const filteredLaptops = [];
    for (let i = 0; i < array.length; i++) {
        const product = array[i];
        if (product instanceof Laptop && product.operatingSystem === os) {
            filteredLaptops.push(product);
        }
    }
    return filteredLaptops;
}
const filteredLaptops = FilterByOperatingSystem("Windows 10", products);
console.log("Windows 10 olan laptoplar:");
for (let i = 0; i < filteredLaptops.length; i++) {
    console.log(filteredLaptops[i].DisplayDetails());
}
