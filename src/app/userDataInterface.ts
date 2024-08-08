import { User } from "./userInterface";

export interface UserData extends User{
    name?:string;
    location?:string;
    role?:string;
    cart?:Map<number,{id:number,name:string,price:number,count:number}>;
}