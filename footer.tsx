import { Facebook, Youtube, Instagram, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-background text-primary rounded-lg flex items-center justify-center">
                <span className="font-bold text-xl">E</span>
              </div>
              <span className="font-bold text-xl">EduConnect</span>
            </div>
            <p className="text-primary-foreground/80 mb-4">
              Nền tảng giáo dục chất lượng cao dành cho người Việt
            </p>
            <div className="flex gap-3">
              <Button size="icon" variant="secondary" className="rounded-full">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button size="icon" variant="secondary" className="rounded-full">
                <Youtube className="h-5 w-5" />
              </Button>
              <Button size="icon" variant="secondary" className="rounded-full">
                <Instagram className="h-5 w-5" />
              </Button>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Về chúng tôi</h3>
            <ul className="space-y-2 text-primary-foreground/80">
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Giới thiệu</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Đội ngũ</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Tuyển dụng</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Tin tức</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Khóa học</h3>
            <ul className="space-y-2 text-primary-foreground/80">
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Lập trình</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Marketing</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Thiết kế</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Kinh doanh</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Liên hệ</h3>
            <ul className="space-y-3 text-primary-foreground/80">
              <li className="flex items-center gap-2">
                <MapPin className="h-5 w-5 flex-shrink-0" />
                <span>Hà Nội, Việt Nam</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-5 w-5 flex-shrink-0" />
                <span>1900 xxxx</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-5 w-5 flex-shrink-0" />
                <span>info@educonnect.vn</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-primary-foreground/20 pt-8 text-center text-primary-foreground/60">
          <p>&copy; 2024 EduConnect. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
