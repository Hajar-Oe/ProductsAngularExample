import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ActionEvent, ProductActionTypes} from "../../../state/product.state";

@Component({
  selector: 'app-products-navbar',
  templateUrl: './products-navbar.component.html',
  styleUrls: ['./products-navbar.component.css']
})
export class ProductsNavbarComponent implements OnInit {

  @Output() eventEmitter:EventEmitter<ActionEvent>=new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  onGetAllProducts() {
    this.eventEmitter.emit({type:ProductActionTypes.GET_ALL_PRODUCTS});
  }

  onGetSelectedProducts() {
    this.eventEmitter.emit({type:ProductActionTypes.GET_SELECTED_PRODUCTS});
  }

  onGetAvailableProducts() {
    this.eventEmitter.emit({type:ProductActionTypes.GET_AVAILABLE_PRODUCTS});
  }

  onNewProduct() {
    this.eventEmitter.emit({type:ProductActionTypes.NEW_PRODUCT});
  }

  onSearch(dataForm:any) {
    this.eventEmitter.emit({type:ProductActionTypes.SEARCH_PRODUCTS,payload:dataForm});
  }


}
