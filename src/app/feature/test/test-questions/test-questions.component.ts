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
          "questionNo": 1,
          "content": "Where is Pune",
          "optionvalue": [
              "3:Karnataka",
              "4:Maharashtra",
              "5:Rajasthan"
          ]
      },
      {
          "questionNo": 2,
          "content": "Where is Mumbai",
          "optionvalue": [
              "6:Karnataka",
              "7:Maharashtra",
              "8:Rajasthan"
          ]
      },
      {
          "questionNo": 3,
          "content": "What is Photosynthesis",
          "optionvalue": [
              "1:Karnataka",
              "2:Maharashtra"
          ]
      },
      {
          "questionNo": 4,
          "content": "Where is Ajmer",
          "optionvalue": [
              "9:Karnataka",
              "10:Maharashtra",
              "11:Rajasthan"
          ]
      },
      {
          "questionNo": 5,
          "content": "Where is Bangalore",
          "optionvalue": [
              "12:Karnataka",
              "13:Maharashtra",
              "14:Rajasthan"
          ]
      }
  ]

    this.questionsArr.forEach(element => { 
      element["optionvalue"].forEach(item => {
        var option =  item.split(":");
        var optionObj = {
          id: '',
          name: ''
        }
        optionObj['id'] = option[0];
        optionObj['name'] = option[1];    
        //element["optionObj"] = optionObj;    
      });      
    });
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

}
