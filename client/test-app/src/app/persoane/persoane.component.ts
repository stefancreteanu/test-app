import { Component, OnInit } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { HttpClient } from '@angular/common/http'; 
import { faPlus, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { PersModalComponent } from './pers-modal/pers-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-persoane',
  templateUrl: './persoane.component.html',
  styleUrls: ['./persoane.component.css']
})
export class PersoaneComponent implements OnInit {

  // API Call

  persoane = [];

  dropdownList = [];
  selectedItems = [];
  dropdownSettings:IDropdownSettings;

  constructor(private http:HttpClient, private dialogRef: NgbModal) { }

  // Init

  ngOnInit() {
    this.dropdownSettings = {
      singleSelection: true,
      idField: 'item_id',
      textField: 'item_text',
      itemsShowLimit: 1,
      allowSearchFilter: true
    };
    this.loadData();
  }

  loadData = (): void => {
    this.http.get<any>('http://localhost:8080/persoane').subscribe(data => {
      for(let i = 0; i < data.length; i++) {
        this.persoane.push({
          id: data[i].id,
          nume: data[i].nume,
          prenume: data[i].prenume,
          cnp: data[i].cnp,
          varsta: data[i].varsta,
          masina: data[i].masina
        })
        this.http.get<any>(`http://localhost:8080/getcar/${this.persoane[i].masina}`).subscribe(carData => {
          let tmp = [carData]
          for(let j = 0; j < tmp.length; j++) {
            this.dropdownList.push({
              item_id: j,
              item_text: tmp[j].marca
            })
          }
          console.log(this.dropdownList)
        });
      }
    });
  }

  openDialog() {
    this.dialogRef.open(PersModalComponent);
  }

  // Icons

  faPlus = faPlus;
  faEdit = faEdit;
  faTrash = faTrash;

  
}
