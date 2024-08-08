import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserDbService } from './user-db.service';
import { AuthService } from './auth.service';
import { User } from './userInterface';

@Injectable({
  providedIn: 'root'
})
export class CartService{

  
  private products = new Map<number, { id: number,imgURL:string, name: string, price: number, count: number }>;
  private activeUser:User={} as User;
  constructor(private userDbService:UserDbService,private authService:AuthService) {
    this.authService.getLoginStatus().subscribe(status=>{
      if(status){
        this.authService.getActiveUser().subscribe(user=>this.activeUser.email=user.email);
        const cartFromDb=this.userDbService.getCart(this.activeUser.email);
        this.products=new Map([...cartFromDb??new Map(),...this.products])
        this.userDbService.updateCart(this.activeUser.email,this.products);
        console.log(cartFromDb,this.products);
      }
      else{
        this.products.clear();
      }
    })
    
   }
  viewCart(): Map<number, { id: number,imgURL:string, name: string, price: number, count: number }> {
   
    return this.products;
  }
  addProduct(product: any) {
    if (this.products.has(product.id)) {
      const productToUpdate = this.products.get(product.id);
      if (productToUpdate?.count) {
        productToUpdate.count += 1;
        this.products.set(product.id, productToUpdate);
      }

    }
    else {
      product.count = 1;
      this.products.set(product.id, product);
    }

  }
  removeProduct(id: number) {
    const productToUpdate = this.products.get(id);
    if (productToUpdate?.count) {
      if(productToUpdate.count>1){
      productToUpdate.count -= 1;
      this.products.set(id, productToUpdate);
      }
      else{
        this.products.delete(id);
      }
    }
  }
  checkProduct(id:number):boolean{
    return this.products.has(id);
  }

}
