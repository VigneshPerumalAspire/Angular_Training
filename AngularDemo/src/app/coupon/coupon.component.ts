import { AfterViewInit, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonService, Teams } from '../services/common.service';

@Component({
  selector: 'app-coupon',
  templateUrl: './coupon.component.html',
  styleUrls: ['./coupon.component.scss']
})
export class CouponComponent implements OnInit{

  coupon: any;
  displayColNames = [
    { columnDef: 'id', header: 'ID.', cell: (element: any) => `${element.id}` },
    { columnDef: 'name', header: 'Coupon Name', cell: (element: any) => `${element.name}` },
    { columnDef: 'code', header: 'Coupon Code', cell: (element: any) => `${element.code}` },
    { columnDef: 'status', header: 'Coupon Status', cell: (element: any) => `${element.status}` },
    { columnDef: 'date', header: 'Expiry Date', cell: (element: any) => `${element.date}` },
  ];

  constructor(private commonservice: CommonService,) { }

  ngOnInit(): void {
    this.GetCouponList();
  }

  GetCouponList(): void {
    const apiendpoint = '3b8da004-c15c-4528-879e-c4a2259c98c2';
    this.commonservice.ExecuteGet(apiendpoint).subscribe((response: any) => {
      if (response) {
        this.coupon = response;
      }
    }, (error: any) => {
      return error;
    })
  }

}
