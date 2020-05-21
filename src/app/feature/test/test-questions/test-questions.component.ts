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
    this.form = this.formBuilder.group({
      optionsArray: [''],
      selectedOption:''
    });
   }

  ngOnInit(): void {
    this.getTestQuestions();
    this.questionsArr = [
      {
          "questionNo": 1,
          "content": "Where is Pune",
          "optionvalue": [
              "3:Karnataka",
              "4:Maharashtra",
              "5:Rajasthan"
          ],
          "questionType": 1
      },
      {
          "questionNo": 2,
          "content": "Where is Mumbai",
          "optionvalue": [
              "6:Karnataka",
              "7:Maharashtra",
              "8:Rajasthan"
          ],
          "questionType": 1
      },
      {
          "questionNo": 3,
          "content": "What is Photosynthesis",
          "optionvalue": [
              "1:Karnataka",
              "2:Maharashtra"
          ],
          "questionType": 1
      },
      {
          "questionNo": 4,
          "content": "Where is Ajmer",
          "optionvalue": [
              "9:Karnataka",
              "10:Maharashtra",
              "11:Rajasthan"
          ],
          "questionType": 1
      },
      {
          "questionNo": 5,
          "content": "Where is Bangalore",
          "optionvalue": [
              "12:Karnataka",
              "13:Maharashtra",
              "14:Rajasthan"
          ],
          "questionType": 1
      }
  ]

    this.questionsArr.forEach(element => { 
      let optionArr = [];
      element["optionvalue"].forEach(item => {
        var option =  item.split(":");
        var optionObj = {
          id: '',
          name: ''
        }
        optionObj['id'] = option[0];
        optionObj['name'] = option[1];      
        optionArr.push(optionObj);
        element["optionArr"] = optionArr;
      });      

    });
  }

  getTestQuestions() {
    this.studentTestService.getTestQuestions(1).subscribe((data) => {
      console.log('questionsArray', data);
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
    document.getElementsByClassName("question-number-class")[0].children[0].className = "answered-class";
    console.log(this.form.controls)
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

  submitForm() {
    console.log(this.form.value)
  }

}
