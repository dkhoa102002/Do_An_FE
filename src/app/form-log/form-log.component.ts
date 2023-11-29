import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { KhachHang } from '../khach_hang/khach-hang';
import { KhacHangService } from '../khach_hang/khac-hang.service';

@Component({
  selector: 'app-form-log',
  templateUrl: './form-log.component.html',
  styleUrls: ['./form-log.component.css']
})
export class FormLogComponent {
  khachHang: KhachHang = new KhachHang();
  mess?: any;
  constructor(private router: Router, private khacHangService: KhacHangService) {}

  navigateToForm() {
    this.router.navigate(['/']);
    this.router.navigate(['/form']);
  }
  onSubmit() {
    console.log(this.khachHang)
    this.khacHangService.loginKhachHang(this.khachHang).subscribe(data => {
      if(data == "success"){
        alert("Đăng Nhập thành công");
        this.router.navigate(['/']);
        
      }else{
        alert("Đăng nhập thất bại")
      }
    },
    error => console.log(error));
  }
}
