import {  Component, EventEmitter, Input, Output } from '@angular/core';
import {  ActivatedRoute, Router } from '@angular/router';

'@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  @Input() selectedCategory: string = 'All';
  @Input() selectedCate: string = 'All';
  @Output() categorySelected = new EventEmitter<string>();
  @Output() cateSelected = new EventEmitter<string>();
  @Output() categoryAndCateSelected = new EventEmitter<{ category: string, cate: string }>();

  categories: string[] = ['All', 'T-Shirt', 'Jacket', 'Hoodie','Shorts','Trousers'];
  selectCategory(category: string) {
    this.selectedCategory = category;
    this.categorySelected.emit(category);
    this.categoryAndCateSelected.emit({ category: this.selectedCategory, cate: this.selectedCate });

}
  cates: string[] = [ 'All','Nam', 'Nữ'];
  selectCate(cate: string) {
    this.selectedCate = cate;
    this.cateSelected.emit(cate);
    this.categoryAndCateSelected.emit({ category: this.selectedCategory, cate: this.selectedCate });

  } 

    products: any[] = [
      { name: 'T-Shirt', category: 'T-Shirt', cate: 'Nam', price: 100, discountPercent: 20, imageUrl: 'path/to/image1.jpg' },
      { name: 'Product A', category: 'T-Shirt', cate: 'Nữ', price: 100, discountPercent: 0 , imageUrl: 'path/to/image1.jpg' },
      { name: 'Product A', category: 'T-Shirt', cate: 'Nam', price: 100, discountPercent: 30, imageUrl: 'path/to/image1.jpg' },
      { name: 'Product A', category: 'T-Shirt', cate: 'Nữ', price: 100, discountPercent: 0, imageUrl: 'path/to/image1.jpg' },
      { name: 'Product B', category: 'Jacket', cate: 'Nam', price: 50, discountPercent: 0, imageUrl: 'path/to/image2.jpg' },
      { name: 'Product B', category: 'Jacket', cate: 'Nữ', price: 50, discountPercent: 10, imageUrl: 'path/to/image2.jpg' },
      { name: 'Product B', category: 'Jacket', cate: 'Nữ', price: 50, discountPercent: 0, imageUrl: 'path/to/image2.jpg' },
      { name: 'Product B', category: 'Jacket', cate: 'Nam', price: 50, discountPercent: 0, imageUrl: 'path/to/image2.jpg' },
      { name: 'Product C', category: 'Hoodie', cate: 'Nam', price: 30, discountPercent: 0, imageUrl: 'path/to/image3.jpg' },
      { name: 'Product C', category: 'Hoodie', cate: 'Nữ', price: 30, discountPercent: 20, imageUrl: 'path/to/image3.jpg' },
      { name: 'Product C', category: 'Hoodie', cate: 'Nam', price: 30, discountPercent: 0, imageUrl: 'path/to/image3.jpg' },
      { name: 'Product C', category: 'Hoodie', cate: 'Nam', price: 30, discountPercent: 0, imageUrl: 'path/to/image3.jpg' },
      { name: 'Product D', category: 'Shorts', cate: 'Nữ', price: 30, discountPercent: 0, imageUrl: 'path/to/image4.jpg' },
      { name: 'Product D', category: 'Shorts', cate: 'Nam', price: 30, discountPercent: 0, imageUrl: 'path/to/image4.jpg' },
      { name: 'Product D', category: 'Shorts', cate: 'Nữ', price: 30, discountPercent: 10, imageUrl: 'path/to/image4.jpg' },
      { name: 'Product D', category: 'Shorts', cate: 'Nam', price: 30, discountPercent: 0, imageUrl: 'path/to/image4.jpg' },
      { name: 'Product E', category: 'Trousers', cate: 'Nam', price: 30, discountPercent: 10, imageUrl: 'path/to/image4.jpg' },
      { name: 'Product E', category: 'Trousers', cate: 'Nữ', price: 30, discountPercent: 0, imageUrl: 'path/to/image4.jpg' },
      { name: 'Product E', category: 'Trousers', cate: 'Nam', price: 30, discountPercent: 15, imageUrl: 'path/to/image4.jpg' },
      { name: 'Product E', category: 'Trousers', cate: 'Nữ', price: 30, discountPercent: 10, imageUrl: 'path/to/image4.jpg' },

    ];

    pageSize: number = 6;
  currentPage: number = 1;
  totalProducts: number = this.products.length;
  pages: number[] = [];
  visibleAndFilteredProducts: any[] = [];
  visibleProducts: any[] = [];
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
    this.loadVisibleProducts();
  }

  calculateTotalPages() {
    const totalPageCount = Math.ceil(this.filteredProducts.length / this.pageSize);
    this.pages = Array.from({ length: totalPageCount }, (_, i) => i + 1);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.pages.length) {
      this.currentPage = page;
      this.loadVisibleProducts();
    }
  }

  loadVisibleProducts() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.visibleAndFilteredProducts = this.filteredProducts.slice(startIndex, endIndex)
     .filter(product => (this.selectedCategory === 'All' || product.category === this.selectedCategory) &&
                         (this.selectedCate === 'All' || product.cate === this.selectedCate));              
  }

  get filteredProducts() {
    let result = this.products;

    if (this.selectedCategory && this.selectedCategory !== 'All') {
      result = result.filter(product => product.category === this.selectedCategory);
    }

    if (this.selectedCate && this.selectedCate !== 'All') {
      result = result.filter(product => product.cate === this.selectedCate);
    }

    return result;
  
  }
  
  ngOnInit() {
  }
  calculateDiscountedPrice(product: any): number {
    return product.price - (product.price * (product.discountPercent / 100));
  }
  constructor(private router: Router, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      console.log(params); // Kiểm tra xem params có giá trị không
      const selectedCategory = params['category'];
      const selectedCate = params['cate'];
      console.log(selectedCategory, selectedCate); // Kiểm tra giá trị của tham số
    });
  }
 
  navigateToFormLog() {
    this.router.navigate(['/chitietsp']);
  }
  
}