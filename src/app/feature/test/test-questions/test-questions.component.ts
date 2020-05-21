import { Component, OnInit } from '@angular/core';
import { StudentTestService } from 'src/app/service/student-test.service';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-test-questions',
  templateUrl: './test-questions.component.html',
  styleUrls: ['./test-questions.component.scss']
})
export class TestQuestionsComponent implements OnInit {

  questionsArr;
  selectedOption;
  form: FormGroup;

  constructor(private studentTestService : StudentTestService, private formBuilder: FormBuilder) {
    // this.form = this.formBuilder.group({
    //   options: this.createOptions()
    // });
   }

  ngOnInit(): void {
    this.getTestQuestions();
    this.questionsArr = [
      {
          "questionNo": 3,         
          "content": "Where is Pune",
          "optionvalue": [
             "Karnataka",
              "Maharashtra"
           ],
      }
    ]
  }

  getTestQuestions() {
    this.studentTestService.getTestQuestions(1).subscribe((data) => {
      console.log('questionsArray', data);
    });
   
  }

  // createOptions() {
  //   const arr = this.questionsArr[0].optionvalue.map(option => {
  //     return this.formBuilder.control(option.id);
  //   });
  //   return this.formBuilder.array(arr);
  // }

  // submit(value) {
  //   const formValue = Object.assign({}, value, {
  //     options: value.options.map((selected, i) => {
  //       return {
  //         id: this.questionsArr.options[i].id,
  //      }
  //     })
  //   });
  // }
  saveAndNext() {
    document.getElementsByClassName("question-number-class")[0].children[0].className = "answered-class";
  }

  saveAndMArkForReview() {
    document.getElementsByClassName("question-number-class")[0].children[1].className = "answered-and-marked-for-review-class";
  }

  markForReviewAndNext() {
    document.getElementsByClassName("question-number-class")[0].children[2].className = "marked-for-review-class";
  }

  clearResponse() {
    document.getElementsByClassName("question-number-class")[0].children[1].className = "question-number-button";
  }

}
