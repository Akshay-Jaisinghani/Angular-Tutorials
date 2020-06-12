import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { StudentTestService } from 'src/app/service/student-test.service';
import { AppService } from 'src/app/service/app.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CountdownComponent } from 'ngx-countdown';

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
  @ViewChild('countdown') counter: CountdownComponent;
  ngOnInit(): void {
  }
  
  fireEvent(event){
    if (event.action === "done") {
      this.submit();
    } else if(event.action === "pause") {
      this.studentTestService.currentTime =  this.counter.left;
    }
  }

  submit() {
    this.studentTestService.submitTest().subscribe(
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

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed === "yes") {
        this.submit();
      }
    });
  }
}
