import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MasiniComponent } from '../masini.component';

@Component({
  selector: 'app-masini-modal',
  templateUrl: './masini-modal.component.html',
  styleUrls: ['./masini-modal.component.css']
})
export class MasiniModalComponent implements OnInit {
  carForm!:FormGroup;
  submitted = false;

  constructor(private http:HttpClient,
              private dialogRef: MatDialog, 
              private fb: FormBuilder) { }

  closeDialog() {
    this.dialogRef.closeAll();
  }

  faXmark = faXmark;
  okMsg = '';

  onCarAdd(car: {marca: string, model: string, anfab: string, capcil: string, taxa: string}) {
      let capcil = Number(car.capcil)
      let intTax = Number(car.taxa);
      if(capcil <= 1500 && capcil > 0) {
        intTax = 50;
      } else if (capcil > 1500 && capcil <= 2000) {
        intTax = 100;
      } else if (car.capcil === '' || capcil === NaN) {
        intTax = 0;
      } else {
        intTax = 200;
      }
      car.taxa = intTax.toString();
      this.http.post('http://localhost:8080/masina', car).subscribe(res => {
        this.okMsg = res.toString();
        if(this.okMsg !== '') {
          this.dialogRef.closeAll();
          window.location.reload();
        }
      });
  }

  ngOnInit() {
    this.carForm = this.fb.group({
      marca: ['', Validators.required],
      model: ['', Validators.required],
      anfab: ['', Validators.required],
      capcil: ['', Validators.required],
      taxa: ['', Validators.required]
    }, {updateOn: 'submit'})
  }

}
