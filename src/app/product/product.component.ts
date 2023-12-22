import {  Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { SanPham } from '../san_pham/san-pham';
import { HttpClient } from '@angular/common/http';
import { SanPhamService } from '../san_pham/san-pham.service';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent  {
 
  router: any;
  routerSubscription: any;
  sanPhams?: SanPham[];
  renderer: any;
  isFolded: any;
  el: any;
  constructor(private http: HttpClient, private sanPhamSevice: SanPhamService) {}
  
    pageSize: number = 6;
  currentPage: number = 1;
  pages: number[] = [];
  

  calculateTotalPages() {
    const totalPageCount = Math.ceil( this.pageSize);
    this.pages = Array.from({ length: totalPageCount }, (_, i) => i + 1);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.pages.length) {
      this.currentPage = page;
    }
  }
  toggleFold() {
    this.isFolded = !this.isFolded;
    if (this.isFolded) {
      this.renderer.addClass(this.el.nativeElement, 'thanhben--fold');
    } else {
      this.renderer.removeClass(this.el.nativeElement, 'thanhben--fold');
    }
  }

  ngOnInit(): void {
    this.sanPhamSevice.getSanPhams().subscribe(data => {
      this.sanPhams = data;
      console.log(this.sanPhams);
    });
  }
  navigateToForm() {
    this.router.navigate(['/trangchu']);

  }
}
