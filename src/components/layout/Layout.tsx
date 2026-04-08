import { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';

interface LayoutProps {
  children: ReactNode;
}

// Pages that have their own full-screen hero and don't need top padding
const heroPages = ['/', '/inspiration'];

export const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const isHeroPage = heroPages.includes(location.pathname) || location.pathname.startsWith('/artwork/');

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className={`flex-1 ${isHeroPage ? '' : 'pt-20'}`}>
        {children}
      </main>
      <Footer />
    </div>
  );
};
