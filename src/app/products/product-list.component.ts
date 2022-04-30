import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { IProduct } from "./product";
import { ProductService } from "./product.service";

@Component({
    selector: 'pm-products',
    templateUrl: './product-list.component.html',
    styleUrls:['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy{

    pageTitle: string = 'Product List';
    imageMargin = 2;
    imageWidth = 50;
    showImage: boolean = false;
    errorMessage : string = '';
    sub! : Subscription;
  
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
    products: IProduct[] = [];

    constructor(private productService : ProductService){}

    ngOnInit(): void {
        this.sub = this.productService.getProducts().subscribe({
            next : products => {
                this.products = products;
                this.filteredProducts = this.products;  
            },
            error : err => this.errorMessage = err
        });     
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    perfomeFilter(filterBy : string) : IProduct[]{
        filterBy = filterBy.toLowerCase();
        return this.products.filter(p => 
            p.productName.toLowerCase().includes(filterBy));
    }

    toggleImage(): void {
        this.showImage = !this.showImage;
    }

    onRatingClicked(message : string): void{
        this.pageTitle = message;
    }
}