import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { StudentTestService } from 'src/app/service/student-test.service';
import { AppService } from 'src/app/service/app.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.scss']
})
export class StudentDetailsComponent implements OnInit {
  @ViewChild('confirmationDialog') confirmationDialog: TemplateRef<any>;
  currentUser;
  constructor(private dialog: MatDialog,public studentTestService: StudentTestService, private appService: AppService,private router: Router) {
    this.testDuration = this.studentTestService.currentTestDuration;
    this.currentUser = this.appService.currentUserValue;
  }
  testDuration;
  ngOnInit(): void {
  }
  
  fireEvent(event){
    if (event.action === "done") {
      this.submit();
    }
  }

  submit() {
    this.studentTestService.submitTest(this.appService.currentUserValue.id, this.studentTestService.currentTestId).subscribe(
      (res) => {
        console.log(res);
      },
      error => {
        console.log(error);
      },
      () => {
        this.router.navigateByUrl("result/" + this.studentTestService.currentTestResultId);
      })
  }

  confirmSubmitTest() {
    const dialogRef = this.dialog.open(this.confirmationDialog, {
      width: "400px",
      height: "200px",
      data: {
        title: "Submit Test",
        buttonText: {
          ok: 'Done',
          cancel: 'Cancel'
        }
      }
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed === "yes") {
        this.submit();
      }
    });
  }

}
