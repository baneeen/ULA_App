import { Component, ViewChild, Inject  } from '@angular/core';
import { MatDialog, MatTable } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';


export interface UsersData {
  name: string;
  id: number;
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
  //code-source part 1 : https://www.techieclues.com/articles/create-and-build-an-asp-net-core-angular-crud-application-part-1
 // code-source part 2 : https://www.techieclues.com/articles/create-and-build-an-asp-net-core-angular-crud-application-part-2
export class AppComponent {


  title = 'app';
  displayedColumns: string[] = ['bookName','author', 'bookCategory', 'numberOfCopies','dateTimeOfCreation', 'action'];
  dataSource: any;
  public book: Book;
  @ViewChild(MatTable, { static: true }) table: MatTable<any>;
  
  constructor(public dialog: MatDialog, public http: HttpClient, @Inject('BASE_URL') public baseUrl: string) {
    http.get<Book[]>(baseUrl + 'api/books').subscribe(result => {
      this.dataSource = result;
    }, error => console.error(error));
  }

  openDialog(action, obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '300px',
      data: obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.event == 'Add') {
        this.addRowData(result.data);
      } else if (result.event == 'View') {
        this.viewRowData(result.data);
      } else if (result.event == 'Update') {
        this.updateRowData(result.data);
      } else if (result.event == 'Delete') {
        this.deleteRowData(result.data);
      }
    });
  }

  addRowData(newRow) {
    this.dataSource.push({
      bookName: newRow.bookName,
      author: newRow.author,
      bookCategory: newRow.bookCategory,
      numberOfCopies: newRow.numberOfCopies,
      dateTimeOfCreation: newRow.dateTimeOfCreation
    });

    this.book = {
      bookID : newRow.bookID,
      bookName: newRow.bookName,
      author: newRow.author,
      bookCategory: newRow.bookCategory,
      numberOfCopies: parseInt( newRow.numberOfCopies ),
      dateTimeOfCreation: new Date( newRow.dateTimeOfCreation)
    };
    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify(this.book);
    this.http.post<Book>(this.baseUrl + 'api/Books', body, { 'headers': headers }).subscribe(data => {
    })

    this.table.renderRows();

  }

  viewRowData(newRow) {
    this.dataSource = this.dataSource.filter((value, key) => {
      if (value.bookID == newRow.bookID) {
            value.BookName = newRow.bookName;
            value.author = newRow.author,
            value.bookCategory = newRow.bookCategory,
            value.numberOfCopies = newRow.numberOfCopies,
            value.dateTimeOfCreation = newRow.dateTimeOfCreation

      }

      this.book = {
        bookID: newRow.bookID,
        bookName: newRow.bookName,
        author: newRow.author,
        bookCategory: newRow.bookCategory,
        numberOfCopies: parseInt(newRow.numberOfCopies),
        dateTimeOfCreation: new Date(newRow.dateTimeOfCreation)
      };
      const headers = { 'content-type': 'application/json' }
      const body = JSON.stringify(this.book);
      this.http.put<Book[]>(this.baseUrl + 'api/Books/' + newRow.bookID, body, { 'headers': headers }).subscribe(data => {
      })
      return true;
    });
  }
  updateRowData(newRow) {
    this.dataSource = this.dataSource.filter((value, key) => {
      if (value.bookID == newRow.bookID) {
        value.BookName = newRow.bookName;
        value.author = newRow.author,
        value.bookCategory = newRow.bookCategory,
        value.numberOfCopies = newRow.numberOfCopies,
        value.dateTimeOfCreation = newRow.dateTimeOfCreation
      
      }

      this.book = {
        bookID: newRow.bookID,
        bookName: newRow.bookName,
        author: newRow.author,
        bookCategory: newRow.bookCategory,
        numberOfCopies: parseInt(newRow.numberOfCopies),
        dateTimeOfCreation: new Date(newRow.dateTimeOfCreation)
      };
      const headers = { 'content-type': 'application/json' }
      const body = JSON.stringify(this.book);
      this.http.put<Book[]>(this.baseUrl + 'api/Books/' + newRow.bookID, body, { 'headers': headers }).subscribe(data => {
      })
      return true;
    });
  }

  deleteRowData(newRow) {
    this.dataSource = this.dataSource.filter((value, key) => {
      this.http.delete<any>(this.baseUrl + 'api/Books/' + newRow.bookID).subscribe(data => {
      })
      return value.bookID != newRow.bookID;
    });
  }
}


interface Book {
  bookID: number;
  bookName: string;
  author: string;
  bookCategory: string;
  numberOfCopies: number;
  dateTimeOfCreation: Date;
}
