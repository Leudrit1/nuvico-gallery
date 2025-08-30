import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-black py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="text-2xl font-bold text-warm-brown mb-4">NUVICO</div>
            <p className="text-gray-800 mb-6 leading-relaxed">
              Connecting artists and collectors through exceptional art experiences.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://wa.me/41764519398" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-800 hover:text-warm-brown transition-colors"
                aria-label="Contact us on WhatsApp"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 32 32">
                  <path d="M16.001 3.2c-7.06 0-12.8 5.74-12.8 12.8 0 2.26.6 4.47 1.74 6.41L3.2 28.8l6.59-1.72c1.86 1.01 3.97 1.54 6.21 1.54h.01c7.06 0 12.8-5.74 12.8-12.8s-5.74-12.8-12.8-12.8zm0 23.04c-2.01 0-3.98-.54-5.68-1.56l-.41-.24-3.91 1.02 1.04-3.81-.27-.39c-1.09-1.6-1.67-3.47-1.67-5.41 0-5.44 4.43-9.87 9.87-9.87s9.87 4.43 9.87 9.87-4.43 9.87-9.87 9.87zm5.41-7.44c-.3-.15-1.77-.87-2.05-.97-.28-.1-.48-.15-.68.15-.2.3-.78.97-.96 1.17-.18.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.5-.9-.8-1.5-1.78-1.68-2.08-.18-.3-.02-.46.13-.61.13-.13.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.68-1.64-.93-2.25-.24-.58-.48-.5-.68-.51-.18-.01-.37-.01-.57-.01-.2 0-.52.07-.8.37-.28.3-1.05 1.02-1.05 2.48 0 1.46 1.07 2.87 1.22 3.07.15.2 2.1 3.21 5.09 4.38.71.31 1.26.5 1.69.64.71.23 1.36.2 1.87.12.57-.09 1.77-.72 2.02-1.41.25-.69.25-1.28.18-1.41-.07-.13-.27-.2-.57-.35z"/>
                </svg>
              </a>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-4 text-black">Explore</h3>
            <ul className="space-y-2 text-gray-800">
              <li><Link href="/gallery"><span className="hover:text-warm-brown transition-colors cursor-pointer">Gallery</span></Link></li>
              <li><Link href="/"><span className="hover:text-warm-brown transition-colors cursor-pointer">Collections</span></Link></li>
              <li><Link href="/about"><span className="hover:text-warm-brown transition-colors cursor-pointer">About Gallery</span></Link></li>
              <li><Link href="/contact"><span className="hover:text-warm-brown transition-colors cursor-pointer">Visit Us</span></Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4 text-black">Services</h3>
            <ul className="space-y-2 text-gray-800">
              <li><Link href="/contact"><span className="hover:text-warm-brown transition-colors cursor-pointer">Art Consultation</span></Link></li>
              <li><Link href="/contact"><span className="hover:text-warm-brown transition-colors cursor-pointer">Gallery Services</span></Link></li>
              <li><Link href="/contact"><span className="hover:text-warm-brown transition-colors cursor-pointer">Private Viewings</span></Link></li>
              <li><Link href="/contact"><span className="hover:text-warm-brown transition-colors cursor-pointer">Art Advisory</span></Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4 text-black">Support</h3>
            <ul className="space-y-2 text-gray-800">
              <li><Link href="/contact"><span className="hover:text-warm-brown transition-colors cursor-pointer">Gallery Hours</span></Link></li>
              <li><Link href="/contact"><span className="hover:text-warm-brown transition-colors cursor-pointer">Contact Us</span></Link></li>
              <li><Link href="/contact"><span className="hover:text-warm-brown transition-colors cursor-pointer">Location</span></Link></li>
              <li><Link href="/contact"><span className="hover:text-warm-brown transition-colors cursor-pointer">Appointments</span></Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-400 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-800 text-sm">© 2024 NUVICO. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <a href="#" className="text-gray-800 hover:text-warm-brown text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-800 hover:text-warm-brown text-sm transition-colors">Terms of Service</a>
            <a href="#" className="text-gray-800 hover:text-warm-brown text-sm transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
