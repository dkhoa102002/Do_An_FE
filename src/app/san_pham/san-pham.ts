import { LoaiSanPham } from "../loai_san_pham/loai-san-pham";

export class SanPham {
    loaiSanPham?: LoaiSanPham;
    size?: string;
    mau?: string;
    moTa?: string;
    gia?: number;
    id_SanPham?: number;
    tenSanPham?: string;
    duongDanAnh?: string;
    soLuongTonKho?: number;
}
