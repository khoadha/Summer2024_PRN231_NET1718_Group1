import { Component, OnInit } from '@angular/core';
import { QueryModel } from 'src/app/core/models/queryModel';
import { RoomDisplay } from 'src/app/core/models/room';
import { RoomService } from 'src/app/core/services/room.service';

@Component({
  selector: 'app-intro-carousel',
  templateUrl: './intro-carousel.component.html',
  styleUrls: ['./intro-carousel.component.css']
})
export class IntroCarouselComponent implements OnInit {

  properties: RoomDisplay[] = [];
  images: any;
  constructor(private roomService: RoomService) {}

  ngOnInit(): void {
    this.initRooms();
  }

  initRooms() {
    var query: QueryModel = {
      top: 5,
    };
    this.roomService.searchRoomDisplay(query).subscribe(res => {
      this.updateImages(res.data);
    });
  }

  updateImages(data: any){
    this.images = data.map((room: any) => ({
      url: room.imgPath,
      location: room.categoryName,
      propertyNumber: room.id.toString(),
      propertyName: room.name,
      price: room.costPerDay.toString()
  }));
  }

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
