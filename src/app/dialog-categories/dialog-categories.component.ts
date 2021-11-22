import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatListModule } from '@angular/material/list';
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import { FlexibleConnectedPositionStrategyOrigin } from '@angular/cdk/overlay';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { isNgTemplate } from '@angular/compiler';

export interface Categories{
  code: string;
  parentCode:string;
  name:string;
}
@Component({
  selector: 'app-dialog-categories',
  templateUrl: './dialog-categories.component.html',
  styleUrls: ['./dialog-categories.component.scss']
})
export class DialogCategoriesComponent implements OnInit {
  public categories: Categories[] = [];
  public subCategories: Categories[] = [];
  public selectedCategory: any;  
  form: any;
    constructor(    
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<DialogCategoriesComponent>,
    private httpClient: HttpClient   
  ) { }

  ngOnInit(): void {     
    this.getCategoryItems();   
    }
  
  save() {   
    this.dialogRef.close();      
}

  close() {
    this.dialogRef.close();

}
getCategoryItems(){
  this.httpClient.get<any>('http://127.0.0.1:4010/categories').subscribe(
    response => {      
      this.categories = response.items.map((x:any)=> ({code:x.code, parentCode:x['parent-code'], name:x.name})).filter((y:Categories)=>y.parentCode=='');
      console.log(this.categories)
      this.subCategories = response.items.map((x:any)=> ({code:x.code, parentCode:x['parent-code'], name:x.name})).filter((g:Categories)=>g.parentCode!='');
      console.log(this.subCategories)
    }
  )
}
}
