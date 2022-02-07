import {Component, OnInit} from '@angular/core';
import {ProductsService} from "../../services/products.service";
import {Product} from "../../model/product.model";
import {catchError, map, Observable, of, startWith} from "rxjs";
import {AppDataState, DataStateEnum} from "../../state/product.state";
import {error} from "@angular/compiler/src/util";
import {Router} from "@angular/router";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  //products: Product[] | null=null;
  products$:Observable<AppDataState<Product[]>> |null=null;
  readonly DataStateEnum=DataStateEnum;
  constructor(private productsService:ProductsService, private router:Router) { }

  ngOnInit(): void {
  }

  onGetAllProducts() {
    /*this.productsService.getAllProducts().subscribe(data=>{
      this.products=data;
    }, error => {
      console.log(error);
    })*/
    this.products$=this.productsService.getAllProducts().pipe(
      map(data=>{
            console.log(data);
           return ({dataState: DataStateEnum.LOADED, data: data});
      }),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err => of({dataState: DataStateEnum.ERROR}))
    );
  }

  onGetSelectedProducts() {
    this.products$=this.productsService.getSelectedProducts().pipe(
      map(data=>{
        console.log(data);
        return ({dataState: DataStateEnum.LOADED, data: data});
      }),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err => of({dataState: DataStateEnum.ERROR}))
    );
  }

  onGetAvailableProducts() {
    this.products$=this.productsService.getAvailableProducts().pipe(
      map(data=>{
        console.log(data);
        return ({dataState: DataStateEnum.LOADED, data: data});
      }),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err => of({dataState: DataStateEnum.ERROR}))
    );
  }

  onSearch(dataForm: any) {
    this.products$=this.productsService.searchProducts(dataForm.keyword).pipe(
      map(data=>{
        console.log(data);
        return ({dataState: DataStateEnum.LOADED, data: data});
      }),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err => of({dataState: DataStateEnum.ERROR}))
    );
  }

  onSelect(p:Product) {
    this.productsService.select(p).subscribe(data=>{
      p.selected=data.selected;
    });
  }

  onDelete(p:Product) {
    let v=confirm("Etes-vous sur de vouloir supprimer ?");
    if(v) {
      this.productsService.deleteProduct(p).subscribe(
        data => {
          this.onGetAllProducts();
        }
      );
    }
  }

  onNewProduct() {
  this.router.navigateByUrl("/newProduct");
  }

  onEdit(p:Product) {
    this.router.navigateByUrl("/editProduct/"+p.id);
  }
}
