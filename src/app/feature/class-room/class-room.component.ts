import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-class-room',
  templateUrl: './class-room.component.html',
  styleUrls: ['./class-room.component.scss']
})
export class ClassRoomComponent implements OnInit {
  @ViewChild('classRoomDialog') classRoomDialog: TemplateRef<any>;
  classroomForm: FormGroup;
  constructor(private dialog: MatDialog,
    private readonly fb: FormBuilder) { }

  ngOnInit(): void {
    this.classroomForm = this.fb.group({
      classroomName: ['', Validators.compose([Validators.required])],
    });
  }
  addClassRoom() {
    const dialogRef = this.dialog.open(this.classRoomDialog, {
      width: "400px",
      height: "200px",
      data: {
        title: "Add Classroom",
        buttonText: {
          ok: 'Done',
          cancel: 'Cancel'
        }
      }
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
        
    });
  }

}
