import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError } from 'rxjs';
import { ErrorService } from './error.service';
import { ConfigService } from './config.service';
import { Panel } from '../models/panel';
import { Category } from '../models/category';
import { Notyf } from 'notyf';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  cartItems: Panel[] = [];
  categories: Category[] = [];
  category: Category[] = [];
  categoryProducts: any[] = [];
  totalCartItems: number = 0;
  totalPrice: number = 0;
  private notyf = new Notyf({
    duration: 2000,
    position: {
      x: 'right',
      y: 'top'
    },
    types: [
      {
        type: 'error',
        background: 'red',
        icon: false,
        dismissible: true
      },
      {
        type: 'success',
        background: 'green',
        icon: false,
        dismissible: true
      },
      {
        type: 'info',
        background: 'blue',
        icon: false,
        dismissible: true
      }
    ],
    ripple: false
  });
  public categoryData = new BehaviorSubject<any>(null);
  public productData = new BehaviorSubject<any>(null);
  public bannerData = new BehaviorSubject<any>(null);

  constructor(private _httpClient: HttpClient,  public _errorService: ErrorService, private _configService: ConfigService) { }

  showApiLoader() {
    document.querySelector('.loader-container').classList.add('show');
  }

  hideApiLoader() {
    document.querySelector('.loader-container').classList.remove('show');
  }

  addToCart(product: any) {
    this.notyf.dismissAll();
    const existingProduct = this.cartItems.find(item => item.id === product.id && item.category === product.category);
    if (existingProduct == product) {
      existingProduct.quantity++;
      this.totalCartItems++;
      this.totalPrice = this.totalPrice + product.price;
    } else {
      product.quantity = 1;
      this.totalCartItems++;
      this.totalPrice = this.totalPrice + product.price;
      this.cartItems.push(product);
    }
    this.notyf.success('Item added to cart successfully!');
    window.scrollTo(0, 0);;
    console.log("Cart Items", this.cartItems);
  }
  

  removeFromCart(product: any) {
    this.notyf.dismissAll();
    const existingProduct = this.cartItems.find(item => item.id === product.id && item.category === product.category);
    if (existingProduct == product) {
      if (existingProduct.quantity > 1) {
        existingProduct.quantity--;
        this.totalCartItems--;
        this.totalPrice -= product.price;
      } else {
        this.cartItems = this.cartItems.filter(item => item.id != product.id && item.category != product.category);;
        this.totalCartItems--;
        this.totalPrice -= product.price * product.quantity;
      }
    }
      this.notyf.open({
        type: 'info',
        message: 'Item Removed from cart successfully!'
      });
    console.log("Cart Items", this.cartItems);
  }

  deleteFromCart(product: any) {
    this.cartItems = this.cartItems.filter(item => !(item.id === product.id && item.category === product.category));
    this.totalCartItems = this.cartItems.reduce((total, item) => total + item.quantity, 0);
    this.notyf.open({
      type: 'info',
      message: 'Items Removed from cart successfully!'
    });
    this.totalPrice -= product.price * product.quantity;
    console.log("Cart Items", this.cartItems);
}


  getCategories(): Observable<any>  {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*' 
    });
    return this._httpClient.get(this._configService.getApiBaseUrl().concat("category.json"), {headers}).pipe(
      catchError((error: any) => this._errorService.catchError(error))
    );
  }

  getFooter(): Observable<any>  {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*' 
    });
    return this._httpClient.get(this._configService.getApiBaseUrl().concat("footer.json"), {headers}).pipe(
      catchError((error: any) => this._errorService.catchError(error))
    );
  }

  getCategoryItems(category: any): Observable<any>  {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*' 
    });
    return this._httpClient.get(this._configService.getApiBaseUrl().concat(category + ".json"), {headers}).pipe(
      catchError((error: any) => this._errorService.catchError(error))
    );
  }
}
