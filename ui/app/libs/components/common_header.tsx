import { useState } from 'react';
import "../../tailwind.css";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white text-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <button
            className="mr-4 md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <nav className={`${isMenuOpen ? 'block' : 'hidden'} md:block absolute md:relative top-full left-0 w-full md:w-auto bg-white md:bg-transparent shadow-md md:shadow-none`}>
            <ul className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 p-4 md:p-0">
              <li><a href="/" className="hover:text-gray-600">ホーム</a></li>
              <li><a href="/about" className="hover:text-gray-600">about</a></li>
              <li><a href="/contact" className="hover:text-gray-600">お問い合わせ</a></li>
            </ul>
          </nav>
        </div>
        <div className="relative">
          <button className="flex items-center focus:outline-none">
            <svg className="w-8 h-8 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
          </button>
          {/* ユーザーメニューのドロップダウンをここに追加 */}
        </div>
      </div>
    </header>
  );
}
