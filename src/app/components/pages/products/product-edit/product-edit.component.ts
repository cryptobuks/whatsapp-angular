import { Component, OnInit, ViewChild, Output, Input, EventEmitter } from '@angular/core';
import { ModalComponent } from '../../../bootstrap/modal/modal.component';
import { Product } from '../../../../models';
import { HttpErrorResponse } from '@angular/common/http';
import { ProductHttpService } from '../../../../services/http/product-http.service';

@Component({
  selector: 'product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})

export class ProductEditComponent implements OnInit {

  product: Product = {
    name: '',
    description: '',
    price: 0,
    active: true
  }

  _productId: number; 

  @ViewChild(ModalComponent) modal: ModalComponent;

  @Output() onSuccess: EventEmitter<any> = new EventEmitter<any>();
  @Output() onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();


  constructor(private productHttp: ProductHttpService) { }

  ngOnInit() {
  }

  @Input()
  set productId(value){
    this._productId = value;
    if (this._productId) {
      this.productHttp
        .get(this._productId)
        .subscribe(product => this.product = product)      
    }
  }

  
  submit(){
    this.productHttp
      .update(this._productId, this.product)
      .subscribe((product) => {
        this.onSuccess.emit(product);
        this.modal.hide();
      }, error =>  this.onError.emit(error));
  }


  showModal(){
    this.modal.show();
  }

  hideModal($event){
    // fazer algo quando model for fechado
    //console.log($event);
  }

}