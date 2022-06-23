import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-pers-modal',
  templateUrl: './pers-modal.component.html',
  styleUrls: ['./pers-modal.component.css']
})
export class PersModalComponent implements OnInit {
  personForm!:FormGroup;
  submitted = false;

  constructor(private http:HttpClient, private dialogRef: NgbActiveModal, private fb: FormBuilder) { }

  closeDialog() {
    this.dialogRef.dismiss();
  }

  faXmark = faXmark;
  okMsg = '';

  person = {} as any;

  onPersonAdd() {
    const arrCNP = this.person.cnp;
    const dateObj = new Date();

    //Split personal number 
    const newArr = arrCNP.split('');

    //Find birth year
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth();
    const birthYear = newArr[1].concat(newArr[2]);

    const intBirth = Number(birthYear);
    const ageArr  = year - intBirth;
    const strYear = ageArr.toString();
    const arrYear = strYear.split('');
    let age = arrYear[2].concat(arrYear[3]);
    let intAge = Number(age);

    //Find birth month
    const birthMonth = newArr[3].concat(newArr[4]);
    const intBirthMonth = Number(birthMonth);

    //Calculate age
    if(month < intBirthMonth) {
      intAge--
    }
    this.person.varsta = intAge.toString();
    this.http.post('http://localhost:8080/persoane', this.person).subscribe(res => {
      this.okMsg = res.toString();
      this.dialogRef.close();
    });
  }

  ngOnInit(): void {
      this.personForm = this.fb.group({
      nume: ['', Validators.required],
      prenume: ['', Validators.required],
      cnp: ['', Validators.required],
      masina: ['', Validators.required],
    }, {updateOn: 'submit'})
    
  }
}
