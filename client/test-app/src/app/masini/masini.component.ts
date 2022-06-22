import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { faPlus, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { MasiniModalComponent } from './masini-modal/masini-modal.component';

@Component({
  selector: 'app-masini',
  templateUrl: './masini.component.html',
  styleUrls: ['./masini.component.css']
})
export class MasiniComponent implements OnInit {
  
  masini = [];
  constructor(private http:HttpClient, private dialogRef: MatDialog) {
    this.http.get<any>('http://localhost:8080/masina').subscribe(data => {
      for(let i = 0; i < data.length; i++) {
        this.masini.push({anfab: data[i].anfab,
                     capcil: data[i].capcil, 
                     id: data[i].id, 
                     marca: data[i].marca,
                     model: data[i].model,
                     taxa: data[i].taxa})
      }
    })
  }

  openDialog() {
    this.dialogRef.open(MasiniModalComponent);
  }

  editDialog() {
    this.dialogRef.open(MasiniModalComponent);
  }

  deleteCar(carId) {
    let parsedId = {
      id: carId
    }
    this.http.delete(`http://localhost:8080/delcar/${parsedId.id}`).subscribe();
    window.location.reload();
  }

  // Icons

  faPlus = faPlus;
  faEdit = faEdit;
  faTrash = faTrash;

  ngOnInit(): void { }
}
