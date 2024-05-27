import { Component } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {
  slides = [
    {
      image: 'assets/images/slider1.jpg',
      hotelName: 'Bora Hotel',
      heading: 'Reserve Room for Family Vacation'
    },
    {
      image: 'assets/images/slider2.jpg',
      hotelName: 'Deluxe Hotel',
      heading: 'Make Your Vacation Comfortable'
    },
    {
      image: 'assets/images/slider3.jpg',
      hotelName: 'Luxe Hotel',
      heading: 'A Best Place To Enjoy Your Life'
    }
  ];
}
