import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { SetupService } from 'src/app/core/services/setup.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

  users: any[] = [];
  selectedUsers: any[] = [];
  content: string = '';
  subject: string = '';
  showModal: boolean = false;

  constructor(private setupService: SetupService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.setupService.getAllUsers().subscribe(res=> {
      this.users = res;
    })
  }

  onSubmit(){
    const dto:any = {
      content: this.content,
      emails: this.selectedUsers,
      subject: this.subject
    }
    this.setupService.sendEmail(dto).subscribe(res => {})
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Send email request successfully!' });
    this.showModal = false;
    this.content = '';
    this.subject = '';
    this.selectedUsers = [];
  }

  onClickSendEmailButton(){
    this.showModal = true;
  }

  isDataValid() {
    const textContent = this.stripHtml(this.content).trim();
    return this.selectedUsers.length >= 1 && textContent !== '' && this.subject.trim() != '';
  }
  
  stripHtml(html: string): string {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.textContent || div.innerText || '';
  }

}
