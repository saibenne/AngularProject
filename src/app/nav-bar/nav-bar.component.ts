import { NgFor } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTimes, faBars } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [NgFor,RouterLink,RouterLinkActive,FontAwesomeModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {
   title:string="Angular"
   menu:Array<string>=["Home","Products","Cart","Account"]
   isMobile:boolean=false;
   isMenuOpen:boolean=false;
   faTimes=faTimes;
   faBars=faBars;
   constructor(){
    this.checkViewport();
   }
   @HostListener('window:resize',[])
   onResize(){
    this.checkViewport();
   }
   checkViewport(){
    this.isMobile=window.innerWidth<650;
    if(!this.isMobile){
      this.isMenuOpen=false;
    }
    
   }
   toggleMenu(){
    this.isMenuOpen=!this.isMenuOpen;
    console.log(this.isMenuOpen)
   }
}
