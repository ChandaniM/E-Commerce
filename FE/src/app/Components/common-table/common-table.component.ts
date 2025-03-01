import { Component, Input,  OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'common-table',
  imports: [],
  templateUrl: './common-table.component.html',
  styleUrl: './common-table.component.scss'
})
export class CommonTableComponent implements OnInit  , OnChanges{
  @Input() tableData: any[] = [];
  header: string[] = [];
  
  ngOnInit(): void {
    
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.tableData?.length > 0) {
      this.header = Object.keys(this.tableData[0]);
    }
    console.log(this.tableData, changes);
  }
  
}
