import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { CommonService, Teams } from '../services/common.service';
import { TeamDetailsComponent } from '../team-details/team-details.component';

import { HomeComponent } from './home.component';
import { HttpClientModule } from '@angular/common/http';
import { MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { of } from 'rxjs';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let expectedteams: Teams[] = [
    { GameActivityTag: 'STANDARD', TeamName: 'TestAsp', StartDate: '2021-12-28' }
  ];
  let dialog: MatDialog;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [
        HttpClientModule,
        MatDialogModule,
        MatTableModule
      ]
    })
      .compileComponents();

    dialog = TestBed.inject(MatDialog);
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('App Created', () => {
    expect(component).toBeTruthy();
  });

  it('Test table data using table tr selector', () => {

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      let tableRows = fixture.nativeElement.querySelectorAll('tr');
      expect(tableRows.length).toBeGreaterThan(1);

      // Header row
      let headerRow = tableRows[0];
      expect(headerRow.cells[1].innerHTML).toContain('GameActivityTag');
      expect(headerRow.cells[2].innerHTML).toContain('TeamName');
      expect(headerRow.cells[3].innerHTML).toContain('StartDate');

      // Data rows
      let row1 = tableRows[1];
      expect(row1.cells[1].innerHTML).toContain('STANDARD');
      expect(row1.cells[2].innerHTML).toContain('TestAsp');
      // expect(row1.cells[3].innerHTML).toContain('2021-12-28');

    })
  });

  it('Check & Show the table data using query selector', () => {
    const ourDomTableUnderTest: any = document.querySelector('table#teamTable');

    const teamInTable = Array.from(
      ourDomTableUnderTest.getElementsByClassName('mat-row')
    );

    teamInTable.forEach((list: any) => {
      const RowGameActivityTag = list.getElementsByClassName('mat-column-GameActivityTag').item(0).textContent;
      const RowTeamName = list.getElementsByClassName('mat-column-TeamName').item(0).textContent;
      const RowStartDate = list.getElementsByClassName('mat-column-StartDate').item(0).textContent;

      expect(expectedteams).toContain(
        jasmine.objectContaining({
          GameActivityTag: RowGameActivityTag,
          TeamName: RowTeamName,
          StartDate: RowStartDate
        })
      );
    });
  });

  it('Check & Show the table columns we expect', () => {
    const ourDomTableUnderTest: any = document.querySelector('table#teamTable');

    const tableHeaders = Array.from(
      ourDomTableUnderTest.getElementsByClassName('mat-header-cell')
    );
    const headerClasses = [
      'mat-column-Position',
      'mat-column-GameActivityTag',
      'mat-column-TeamName',
      'mat-column-StartDate',
      'mat-column-EndDate',
      'mat-column-Actions'
    ];
    tableHeaders.forEach((header: any) => {
      expect(
        headerClasses.some(item => header.classList.contains(item))
      ).toBeTruthy();
    });
  });

  it('Open dialog on trigger', () => {
    spyOn(dialog, 'open').and.returnValue({afterClosed: () => of(expectedteams)} as MatDialogRef<typeof TeamDetailsComponent>);
    component.ViewTeamDetails(expectedteams);
    expect(dialog.open).toHaveBeenCalled();
  });

});
