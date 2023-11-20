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



}
