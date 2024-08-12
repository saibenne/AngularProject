import { Injectable } from '@angular/core';
import { User } from './userInterface';
import { UserData } from './userDataInterface';

@Injectable({
  providedIn: 'root'
})
export class UserDbService {

  constructor() { }
  private userDb=new Map<string,string>();
  private userDataDb=new Map<string,UserData|undefined>();
  private cartDb=new Map<string,Map<number, { id: number,imgURL:string, name: string, price: number, count: number }>>

  addUser(user:User):boolean{
    if(this.userDb.has(user.email)){
      alert(`user with ${user.email} already exists ,please login`);
      return false;
    }
    this.userDb.set(user.email,user.password);
    this.userDataDb.set(user.email,undefined)
    return true;
  }
  validateUser(user:User):boolean{
    if(this.userDb.has(user.email)&&this.userDb.get(user.email)==user.password){
      return true;
    }
    else{
      if(this.userDb.has(user.email)){
        alert("please check your password");
        return false;
      }
      else{
        alert(`We didn't find any user with ${user.email},please signup`)
        return false;
      }
    }
    return false;
  }
  getUserData(email:string):UserData|undefined{
    if(this.userDataDb.has(email)){
      return this.userDataDb.get(email);
    }
    return undefined;
  }
  updateUserData(email:string,userData:UserData):boolean{
    if(this.userDataDb.has(email)){
      this.userDataDb.set(email,userData);
      return true;
    }
    return false;
  }
  updateCart(email:string,cart:Map<number, { id: number,imgURL:string, name: string, price: number, count: number}>){
    this.cartDb.set(email,new Map(cart));
  }
  getCart(email:string):Map<number, { id: number,imgURL:string, name: string, price: number, count: number}>|undefined{
    if(this.cartDb.has(email)){
      return this.cartDb.get(email);
    }
    return undefined;
  }
}
