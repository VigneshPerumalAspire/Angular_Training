import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TeamDetailsComponent } from './team-details.component';

describe('TeamDetailsComponent', () => {
  let component: TeamDetailsComponent;
  let fixture: ComponentFixture<TeamDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TeamDetailsComponent],
      imports: [MatDialogModule],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamDetailsComponent);
    component = fixture.componentInstance;
  });

  it('Confirm table data shown correctly', () => {
    let tableRows = fixture.nativeElement.querySelectorAll('tr');
    expect(tableRows.length).toBeGreaterThan(1);

    // FIrst row
    let FirstRow = tableRows[0];
    expect(FirstRow.cells[0].innerHTML).toContain('GameActivityDescription');
    expect(FirstRow.cells[1].innerHTML).toBeDefined();
    expect(FirstRow.cells[2].innerHTML).toContain('GameActivityId');
    expect(FirstRow.cells[3].innerHTML).toBeDefined();

    // Second  row
    let SecondRow = tableRows[1];
    expect(SecondRow.cells[0].innerHTML).toContain('GameActivityIdTag');
    expect(SecondRow.cells[1].innerHTML).toBeDefined();
    expect(SecondRow.cells[2].innerHTML).toContain('GameActivityTag');
    expect(SecondRow.cells[3].innerHTML).toBeDefined();

    // Third  row
    let ThirdRow = tableRows[2];
    expect(ThirdRow.cells[0].innerHTML).toContain('Gender');
    expect(ThirdRow.cells[1].innerHTML).toBeDefined();
    expect(ThirdRow.cells[2].innerHTML).toContain('GenderCode');
    expect(ThirdRow.cells[3].innerHTML).toBeDefined();
  });

});
