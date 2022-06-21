import { Component, OnInit } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { HttpClient } from '@angular/common/http'; 
import { faPlus, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import { PersModalComponent } from './pers-modal/pers-modal.component';

@Component({
  selector: 'app-persoane',
  templateUrl: './persoane.component.html',
  styleUrls: ['./persoane.component.css']
})
export class PersoaneComponent implements OnInit {

  // API Call

  persons: any;

  dropdownList = [];
  selectedItems = [];
  dropdownSettings:IDropdownSettings;

  constructor(private http:HttpClient, private dialogRef: MatDialog) {
    // let tmp = []; 
    // this.http.get<any>('http://localhost:8080/persoane').subscribe(data => {
    //   for(let i = 0; i < data.length; i++) {
    //     tmp.push({item_id: i, item_text: data[i].car});
    //   }
    //   this.dropdownList = tmp;
    //   console.log(data);
    // });
  }

  openDialog() {
    this.dialogRef.open(PersModalComponent);
  }

  // Icons

  faPlus = faPlus;
  faEdit = faEdit;
  faTrash = faTrash;

  // Init

  ngOnInit() {
    this.dropdownSettings = {
      singleSelection: true,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'Unselect All',
      itemsShowLimit: 1,
      allowSearchFilter: true
    };
  }
  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

}
