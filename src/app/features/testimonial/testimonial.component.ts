import { Component } from '@angular/core';

@Component({
  selector: 'app-testimonial',
  templateUrl: './testimonial.component.html',
  styleUrls: ['./testimonial.component.css']
})
export class TestimonialComponent {
  testimonials = [
    {
      image: "assets/images/testimonial-1.jpg",
      text: 'Choosing Hosteland was a revelation in my life. The blend of affordability, security, and convenience they offer is unparalleled. Every booking is a breeze, and each stay has been consistently comfortable and enjoyable. Their commitment to customer satisfaction shines through their attentive service. I’m always assured of a pleasant experience with Hosteland, making it my go-to for accommodations.',
      authorImage: "assets/images/mini-testimonial-1.jpg",
      author: 'Albert & Erika'
    },
    {
      image: "assets/images/testimonial-2.jpg",
      text: 'Hosteland transformed my living experiences. Their exceptional service, secure and affordable accommodations, make every stay delightful. Highly recommended for every traveler!',
      authorImage: "assets/images/mini-testimonial-2.jpg",
      author: 'Pablo & Emma'
    }
  ];
}
