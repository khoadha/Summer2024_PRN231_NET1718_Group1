import { Component, OnInit, ViewChild } from '@angular/core';
import { QueryModel } from 'src/app/core/models/queryModel';
import { Paginator } from 'primeng/paginator';
import { RoomServiceService } from 'src/app/core/services/room-service.service';
import { Service } from 'src/app/core/models/order';

@Component({
  selector: 'app-service-page',
  templateUrl: './service-page.component.html',
  styleUrls: ['./service-page.component.css'],
})
export class ServicePageComponent implements OnInit {
  @ViewChild('paginator', { static: true }) paginator!: Paginator;
  services: Service[] = [];
  currentPage = 1;

  search: string = '';
  selectedType: string = '';

  size: number = 6;
  offset: number = 0;
  totalServices: number = 0;
  types: any = [
    {
      label: 'All types',
      value: '',
    },
    {
      label: 'Daily and monthly',
      value: 'ALL',
    },
    {
      label: 'Only daily rental',
      value: 'ONLY_DAY',
    },
    {
      label: 'Only monthly rental',
      value: 'ONLY_MONTHLY',
    },
  ];

  constructor(private roomServiceService: RoomServiceService) {}

  ngOnInit(): void {
    this.handleSearch();
  }

  handleSearch() {
    var query: QueryModel = {
      filter: this.search,
      top: this.size,
      skip: this.size * this.offset,
      selectedDropdownValue: this.selectedType,
    };
    this.roomServiceService.searchService(query).subscribe((res) => {
      this.services = res.data;
      if (res.data == null) {
        this.services = [];
      }
      this.totalServices = res.total;
    });
  }

  onApplyFilter() {
    this.offset = 0;
    this.handleSearch();
  }

  onPageChange(e: PageEvent) {
    this.offset = e.page!;
    this.handleSearch();
  }

  onSubmit() {
    this.handleSearch();
  }
}

interface PageEvent {
  first?: number;
  rows?: number;
  page?: number;
  pageCount?: number;
}
