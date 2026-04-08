import { ChevronDown } from 'lucide-react';
import type { NavItem } from '../../data/navigation';
import { MotosMegaMenu } from './MotosMegaMenu';

interface DesktopNavItemProps {
  item: NavItem;
  scrollToProducts: () => void;
}

export function DesktopNavItem({ item, scrollToProducts }: DesktopNavItemProps) {
  return (
    <div className="relative group/nav">
      {item.link ? (
        <a
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-suzuki-blue/70 hover:text-suzuki-red text-[13px] font-semibold uppercase tracking-wider transition-colors px-3 py-6 rounded-none inline-flex items-center"
        >
          {item.label}
          <span className="sr-only"> (Abre em nova aba)</span>
        </a>
      ) : (
        <button
          onClick={item.action}
          className="text-suzuki-blue/70 hover:text-suzuki-red text-[13px] font-semibold uppercase tracking-wider transition-colors px-3 py-6 rounded-none inline-flex items-center"
        >
          {item.label} {(item.hasMegaMenu || item.subLinks) && <ChevronDown className="w-3 h-3 ml-1 opacity-50 group-hover/nav:rotate-180 transition-transform" />}
        </button>
      )}

      {/* Regular Sub-Links Dropdown */}
      {item.subLinks && !item.isMarcasMenu && (
        <div className="fixed top-[72px] left-0 w-full pt-0 opacity-0 pointer-events-none group-hover/nav:opacity-100 group-hover/nav:pointer-events-auto group-focus-within/nav:opacity-100 group-focus-within/nav:pointer-events-auto transition-all duration-300 z-50">
          <div className="bg-white shadow-xl border-t-[3px] border-[#003d7c]/10 flex py-4 px-8 items-center justify-center gap-10 sm:gap-16">
            {item.subLinks.map(sub => (
              <a key={sub.label} href={sub.link} target="_blank" rel="noopener noreferrer" className="text-[13px] font-semibold uppercase text-suzuki-blue/80 hover:text-suzuki-red transition-colors flex items-center justify-center group">
                {sub.logo && <img src={sub.logo} alt={sub.label} className="h-5 sm:h-6 md:h-7 w-auto object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300 mr-3" />}
                {sub.label}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Marcas Menu */}
      {item.isMarcasMenu && item.subLinks && (
        <div className="fixed top-[72px] left-0 w-full pt-0 opacity-0 pointer-events-none group-hover/nav:opacity-100 group-hover/nav:pointer-events-auto group-focus-within/nav:opacity-100 group-focus-within/nav:pointer-events-auto transition-all duration-300 z-50">
          <div className="bg-white shadow-xl border-t-[3px] border-[#003d7c]/10 flex py-4 px-8 items-center justify-center gap-10 sm:gap-16">
            {item.subLinks.map(sub => (
              <a key={sub.label} href={sub.link} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center group transition-all">
                <img src={sub.logo} alt={sub.label} className="h-5 sm:h-6 md:h-7 w-auto object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300" />
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Mega Menu (Motos) — Full Catalog */}
      {item.hasMegaMenu && (
        <MotosMegaMenu />
      )}
    </div>
  );
}
