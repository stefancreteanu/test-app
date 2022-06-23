import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-masini-modal',
  templateUrl: './masini-modal.component.html',
  styleUrls: ['./masini-modal.component.css']
})
export class MasiniModalComponent implements OnInit {
  carForm!:FormGroup;
  submitted = false;

  @Input() carId: number | undefined;

  modal = {} as any;

  constructor(private http: HttpClient,
              private fb: FormBuilder,
              private _modal: NgbActiveModal) { }

  closeDialog() {
    this._modal.dismiss();
  }

  faXmark = faXmark;
  okMsg = '';

  onCarAdd() {
      let capcil = Number(this.modal.capcil)
      let intTax = Number(this.modal.taxa);
      if(capcil <= 1500 && capcil > 0) {
        intTax = 50;
      } else if (capcil > 1500 && capcil <= 2000) {
        intTax = 100;
      } else if (this.modal.capcil === '' || capcil === NaN) {
        intTax = 0;
      } else {
        intTax = 200;
      }
      this.modal.taxa = intTax.toString();

      if(!this.carId) {
        this.http.post('http://localhost:8080/masina', this.modal).subscribe(res => {
        this.okMsg = res.toString();
          if(this.okMsg !== '') {
            this._modal.close()
            window.location.reload();
          }
        });
      } else {
        this.http.put('http://localhost:8080/updatecar', this.modal).subscribe();
        this._modal.close();
        window.location.reload();
      } 
  }

  ngOnInit() {
    this.carForm = this.fb.group({
      marca: ['', Validators.required],
      model: ['', Validators.required],
      anfab: ['', Validators.required],
      capcil: ['', Validators.required],
      taxa: ['', Validators.required]
    }, {updateOn: 'submit'})

    if(this.carId) {
      this.http.get(`http://localhost:8080/getcar/${this.carId}`).subscribe(data => {
        this.modal = data;
      })
    }
  }

}
