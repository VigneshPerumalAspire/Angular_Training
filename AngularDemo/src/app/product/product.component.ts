import { AfterViewInit, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonService, Teams } from '../services/common.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  products: any;
  // displayColNames: string[] = ['id', 'name', 'progress', 'fruit'];
  displayColNames = [
    { columnDef: 'id', header: 'ID.', cell: (element: any) => `${element.id}` },
    { columnDef: 'name', header: 'PRoduct Name', cell: (element: any) => `${element.name}` },
    { columnDef: 'code', header: 'Product Code', cell: (element: any) => `${element.code}` },
    { columnDef: 'status', header: 'Product Status', cell: (element: any) => `${element.status}` },
    { columnDef: 'date', header: 'Date', cell: (element: any) => `${element.date}` },
  ];

  constructor(private commonservice: CommonService,) { }

  ngOnInit(): void {
    this.getProductDetails();
  }

  getProductDetails(): void {
    const apiendpoint = 'ea15ed4e-50e0-4f64-af4b-4082cb288641';
    this.commonservice.ExecuteGet(apiendpoint).subscribe((response: any) => {
      if (response) {
        this.products = response;
      }
    }, (error: any) => {
      return error;
    })
  }

}

