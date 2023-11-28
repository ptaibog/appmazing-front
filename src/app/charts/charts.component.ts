import { Component, OnInit } from "@angular/core";
import { ContactsService } from "../contacts.service";
import { ProductsService } from "../products.service";

@Component({
  selector: "app-charts",
  templateUrl: "./charts.component.html",
  styleUrls: ["./charts.component.css"],
})
export class ChartsComponent implements OnInit {
  initialLetter = [];
  contactsByFullName = [];
  emailExtensions = [];
  phonePrefixData = [];
  productsEachCategory = [];
  productsActive = [];
  productsStock = [];
  productsDate = [];
  productsPrices = [];

  constructor(
    private contactsService: ContactsService,
    private productsService: ProductsService
  ) {}

  ngOnInit() {
    this.contactsService.getContacts().subscribe((data) => {
      this.initialLetter = this.calculateInitialLettersData(data);
      this.contactsByFullName = this.calculateContactsByFullNameData(data);
      this.emailExtensions = this.calculateEmailExtensionsData(data);
      this.phonePrefixData = this.generatePhonePrefixData(data);
    });
    this.productsService.getProducts().subscribe((data) => {
      this.productsEachCategory = this.calculateTotalProductsForCategory(data);
      this.productsActive = this.calculateTotalActiveProducts(data);
      this.productsStock = this.calculateStock(data);
      this.productsPrices = this.calculateProductPriceRange(data);
    });
  }

  calculateInitialLettersData(contacts: any[]): any {
    return contacts.reduce((result, contact) => {
      const initial = contact.firstsurname.charAt(0).toUpperCase();
      if (result.find((item) => item.name === initial)) {
        result.find((item) => item.name === initial).value++;
      } else {
        result.push({ name: initial, value: 1 });
      }
      return result;
    }, []);
  }

  calculateContactsByFullNameData(contacts: any[]): any {
    let tempContactsByFullName = [
      {
        name: "Contacts",
        series: [],
      },
    ];
    contacts.forEach((contact) => {
      const fullName =
        contact.name + contact.firstsurname + contact.secondsurname;
      const size = fullName.length;
      const range = `${size - (size % 5)} - ${size - (size % 5) + 4} ch.`;
      let existingRange = tempContactsByFullName[0].series.find(
        (item) => item.name === range
      );
      if (existingRange) {
        existingRange.value++;
      } else {
        tempContactsByFullName[0].series.push({ name: range, value: 1 });
      }
    });

    return tempContactsByFullName.map((entry) => {
      return {
        ...entry,
        series: entry.series.sort((a, b) =>
          Number(a.name.split("-")[0] - Number(b.name.split("-")[0]))
        ),
      };
    });
  }

  calculateEmailExtensionsData(contacts: any[]): any {
    let emailExtensionsMap = new Map<string, number>();

    contacts.forEach((contact) => {
      let emailParts = contact.mail.split("@");
      if (emailParts.length == 2) {
        const domain = emailParts[1];
        const firstDotIndex = domain.indexOf(".");
        if (firstDotIndex != -1) {
          const extension = domain.substring(firstDotIndex);
          if (emailExtensionsMap.has(extension)) {
            emailExtensionsMap.set(
              extension,
              emailExtensionsMap.get(extension) + 1
            );
          } else {
            emailExtensionsMap.set(extension, 1);
          }
        }
      }
    });
    let emailExtensions = [];
    emailExtensionsMap.forEach((value, key) => {
      emailExtensions.push({ name: key, value: value });
    });
    return emailExtensions;
  }

  generatePhonePrefixData(contacts: any[]): any {
    let phonePrefixData = [];
    //para crear objeto llaves
    let prefixCounts = {};
    contacts.forEach((contact) => {
      const phonePrefix = String(contact.phonenumber).substring(0, 1);
      if (prefixCounts[phonePrefix]) {
        prefixCounts[phonePrefix]++;
      } else {
        prefixCounts[phonePrefix] = 1;
      }
    });
    for (let prefix in prefixCounts) {
      if (prefixCounts.hasOwnProperty(prefix)) {
        phonePrefixData.push({ name: prefix, value: prefixCounts[prefix] });
      }
    }
    return phonePrefixData;
  }

  calculateTotalProductsForCategory(products: any[]): any {
    let productsEachCategory = [];
    let productsCount = {};
    products.forEach((product) => {
      if (product.category_id) {
        const categoryId = product.category_id.name;
        if (productsCount[categoryId]) {
          productsCount[categoryId]++;
        } else {
          productsCount[categoryId] = 1;
        }
      }
    });
    for (let product in productsCount) {
      if (productsCount.hasOwnProperty(product)) {
        productsEachCategory.push({
          name: product,
          value: productsCount[product],
        });
      }
    }
    return productsEachCategory;
  }

  calculateTotalActiveProducts(products: any[]): any{
    let productsStock = [];
    let activeCount = {};
    let unactiveCount = {};
    products.forEach((product) =>{
      if(product.active){
        const activeProducts = product.active;
        if(activeCount[activeProducts]){
          activeCount[activeProducts]++;
        }else{
          activeCount[activeProducts] = 1;
        }
      }else if(!product.active){
        const unactiveProducts = product.active;
        if(unactiveCount[unactiveProducts]){
          unactiveCount[unactiveProducts]++;
        }else{
          unactiveCount[unactiveProducts] = 1;
        }
      }
    });
    for(let product in activeCount){
      if(activeCount.hasOwnProperty(product)){
        productsStock.push({name: 'En stock', value: activeCount[product]})
      }
    for(let product in unactiveCount){
      if(unactiveCount.hasOwnProperty(product)){
        productsStock.push({name: 'Agotado', value: unactiveCount[product]})
      }
    }
    }
    console.log(productsStock);
    return productsStock;
  }

// cantidad de productos con stock superior a 200, entre 100-200 y menos de 100

calculateStock(products: any[]): any{

  let productsStockRanges = [];
  let productCountPlus200 = {};
  let productCountPlus100 = {};
  let productCountPlus0 = {};
  let productCount0 = {};

  products.forEach((product) =>{
    if(product.stock >= 200){
      const stockProductsPlus200 = ">=200";
      if(productCountPlus200[stockProductsPlus200]){
        productCountPlus200[stockProductsPlus200]++;
      }else{
        productCountPlus200[stockProductsPlus200] = 1;
      }
    }else if(product.stock >= 100 && product.stock < 200){
      const stockProductsPlus100 = ">=100 & <200";
      if(productCountPlus100[stockProductsPlus100]){
        productCountPlus100[stockProductsPlus100]++;
      }else{
        productCountPlus100[stockProductsPlus100] = 1;
      }
    }else if(product.stock < 100 && product.stock > 0){
      const stockProductsPlus0 = "<100 & > 0";
      if(productCountPlus0[stockProductsPlus0]){
        productCountPlus0[stockProductsPlus0]++;
      }else{
        productCountPlus0[stockProductsPlus0] = 1;
      }
    }else if(product.stock == 0){
      const stockProducts0 = '<1';
      if(productCount0[stockProducts0]){
        productCount0[stockProducts0]++;
      }else{
        productCount0[stockProducts0] = 1;
      }
    }
  });
  for(let product in productCountPlus200){
    if(productCountPlus200.hasOwnProperty(product)){
      productsStockRanges.push({name: '> 200', value: productCountPlus200[product]});
    }
  }
  for(let product in productCountPlus100){
    if(productCountPlus100.hasOwnProperty(product)){
      productsStockRanges.push({name: '100 - 199', value: productCountPlus100[product]});
    }
  }
  for(let product in productCountPlus0){
    if(productCountPlus0.hasOwnProperty(product)){
      productsStockRanges.push({name: '1 - 99', value: productCountPlus0[product]});
    }
  }
  for(let product in productCount0){
    if(productCount0.hasOwnProperty(product)){
      productsStockRanges.push({name: 'No stock', value: productCount0[product]});
    }
  }
  console.log(productCountPlus200);
  console.log(productsStockRanges);
  return productsStockRanges;
}

// cantidad de productos, por categoria con fecha de colocación anterior a 2022, los colocados en 2022, los colocados en 2023
// DOS FOREACH, PRIMERO CATEGORIAS, LUEGO CON LAS FECHAS

// calculateDateProductsForCategory(products: any[]): any {
//   let productsDateEachCategory = [];
//   let productsCount2000 = {};
//   let productsCount2022 = {};
//   let productsCount2023 = {};
//   products.forEach((product) => {
//     if (product.date_added < '2022-01-01') {
//       const categoryId = product.category_id.name;
//       if (productsCount2000[categoryId]) {
//         productsCount2000[categoryId]++;
//       } else {
//         productsCount2000[categoryId] = 1;
//       }console.log(productsCount2000);
//     }else if ((product.date_added > '2022-01-01') && (product.date_added <= '2022-12-31')) {
//       const categoryId = product.category_id.name;
//       if (productsCount2022[categoryId]) {
//         productsCount2022[categoryId]++;
//       } else {
//         productsCount2022[categoryId] = 1;
//       }console.log(productsCount2022);
//     }else if (product.date_added >= '2023-01-01') {
//       const categoryId = product.category_id.name;
//       if (productsCount2023[categoryId]) {
//         productsCount2023[categoryId]++;
//       } else {
//         productsCount2023[categoryId] = 1;
//       }console.log(productsCount2023);
//     }
//   });
//   for (let product in productsCount2000) {
//     if (productsCount2000.hasOwnProperty(product)) {
//       productsDateEachCategory.push({
//         name: '< 2022',
//         value: productsCount2000[product],
//       });
//     }
//   }
//   for (let product in productsCount2022) {
//     if (productsCount2022.hasOwnProperty(product)) {
//       productsDateEachCategory.push({
//         name: '2022',
//         value: productsCount2022[product],
//       });
//     }
//   }
//   for (let product in productsCount2023) {
//     if (productsCount2023.hasOwnProperty(product)) {
//       productsDateEachCategory.push({
//         name: '2023',
//         value: productsCount2023[product],
//       });
//     }
//   }
//   return productsDateEachCategory;
// }



// PRODUCTOS POR RANGO DE PRECIOS, de 0 a 2, de 2 a 5, de 5 a 10 y >10.


calculateProductPriceRange(products: any[]): any{

  let productsPerPrice = [];
  let productCountPrice0 = {};
  let productCountPrice2 = {};
  let productCountPrice5 = {};
  let productCountPrice10 = {};

products.forEach((product) =>{
  if(product.price < 2.00){
    const priceProduct0 = "< 2";
    if(productCountPrice0[priceProduct0]){
      productCountPrice0[priceProduct0]++;
    }else{
      productCountPrice0[priceProduct0] = 1;
    }
  }else if(product.price >= 2.00 && product.price < 5.00){
    const priceProduct2 = ">2 & <5";
    if(productCountPrice2[priceProduct2]){
      productCountPrice2[priceProduct2]++;
    }else{
      productCountPrice2[priceProduct2] = 1;
    }
  }else if(product.price >= 5.00 && product.price < 10.00){
    const priceProduct5 = ">=5 & <10";
    if(productCountPrice5[priceProduct5]){
      productCountPrice5[priceProduct5]++;
    }else{
      productCountPrice5[priceProduct5] = 1;
    }
  }else if(product.price >= 10.00){
    const priceProduct10 = ">=10";
    if(productCountPrice10[priceProduct10]){
      productCountPrice10[priceProduct10]++;
    }else{
      productCountPrice10[priceProduct10] = 1;
    }
  }
});
for(let product in productCountPrice0){
  if(productCountPrice0.hasOwnProperty(product)){
    productsPerPrice.push({name: '0 - 1.99', value: productCountPrice0[product]});
  }
}
for(let product in productCountPrice2){
  if(productCountPrice2.hasOwnProperty(product)){
    productsPerPrice.push({name: '2 - 4.99', value: productCountPrice2[product]});
  }
}
for(let product in productCountPrice5){
  if(productCountPrice5.hasOwnProperty(product)){
    productsPerPrice.push({name: '5 - 9.99', value: productCountPrice5[product]});
  }
}
for(let product in productCountPrice10){
  if(productCountPrice10.hasOwnProperty(product)){
    productsPerPrice.push({name: '> 10', value: productCountPrice10[product]});
  }
}

  return productsPerPrice;
}

}
