import { Component, OnInit } from '@angular/core';
import { SlideshowComponent } from '../slideshow/slideshow.component';
import { ProductsComponent } from '../products/products.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SlideshowComponent,ProductsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  products:any[]=[]
  constructor(){}
  imgURL:string="/shoe-orange.png"
  ngOnInit(): void {
      for(let i=1;i<=5;i++){
        this.products.push( {id:i,imgURL:this.imgURL,name:`product${i}`,price:i*100})
      }
  }
}
