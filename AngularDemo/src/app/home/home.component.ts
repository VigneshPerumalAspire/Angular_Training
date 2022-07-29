import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonService } from '../services/common.service';
import { MatDialog } from '@angular/material/dialog';
import { TeamDetailsComponent } from '../team-details/team-details.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  teamMembers: any;
  displayedColumns: string[] = ['Position', 'GameActivityTag', 'TeamName', 'StartDate', 'EndDate', 'Actions'];
  constructor(private commonservice: CommonService, private changeDetectorRefs: ChangeDetectorRef,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.GetTeamMembers();
  }

  GetTeamMembers(): void {
    const apiUrl = 'https://mocki.io/v1/a638c068-89c2-4e24-8447-20a03f5e7b77';
    this.commonservice.ExecuteGet(apiUrl).subscribe((response: any) => {
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
    this.dialog.open(TeamDetailsComponent, {
      width: '75%',
      disableClose: true,
      data: {
        teamdetails: Details
      },
    });
  }

}
