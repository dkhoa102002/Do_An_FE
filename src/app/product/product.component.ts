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
 
  @Input() selectedCategory: string = 'All';
  @Input() selectedCate: string = 'All';
  @Output() categorySelected = new EventEmitter<string>();
  @Output() cateSelected = new EventEmitter<string>();
  @Output() categoryAndCateSelected = new EventEmitter<{ category: string, cate: string }>();

  categories: string[] = ['All', 'T-Shirt', 'Jacket', 'Hoodie','Shorts','Trousers'];
  router: any;
  routerSubscription: any;
  sanPhams?: SanPham[];
  constructor(private http: HttpClient, private sanPhamSevice: SanPhamService) {}
  selectCategory(category: string) {
    this.selectedCategory = category;
    this.categorySelected.emit(category);
    this.categoryAndCateSelected.emit({ category: this.selectedCategory, cate: this.selectedCate });
    console.log(this.selectedCategory);
    
    this.sanPhamSevice.getSanPhamsByLoaiSanPhamId(this.selectedCategory).subscribe(data => {
      this.sanPhams = data;
      console.log(this.sanPhams);
    });

}
selectCategory2(category: string) {
  this.selectedCategory = category;
  this.categorySelected.emit(category);}

  cates: string[] = [ 'All','Nam', 'Nữ'];
  selectCate(cate: string) {
    this.selectedCate = cate;
    this.cateSelected.emit(cate);
    this.categoryAndCateSelected.emit({ category: this.selectedCategory, cate: this.selectedCate });
    
    
    
  } 

    pageSize: number = 6;
  currentPage: number = 1;
  pages: number[] = [];
  prevSelectedCategory: string | undefined;
  prevSelectedCate: string | undefined;
  prevSelectedCategoryandcate: string | undefined;

  ngOnChanges() {
    if (this.selectedCategory !== this.prevSelectedCategory) {
      this.currentPage = 1;
      this.prevSelectedCategory = this.selectedCategory;
      this.prevSelectedCategoryandcate = this.selectedCategory;
    }
    if (this.selectedCate !== this.prevSelectedCate) {
      this.currentPage = 1;
      this.prevSelectedCate = this.selectedCate;
      this.prevSelectedCategoryandcate = this.selectedCategory;

    }
    this.calculateTotalPages();
  }

  calculateTotalPages() {
    const totalPageCount = Math.ceil( this.pageSize);
    this.pages = Array.from({ length: totalPageCount }, (_, i) => i + 1);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.pages.length) {
      this.currentPage = page;
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
