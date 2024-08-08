import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { NgFor, NgStyle } from '@angular/common';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [NgFor,NgStyle],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit{
  products:any[]=[]
  constructor(private cartService:CartService){}
  imgURL:string="/shoe-orange.png"
  ngOnInit(): void {
      for(let i=1;i<=32;i++){
        this.products.push( {id:i,imgURL:this.imgURL,name:`product${i}`,price:i*100})
      }
  }
  addProductToCart(product:any){
    this.cartService.addProduct(product);
  }
  avilableInCart(id:number):boolean{
    return this.cartService.checkProduct(id);
  }
  removeProductFromCart(id:number){
    this.cartService.removeProduct(id)
  }
}
