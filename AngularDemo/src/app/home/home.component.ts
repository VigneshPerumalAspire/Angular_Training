import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonService, Teams } from '../services/common.service';
import { MatDialog } from '@angular/material/dialog';
import { TeamDetailsComponent } from '../team-details/team-details.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  teamMembers: Teams[] = [];
  displayedColumns: string[] = ['Position', 'GameActivityTag', 'TeamName', 'StartDate', 'EndDate', 'Actions'];
  constructor(private commonservice: CommonService, private changeDetectorRefs: ChangeDetectorRef,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.GetTeamMembers();
  }

  GetTeamMembers(): void {
    this.commonservice.ExecuteGet().subscribe((response: any) => {
      if (response) {
        this.teamMembers = response.Team;
      }
    }, (error: any) => {
      return error;
    })
  }

  Delete(index: number): void {
    this.teamMembers.splice(index, 1);
    this.teamMembers = [...this.teamMembers];
  }

  ViewTeamDetails(Details: any): void {
    let dialogRef = this.dialog.open(TeamDetailsComponent, {
      width: '75%',
      disableClose: true,
      data: {
        teamdetails: Details
      },
    });

    dialogRef.afterClosed().subscribe(result => {})
  }

}
