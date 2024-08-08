import { NgFor, NgIf, NgStyle } from '@angular/common';
import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-slideshow',
  standalone: true,
  imports: [NgIf,NgFor,NgStyle],
  templateUrl: './slideshow.component.html',
  styleUrl: './slideshow.component.scss'
})
export class SlideshowComponent implements OnInit,OnDestroy{
  @Input() products: any[] = [];
  @Input() interval: number = 3000;
  currentIndex: number = 0;
  intervalId: any;
  ngOnInit(): void {
    this.startSlideshow();
  }
  

  startSlideshow(): void {
    this.intervalId = setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.products.length;
    }, this.interval);
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }

  previousSlide(): void {
    this.currentIndex = (this.currentIndex - 1 + this.products.length) % this.products.length;
  }

  nextSlide(): void {
    this.currentIndex = (this.currentIndex + 1) % this.products.length;
  }
}
