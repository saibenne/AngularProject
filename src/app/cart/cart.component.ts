import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [NgFor,NgIf],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit{
  cartItems=new Map<number,{id:number,imgURL:string,name:string,price:number,count:number}>();
  constructor(private cartService:CartService){}
  ngOnInit(): void {
      this.cartItems=this.cartService.viewCart();
  }
  addProduct(product:any){
    this.cartService.addProduct(product)
  }
  removeProduct(id:number){
    this.cartService.removeProduct(id);
  }
     
}
