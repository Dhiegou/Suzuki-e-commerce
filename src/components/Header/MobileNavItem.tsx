import { ChevronRight } from 'lucide-react';
import type { NavItem } from '../../data/navigation';

interface MobileNavItemProps {
  item: NavItem;
  onClose: () => void;
}

export function MobileNavItem({ item, onClose }: MobileNavItemProps) {
  if (item.link) {
    return (
      <a
        key={item.label}
        href={item.link}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full text-left text-[13px] font-semibold uppercase tracking-wider text-suzuki-blue/70 hover:text-suzuki-red transition-colors py-3 border-b border-suzuki-blue/5 last:border-b-0"
      >
        {item.label}
        <span className="sr-only"> (Abre em nova aba)</span>
      </a>
    );
  }

  if (item.subLinks) {
    return (
      <div key={item.label} className="py-3 border-b border-suzuki-blue/5 last:border-b-0 flex flex-col">
        <span className="block w-full text-left text-[13px] font-semibold uppercase tracking-wider text-suzuki-blue/70 mb-2">
          {item.label}
        </span>
        {item.isMarcasMenu ? (
          <div className="flex flex-wrap items-center justify-start gap-5 pt-3 pb-2 pl-4 border-l-2 border-suzuki-red/30">
            {item.subLinks.map(sub => (
              <a key={sub.label} href={sub.link} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center transition-all">
                <img src={sub.logo} alt={sub.label} className="h-5 w-auto object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all" />
              </a>
            ))}
          </div>
        ) : (
          <div className="flex flex-col pl-4 gap-2 border-l-2 border-suzuki-red/30">
            {item.subLinks.map(sub => (
              <a key={sub.label} href={sub.link} target="_blank" rel="noopener noreferrer" className="group text-[12px] font-semibold uppercase tracking-wider text-suzuki-blue/60 hover:text-suzuki-red transition-colors py-1 flex items-center">
                {sub.logo && <img src={sub.logo} alt={sub.label} className="h-4 w-auto object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all mr-2" />}
                {sub.label}
              </a>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <button
      key={item.label}
      onClick={() => { onClose(); item.action && item.action(); }}
      className="block w-full text-left text-[13px] font-semibold uppercase tracking-wider text-suzuki-blue/70 hover:text-suzuki-red transition-colors py-3 border-b border-suzuki-blue/5 last:border-b-0 flex items-center justify-between"
    >
      {item.label} <ChevronRight className="w-3 h-3 opacity-50" />
    </button>
  );
}
