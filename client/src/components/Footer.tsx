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
              <a href="#" className="text-gray-800 hover:text-warm-brown transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 32 32">
    <path d="M16.001 3.2c-7.06 0-12.8 5.74-12.8 12.8 0 2.26.6 4.47 1.74 6.41L3.2 28.8l6.59-1.72c1.86 1.01 3.97 1.54 6.21 1.54h.01c7.06 0 12.8-5.74 12.8-12.8s-5.74-12.8-12.8-12.8zm0 23.04c-2.01 0-3.98-.54-5.68-1.56l-.41-.24-3.91 1.02 1.04-3.81-.27-.39c-1.09-1.6-1.67-3.47-1.67-5.41 0-5.44 4.43-9.87 9.87-9.87s9.87 4.43 9.87 9.87-4.43 9.87-9.87 9.87zm5.41-7.44c-.3-.15-1.77-.87-2.05-.97-.28-.1-.48-.15-.68.15-.2.3-.78.97-.96 1.17-.18.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.5-.9-.8-1.5-1.78-1.68-2.08-.18-.3-.02-.46.13-.61.13-.13.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.68-1.64-.93-2.25-.24-.58-.48-.5-.68-.51-.18-.01-.37-.01-.57-.01-.2 0-.52.07-.8.37-.28.3-1.05 1.02-1.05 2.48 0 1.46 1.07 2.87 1.22 3.07.15.2 2.1 3.21 5.09 4.38.71.31 1.26.5 1.69.64.71.23 1.36.2 1.87.12.57-.09 1.77-.72 2.02-1.41.25-.69.25-1.28.18-1.41-.07-.13-.27-.2-.57-.35z"/>
</svg>
              </a>
              <a href="#" className="text-gray-800 hover:text-warm-brown transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-800 hover:text-warm-brown transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-800 hover:text-warm-brown transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.5.75C6.146.75 1 5.896 1 12.25c0 5.089 3.292 9.387 7.863 10.956.575-.105.79-.251.79-.546 0-.273-.014-1.178-.014-2.142-2.889.532-3.636-.704-3.866-1.35-.13-.331-.69-1.352-1.18-1.625-.402-.216-.977-.748-.014-.762.906-.014 1.553.834 1.769 1.179 1.035 1.74 2.688 1.25 3.349.948.1-.747.402-1.25.733-1.538-2.559-.287-5.232-1.279-5.232-5.678 0-1.25.445-2.285 1.178-3.09-.115-.288-.517-1.467.115-3.048 0 0 .963-.302 3.163 1.179.92-.259 1.897-.388 2.875-.388.977 0 1.955.129 2.875.388 2.2-1.495 3.162-1.179 3.162-1.179.633 1.581.23 2.76.115 3.048.733.805 1.179 1.825 1.179 3.09 0 4.413-2.688 5.390-5.247 5.678.417.36.776 1.05.776 2.128 0 1.538-.014 2.774-.014 3.162 0 .302.216.662.79.547C20.709 21.637 24 17.324 24 12.25 24 5.896 18.854.75 12.5.75Z"/>
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
              <li><span className="hover:text-warm-brown transition-colors cursor-pointer">Art Consultation</span></li>
              <li><span className="hover:text-warm-brown transition-colors cursor-pointer">Gallery Services</span></li>
              <li><span className="hover:text-warm-brown transition-colors cursor-pointer">Private Viewings</span></li>
              <li><span className="hover:text-warm-brown transition-colors cursor-pointer">Art Advisory</span></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4 text-black">Support</h3>
            <ul className="space-y-2 text-gray-800">
              <li><span className="hover:text-warm-brown transition-colors cursor-pointer">Gallery Hours</span></li>
              <li><Link href="/contact"><span className="hover:text-warm-brown transition-colors cursor-pointer">Contact Us</span></Link></li>
              <li><span className="hover:text-warm-brown transition-colors cursor-pointer">Location</span></li>
              <li><span className="hover:text-warm-brown transition-colors cursor-pointer">Appointments</span></li>
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
