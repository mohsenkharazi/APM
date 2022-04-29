import { Component, OnInit } from "@angular/core";
import { IProduct } from "./product";

@Component({
    selector: 'pm-products',
    templateUrl: './product-list.component.html',
    styleUrls:['./product-list.component.css']
})
export class ProductListComponent implements OnInit{

    pageTitle: string = 'Product List';
    imageMargin = 2;
    imageWidth = 50;
    showImage: boolean = false;
  
    private _listFilter: string = '';
    get listFilter() : string {
        return this._listFilter;
    }
    set listFilter(value : string){
        this._listFilter = value;
        console.log('in setter', value);
        this.filteredProducts = this.perfomeFilter(value);
    }

    filteredProducts : IProduct[] = [];
    products: IProduct[] = [
        {
            "productId": 1,
            "productName": "Leaf Rake",
            "productCode": "GDN-0011",
            "releaseDate": "March 19, 2021",
            "description": "Leaf rake with 48-inch wooden handle.",
            "price": 19.95,
            "starRating": 3.2,
            "imageUrl": "assets/images/leaf_rake.png"
          },
          {
            "productId": 2,
            "productName": "Garden Cart",
            "productCode": "GDN-0023",
            "releaseDate": "March 18, 2021",
            "description": "15 gallon capacity rolling garden cart",
            "price": 32.99,
            "starRating": 4.2,
            "imageUrl": "assets/images/garden_cart.png"
          }
    ];

    perfomeFilter(filterBy : string) : IProduct[]{
        filterBy = filterBy.toLowerCase();
        return this.products.filter(p => 
            p.productName.toLowerCase().includes(filterBy));
    }

    toggleImage(): void {
        this.showImage = !this.showImage;
    }

    ngOnInit(): void {
        console.log('in OnInit');
        this.listFilter = 'cart';
    }
}