import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { faPlus, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { MasiniModalComponent } from './masini-modal/masini-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-masini',
  templateUrl: './masini.component.html',
  styleUrls: ['./masini.component.css']
})
export class MasiniComponent implements OnInit {
  
  masini = [];
  editCar: any = [];

  constructor(private http:HttpClient, 
              private _modal: NgbModal) {  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData = (): void => {
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

  editDialog = (carId? : number): void => {
    console.log(carId);
    const modalRef = this._modal.open(MasiniModalComponent, {size: 'lg', keyboard: false, backdrop: 'static'});
    modalRef.componentInstance.carId = carId;
    modalRef.closed.subscribe(() => {
      this.loadData();
    });
  }

  deleteCar = (carId): void => {
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
}
