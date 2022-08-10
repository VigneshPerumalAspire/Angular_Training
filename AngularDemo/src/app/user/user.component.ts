import { AfterViewInit, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonService, Teams } from '../services/common.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  users: any;
  displayColNames = [
    { columnDef: 'id', header: 'ID.', cell: (element: any) => `${element.id}` },
    { columnDef: 'name', header: 'User Name', cell: (element: any) => `${element.name}` },
    { columnDef: 'email', header: 'User Email', cell: (element: any) => `${element.email}` },
    { columnDef: 'status', header: 'User Status', cell: (element: any) => `${element.status}` },
    { columnDef: 'date', header: 'Date', cell: (element: any) => `${element.date}` },
  ];

  constructor(private commonservice: CommonService,) { }

  ngOnInit(): void {
    this.GetTeamMembers();
  }

  GetTeamMembers(): void {
    const apiendpoint = '5cefcdec-e746-4634-9080-29c0b8e033a3';
    this.commonservice.ExecuteGet(apiendpoint).subscribe((response: any) => {
      if (response) {
        this.users = response;
      }
    }, (error: any) => {
      return error;
    })
  }

}
