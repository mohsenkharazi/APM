import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { IProduct } from "./product";
import { catchError, tap} from "rxjs/operators";

@Injectable({
    providedIn:"root"
})
export class ProductService{

    private producUrl = 'api/products/products.json';

    constructor(private http : HttpClient){}

    getProducts(): Observable<IProduct[]> {
        return this.http.get<IProduct[]>(this.producUrl).pipe(
            tap(data => console.log("ALL : ", JSON.stringify(data))),
            catchError(this.handleError)
        );
    }

    private handleError(err : HttpErrorResponse) {
        let errorMessage = '';
        console.error(errorMessage);
        return throwError(errorMessage); 
    }
}