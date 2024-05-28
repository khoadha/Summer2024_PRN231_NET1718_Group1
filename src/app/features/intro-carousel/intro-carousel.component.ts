import { Component } from '@angular/core';

@Component({
  selector: 'app-intro-carousel',
  templateUrl: './intro-carousel.component.html',
  styleUrls: ['./intro-carousel.component.css']
})
export class IntroCarouselComponent {
  images = [
    { url: 'src\assets\images\slide-1.jpg', location: 'Doral, Florida', zipCode: '78345', propertyNumber: '204', propertyName: 'Mount Olive Road Two', price: '12,000' },
    { url: 'src\assets\images\slide-2.jpg', location: 'Doral, Florida', zipCode: '78345', propertyNumber: '204', propertyName: 'Rino Venda Road Five', price: '12,000' },
    { url: 'src\assets\images\slide-3.jpg', location: 'Doral, Florida', zipCode: '78345', propertyNumber: '204', propertyName: 'Alira Roan Road One', price: '12,000' }
  ];

  responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 1,
      numScroll: 1
    },
    {
      breakpoint: '768px',
      numVisible: 1,
      numScroll: 1
    },
    {
      breakpoint: '560px',
      numVisible: 1,
      numScroll: 1
    }
  ];
}
