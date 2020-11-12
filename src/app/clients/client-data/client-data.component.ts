import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { CurrencyService } from '../../api/currency.service';
import { PagerViewModel } from 'src/app/model/pager';
import {User} from '../../model/Clients';
import { DatatableDataSource } from './client.datatable.model';

@Component({
  selector: 'app-client-data',
  templateUrl: './client-data.component.html',
  styleUrls: ['./client-data.component.css']
})
export class ClientDataComponent implements OnInit {
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatTable, {static: false}) table: MatTable<User>;
  public tableSize: number = 0;
  dataSource: DatatableDataSource;
  displayedColumns=["image","client","phone", "fax","id"];
  constructor(private currencyService:CurrencyService) { }
  
  ngOnInit(): void {
    
    
  }
  Testing(data: any) {
    let view: PagerViewModel = {
      pageSize: data.pageSize,
      start:data.pageIndex
    }
    this.currencyService.GetDatatable<User>(view,"/api/Clients").subscribe(a => {
      this.dataSource = new DatatableDataSource();
      this.dataSource.data = a.data;
      this.dataSource.sort = this.sort;
      this.tableSize = a.totalCount;
      this.dataSource.paginator = this.paginator;
      this.table.dataSource = this.dataSource;
    });
  }
  ngAfterViewInit() {
    let view: PagerViewModel = {
      pageSize: this.paginator.pageSize,
      start:this.paginator.pageIndex
    }
    this.currencyService.GetDatatable<User>(view,"/api/Clients").subscribe(a => {
      console.log(a.totalCount);
      this.dataSource = new DatatableDataSource();
      this.dataSource.data = a.data;
      console.log(a.data);
      this.tableSize = a.totalCount;
    
      this.dataSource.paginator = this.paginator;
      this.table.dataSource = this.dataSource;
    });
    
  }

}

