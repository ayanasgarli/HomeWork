// function Product(name, salePrice, costPrice, stockQuantity, soldQuantity = 0, isDiscounted = false, discountPercentage = 0) {

//     this.name = name;
//     this.salePrice = salePrice;
//     this.costPrice = costPrice;
//     this.stockQuantity = stockQuantity;
//     this.soldQuantity = soldQuantity;
//     this.isDiscounted = isDiscounted;
//     this.discountPercentage = discountPercentage;

    // 1.1
    // this.calculateProfit = function() {
    //     return (this.salePrice - this.costPrice) * this.soldQuantity;
    // };

    // 1.2
    // this.sell = function(sellQuantity) {
    //     if (sellQuantity <= this.stockQuantity) {
    //         this.soldQuantity += sellQuantity;
    //         this.stockQuantity -= sellQuantity;
    //         return this.calculateProfit();
    //     } else {
    //         alert("stock out.");
    //         return 0;
    //     }
    // };
    // this.findProfit = function() {
    //     return this.calculateProfit();
    // };
// }

// 1.4-1.5
    // function calculateTotalProfit(products) {
    //     let totalProfit = 0;
        
    //     for (let i = 0; i < products.length; i++) {

    //         // 1.4
    //         // totalProfit += products[i].calculateProfit();
            
    //         // 1.5
    //         // if (products[i].isDiscounted) {
    //         //     totalDiscount += (products[i].salePrice * products[i].discountPercentage / 100) * products[i].soldQuantity;
    //         // }
    //     }
        
    //     return totalProfit;
    // }

// 1.6
// function sortProductsBySalePrice(products) {
//     // Endirimi olmayan məhsulları filtrləyirik
//     const nonDiscountedProducts = products.filter(product => !product.isDiscounted);

//     // Satış qiymətinə görə azalan sıralama
//     const sortedProducts = nonDiscountedProducts.slice().sort((a, b) => b.salePrice - a.salePrice);

//     return sortedProducts;
// } 

// 1.1

// let product1 = new Product("Nike", 300, 250, 180, 100);
// let product2 = new Product("Adidas", 270, 230, 150, 50);
// let product3 = new Product("Puma", 240, 230, 100, 10);

// let profit1 = product1.calculateProfit();
// let profit2 = product2.calculateProfit();
// let profit3 = product3.calculateProfit();

// console.log("nike profit: " + profit1);
// console.log("adidas profit: " + profit2);
// console.log("puma profit: " + profit3);

// 1.2

// let product1 = new Product("Nike", 300, 250, 180, 100);

// let profitBeforeSale = product1.calculateProfit();
// let soldQuantity = 5;
// let profitAfterSale = product1.sell(soldQuantity);

// console.log("Nike evvelki profit: " + profitBeforeSale);
// console.log("Satilan eded: " + soldQuantity);
// console.log("Nike satishdan sonraki profit: " + profitAfterSale);

// 1.3
// let products = [];

// let product1 = new Product("Nike", 300, 250, 180, 100);
// let product2 = new Product("Adidas", 270, 230, 150, 50);
// let product3 = new Product("Puma", 240, 230, 100, 10);
// let product4 = new Product("Reebok", 40, 30, 120, 15);
// let product5 = new Product("New balance", 70, 55, 90, 12);

// products.push(product1, product2, product3, product4, product5);

// console.log(products);

// 1.4
// let products = [];

// let product1 = new Product("Nike", 300, 250, 180, 100);
// let product2 = new Product("Adidas", 270, 230, 150, 50);
// let product3 = new Product("Puma", 240, 230, 100, 10);
// let product4 = new Product("Reebok", 40, 30, 120, 15);
// let product5 = new Product("New balance", 70, 55, 90, 12);

// products.push(product1, product2, product3, product4, product5);

// let totalProfit = calculateTotalProfit(products);
// console.log("Umumi gelen profit: " + totalProfit);

// 1.5
// let products = [];

// let product1 = new Product("Nike", 300, 250, 180, 100);
// let product2 = new Product("Adidas", 270, 230, 150, 50);
// let product3 = new Product("Puma", 240, 230, 100, 10);
// let product4 = new Product("Reebok", 40, 30, 120, 15);
// let product5 = new Product("New balance", 70, 55, 90, 12);

// products.push(product1, product2, product3, product4, product5);

// let totalDiscount = calculateTotalDiscount(products);
// console.log("Umumi endirim gelen mebleg: " + totalDiscount);

// 1.6
// let products = [];

// let product1 = new Product("Nike", 300, 250, 180, 100);
// let product2 = new Product("Adidas", 270, 230, 150, 50);
// let product3 = new Product("Puma", 240, 230, 100, 10);
// let product4 = new Product("Reebok", 40, 30, 120, 15);
// let product5 = new Product("New balance", 70, 55, 90, 12);

// products.push(product1, product2, product3, product4, product5);

// let sortedProducts = sortProductsBySalePrice(products);
// console.log("Endirimi olmayan productlarin satish qiymetine gore azalan siralamasi:");
// console.log(sortedProducts);

