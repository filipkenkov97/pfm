import { Component, OnInit, Input, Query } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { DialogCategoriesComponent } from '../dialog-categories/dialog-categories.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';


export interface Transactions {
  id: string;
  beneficiary_name: string;
  date: string;
  direction: string;
  amount: number;
  description: string;
  currency: string;
  mcc: number;
  kind: string;
  catcode: string;
}
@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})

export class TransactionsComponent implements OnInit {
  public displayedColumns: string[] = ['select','id', 'date','amount','description','currency','category','categorise','split'];
  selection = new SelectionModel<Transactions>(true, []);  
  transactions: Transactions[] = [];
  public dataSource = new MatTableDataSource<Transactions>();  

    constructor(    
    public dialog: MatDialog,
    private httpClient: HttpClient  
    ) { }
    
    public openDialog() {      
      const dialogConfig = new MatDialogConfig();
      
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;    

      this.dialog.open(DialogCategoriesComponent, dialogConfig);
    }
 
  ngOnInit(): void {      
      this.getTransactionItems();                                          
     }      
     
     getTransactionItems(){
       this.httpClient.get<any>('http://127.0.0.1:4010/transactions').subscribe(
         response => {
           console.log(response)
           this.dataSource.data = response.items;
         }
       )
     }         
    
     isAllSelected() {
      const numSelected = this.selection.selected.length;
      const numRows = this.dataSource.data.length;
      return numSelected === numRows;
    }
    masterToggle() {
      if (this.isAllSelected()) {
        this.selection.clear();       
      }
      else{
        this.selection.select(...this.dataSource.data)
      }        
                
    }
    
    checkboxLabel(row?: Transactions): string {
      if (!row) {
        return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
      }
      return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
    }    
  }

     