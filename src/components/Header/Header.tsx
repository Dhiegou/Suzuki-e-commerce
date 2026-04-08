import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingCart, Phone, Bike } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SuzukiLogo } from '../SuzukiLogo';
import { buildNavItems } from '../../data/navigation';
import { useGarage } from '../../contexts/GarageContext';
import { DesktopNavItem } from './DesktopNavItem';
import { MobileNavItem } from './MobileNavItem';

interface HeaderProps {
  scrollToProducts: () => void;
}

export default function Header({ scrollToProducts }: HeaderProps) {
  const { totalMotos, openGarage } = useGarage();
  const [navScrolled, setNavScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = buildNavItems(scrollToProducts);

  useEffect(() => {
    const handleScroll = () => setNavScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        navScrolled
          ? 'bg-white shadow-lg shadow-suzuki-blue/5 border-b border-suzuki-blue/5'
          : 'bg-white/95 backdrop-blur-md'
      }`}
    >
      {/* Top bar */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-6">
        <div className="h-[72px] flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex-shrink-0">
            <SuzukiLogo className="h-8 md:h-9 w-auto" />
          </Link>

          {/* Center Nav Links — Desktop */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map(item => (
              <DesktopNavItem key={item.label} item={item} scrollToProducts={scrollToProducts} />
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* CTA Buttons - Desktop */}
            <div className="hidden md:flex items-center gap-2">
              <Link
                to="/interesse"
                className="bg-suzuki-blue text-white px-5 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-wider hover:bg-suzuki-blue/90 transition-colors shadow-md flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5" />
                Fale com o Vendedor
              </Link>
              <a
                href="https://suzukimotos.com.br/consorcio"
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-suzuki-blue text-suzuki-blue px-5 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-wider hover:bg-suzuki-blue hover:text-white transition-colors flex items-center"
              >
                Financiamento
              </a>
            </div>

            {/* Garage */}
            <button
              id="garage-toggle"
              onClick={openGarage}
              className="relative p-2 rounded-full transition-colors group hover:bg-suzuki-blue/5"
              aria-label="Abrir garagem"
            >
              <Bike className="w-5 h-5 text-suzuki-blue group-hover:text-suzuki-red transition-colors" />
              {totalMotos > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-suzuki-red text-white text-[9px] font-bold w-[18px] h-[18px] flex items-center justify-center rounded-full shadow-md">
                  {totalMotos}
                </span>
              )}
            </button>

            {/* Mobile menu toggle */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden w-10 h-10 relative focus:outline-none flex items-center justify-center rounded-full hover:bg-suzuki-blue/5 transition-colors text-suzuki-blue ml-1"
              aria-label="Menu"
              aria-expanded={isMobileMenuOpen}
            >
              <div className="block w-5 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <span aria-hidden="true" className={`block absolute h-[2px] w-5 bg-current transform transition duration-300 ease-in-out rounded-full ${isMobileMenuOpen ? 'rotate-45' : '-translate-y-1.5'}`} />
                <span aria-hidden="true" className={`block absolute h-[2px] w-5 bg-current transform transition duration-300 ease-in-out rounded-full ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
                <span aria-hidden="true" className={`block absolute h-[2px] w-5 bg-current transform transition duration-300 ease-in-out rounded-full ${isMobileMenuOpen ? '-rotate-45' : 'translate-y-1.5'}`} />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden bg-white border-t border-suzuki-blue/5 max-h-[calc(100svh-72px)] overflow-y-auto"
          >
            <div className="px-6 py-3 space-y-0">
              {navItems.map(item => (
                <MobileNavItem key={item.label} item={item} onClose={closeMobileMenu} />
              ))}
              <div className="flex flex-col gap-2 pt-4 pb-2">
                <Link
                  to="/interesse"
                  onClick={closeMobileMenu}
                  className="bg-suzuki-blue text-white px-5 py-3 rounded-full text-[11px] font-bold uppercase tracking-wider text-center flex items-center justify-center"
                >
                  Fale com o Vendedor
                </Link>
                <a
                  href="https://suzukimotos.com.br/consorcio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-2 border-suzuki-blue text-suzuki-blue px-5 py-3 rounded-full text-[11px] font-bold uppercase tracking-wider text-center flex items-center justify-center"
                >
                  Financiamento
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
