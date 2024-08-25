export default function Footer() {
  return (
    <footer className="bg-white text-gray-800 p-4">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <a href="/login" className="hover:text-gray-600">ログイン</a>
        </div>
        <nav>
          <ul className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
            <li><a href="/terms" className="hover:text-gray-600">利用規約</a></li>
            <li><a href="/privacy" className="hover:text-gray-600">プライバシーポリシー</a></li>
            <li><a href="/contact" className="hover:text-gray-600">お問い合わせ</a></li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
