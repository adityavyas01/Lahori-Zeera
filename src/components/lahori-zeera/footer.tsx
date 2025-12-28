
import { Mail, MapPin, Phone, Smartphone } from "lucide-react";
import SectionWrapper from "./section-wrapper";

const footerLinks = ["Home", "Shop", "About Us", "Contact", "Terms of Service", "Privacy Policy"];

export default function Footer() {
  return (
    <footer className="bg-secondary/20">
      <SectionWrapper id="contact" className="min-h-0 h-auto py-20 md:py-28 lg:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-1 space-y-4 text-center md:text-left">
            <h3 className="font-headline text-3xl font-bold text-foreground">Let's Connect.</h3>
            <p className="text-muted-foreground">Have a question or a trade inquiry? Get in touch!</p>
          </div>
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div>
              <h4 className="font-bold text-lg text-foreground mb-4">Contact Details</h4>
              <ul className="space-y-4 text-muted-foreground text-sm">
                <li className="flex items-start gap-3"><MapPin className="h-5 w-5 mt-1 flex-shrink-0 text-primary" /><span>Corporate Office: HF Number 126, Village Fatehgarh, Mohali, Punjab - 140103.</span></li>
                <li className="flex items-center gap-3"><Phone className="h-5 w-5 flex-shrink-0 text-primary" /><span>Toll-Free: 1800 123 2365</span></li>
                <li className="flex items-center gap-3"><Mail className="h-5 w-5 flex-shrink-0 text-primary" /><span>Email: info@lahorizeera.com</span></li>
                <li className="flex items-center gap-3"><Smartphone className="h-5 w-5 flex-shrink-0 text-primary" /><span>Trade Enquiries: +91 95696 66669</span></li>
              </ul>
            </div>
          </div>
        </div>
      </SectionWrapper>
      <div className="bg-background/50">
        <div className="container mx-auto px-4 py-6 flex flex-col sm:flex-row justify-between items-center text-sm text-muted-foreground text-center sm:text-left">
          <p>&copy; {new Date().getFullYear()} Lahori Zeera. All Rights Reserved.</p>
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mt-4 sm:mt-0">
            {footerLinks.map(link => (
              <a key={link} href="#" className="hover:text-primary transition-colors">{link}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
