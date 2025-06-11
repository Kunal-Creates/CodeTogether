import Sidebar from './Sidebar';
import Header from './Header';

export default function Layout ({ children }) {
  return (
    <div className="flex h-screen bg-[#1e1e1e] text-gray-200">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
