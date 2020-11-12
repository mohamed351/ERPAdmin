import { HttpClient, HttpClientModule } from '@angular/common/http';
import { PagerViewModel, PagerResult } from './../../model/pager';

import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import {User} from '../../model/Clients';


// TODO: Replace this with your own data model type

export class AlfaDataTable{
  public data: User[];
  public totalCount: number;
}


const EXAMPLE_DATA: User[] = [];



export class DatatableDataSource extends DataSource<User> {
  public data: User[] = [];
  public paginator: MatPaginator;
  public sort: MatSort;
  public totalCount: number = 0;
  constructor() {
    super();
   
 
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<User[]> {
    
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      
      
    ];

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.data);
    }));
  }
  

  disconnect() {}

 
    private getPagedData=(data: User[])=> {
      
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data;
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
   
  
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
