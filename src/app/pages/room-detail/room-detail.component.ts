import { Component, OnInit } from '@angular/core';
import { RoomService } from 'src/app/core/services/room.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Room } from 'src/app/core/models/room';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.css'],
})
export class RoomDetailComponent implements OnInit {
  room: any;
  responsiveOptions = [
    {
      breakpoint: '1024px',
      numVisible: 3,
      numScroll: 3,
    },
    {
      breakpoint: '768px',
      numVisible: 2,
      numScroll: 2,
    },
    {
      breakpoint: '560px',
      numVisible: 1,
      numScroll: 1,
    },
  ];

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private roomService: RoomService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.roomService.getRoomById(parseInt(id, 10)).subscribe((room) => {
        this.room = room;
      });
    } else {
      // handle the case when id is null
    }
  }

  onClickBookRoom(id: number) {
    const isLogged = this.authService.isLoggedIn();
    if(isLogged) {
      this.router.navigate([`/book-room/${id}`]);
    } else {
      this.router.navigate(['sign-in'], {queryParams: { redirectUrl: `/book-room/${id}`}});
    }
  }
}
