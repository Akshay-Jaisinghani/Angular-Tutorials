import { Component, OnInit, ViewChild } from '@angular/core';
import { StudentTestService } from 'src/app/service/student-test.service';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { ResponseComponent } from '../response/response.component';

@Component({
  selector: 'app-test-questions',
  templateUrl: './test-questions.component.html',
  styleUrls: ['./test-questions.component.scss']
})
export class TestQuestionsComponent implements OnInit {

  selectedOption;
  form: FormGroup;
  questionNo;
  isLoading = true;

  constructor(public studentTestService: StudentTestService, private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      optionsArray: this.formBuilder.array([]),
      selectedOption: ''
    });
  }

  ngOnInit() {
    this.isLoading = true;
    this.getTestQuestions();
  }

  getTestQuestions() {
    this.studentTestService.getTestQuestions(1).subscribe((data) => {
      //console.log(JSON.stringify(data));
      this.studentTestService.allTestQuestions = data;


    }, (error) => {
      console.log("Error", error);
      this.studentTestService.allTestQuestions = [{ "questionNo": 1, "content": "Where is Pune", "optionvalue": [{ "id": 3, "question": null, "optionvalue": "Karnataka", "weight": null }, { "id": 4, "question": null, "optionvalue": "Maharashtra", "weight": null }, { "id": 5, "question": null, "optionvalue": "Rajasthan", "weight": null }], "questionType": 1 }, { "questionNo": 2, "content": "Where is Mumbai", "optionvalue": [{ "id": 6, "question": null, "optionvalue": "Karnataka", "weight": null }, { "id": 7, "question": null, "optionvalue": "Maharashtra", "weight": null }, { "id": 8, "question": null, "optionvalue": "Rajasthan", "weight": null }], "questionType": 1 }, { "questionNo": 3, "content": "Where is Nagpur", "optionvalue": [{ "id": 1, "question": null, "optionvalue": "Karnataka", "weight": null }, { "id": 2, "question": null, "optionvalue": "Maharashtra", "weight": null }], "questionType": 1 }, { "questionNo": 4, "content": "Where is Ajmer", "optionvalue": [{ "id": 9, "question": null, "optionvalue": "Karnataka", "weight": null }, { "id": 10, "question": null, "optionvalue": "Maharashtra", "weight": null }, { "id": 11, "question": null, "optionvalue": "Rajasthan", "weight": null }], "questionType": 1 }, { "questionNo": 5, "content": "Where is Bangalore", "optionvalue": [{ "id": 12, "question": null, "optionvalue": "Karnataka", "weight": null }, { "id": 13, "question": null, "optionvalue": "Maharashtra", "weight": null }, { "id": 14, "question": null, "optionvalue": "Rajasthan", "weight": null }], "questionType": 1 }]
    }, () => {
      this.studentTestService.currentQuestionObj = this.studentTestService.getQuestion(this.studentTestService.currentQuestionNumber);
      this.studentTestService.totalQuestionsCount = Array.from(new Array(this.studentTestService.allTestQuestions.length), (x, i) => i + 1);
      this.studentTestService.notVisited = this.studentTestService.allTestQuestions.length - 1;
      this.studentTestService.notAnswered = this.studentTestService.allTestQuestions.length;
      this.isLoading = false;
    });
  }


  onCheckboxChange(e) {
    const optionsArray: FormArray = this.form.get('optionsArray') as FormArray;

    if (e.target.checked) {
      optionsArray.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      optionsArray.controls.forEach((item: FormControl) => {
        if (item.value == e.target.value) {
          optionsArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  saveAndNext() {
    document.getElementsByClassName("question-number-class")[0].children[this.studentTestService.currentQuestionNumber].className = "answered-class";
    this.studentTestService.saveResponse(this.studentTestService.currentQuestionObj, this.form.value); 
    this.changeTestResponseClass();
    this.clearFormArray();
    
  }

  saveAndMArkForReview() {
    document.getElementsByClassName("question-number-class")[0].children[this.studentTestService.currentQuestionNumber].className = "answered-and-marked-for-review-class";
    this.studentTestService.saveResponse(this.studentTestService.currentQuestionObj, this.form.value); 
    this.changeTestResponseClass();
    this.clearFormArray();
  }

  markForReviewAndNext() {
    document.getElementsByClassName("question-number-class")[0].children[this.studentTestService.currentQuestionNumber].className = "marked-for-review-class";
    this.changeTestResponseClass();
    this.studentTestService.markedForReview = this.studentTestService.markedForReview + 1;
  }

  clearResponse() {
    document.getElementsByClassName("question-number-class")[0].children[this.studentTestService.currentQuestionNumber].className = "question-number-button";
      this.studentTestService.answered = this.studentTestService.answered - 1;   
      this.clearFormArray();
  }

  submitForm() {
    console.log(this.form.value)
  }

  changeTestResponseClass() {
    this.studentTestService.currentQuestionNumber = this.studentTestService.currentQuestionNumber + 1;
    this.studentTestService.currentQuestionObj = this.studentTestService.getQuestion(this.studentTestService.currentQuestionNumber);
    if(this.studentTestService.notVisited > 0) {
      this.studentTestService.notVisited = this.studentTestService.notVisited - 1;
    }
    if(this.studentTestService.notAnswered > 0) {
      this.studentTestService.notAnswered = this.studentTestService.notAnswered - 1;
    }
    if(this.studentTestService.answered  <= this.studentTestService.allTestQuestions.length) {
    this.studentTestService.answered = this.studentTestService.answered + 1;
    }
  }

  back() {

  }

  next() {

  }

  clearFormArray(){
    let formArray = this.form.get('optionsArray') as FormArray;
    formArray.clear();
  }
}
