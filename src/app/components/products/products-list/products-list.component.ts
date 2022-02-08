import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable} from "rxjs";
import {ActionEvent, AppDataState, DataStateEnum, ProductActionTypes} from "../../../state/product.state";
import {Product} from "../../../model/product.model";

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  @Input() productsInput$!:Observable<AppDataState<Product[]>>;
 // @Output() productsEventEmitter:EventEmitter<ActionEvent>=new EventEmitter<ActionEvent>();

  readonly DataStateEnum=DataStateEnum;
  constructor() { }

  ngOnInit(): void {

  }

  /*onActionEvent($event: ActionEvent) {
    this.productsEventEmitter.emit($event);
  }*/
}
