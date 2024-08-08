import { Routes } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { ProductsComponent } from './products/products.component';
import { CartComponent } from './cart/cart.component';
import { HomeComponent } from './home/home.component';
export const routes: Routes = [
    {path:'products',component:ProductsComponent},
    {path:'cart',component:CartComponent},
    {path:'account',component:AccountComponent,
        children:[
    {path:'signin',component:SigninComponent},
    {path:'signup',component:SignupComponent}
        ],
    
    },
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path:'home',component:HomeComponent}
];
