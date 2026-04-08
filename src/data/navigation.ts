/**
 * Navigation links data — centralized for Desktop & Mobile menus.
 */

export interface SubLink {
  label: string;
  link: string;
  logo?: string;
}

export interface NavItem {
  label: string;
  link?: string;
  action?: () => void;
  hasMegaMenu?: boolean;
  isMarcasMenu?: boolean;
  subLinks?: SubLink[];
}

export const BRAND_LINKS: SubLink[] = [
  { label: 'Suzuki', link: 'https://suzukimotos.com.br/', logo: 'https://suzukimotos.com.br/images/header/suzuki_logo-v2.svg' },
  { label: 'Haojue', link: 'https://haojuemotos.com.br/?_gl=1*1oby7z9*_gcl_aw*R0NMLjE3NzQwMDA2NzkuQ2owS0NRanc0UFBOQmhEOEFSSXNBTW8taWN5T2Zicm95TnFlemVSYVp0RTNIVHpXOEw4RWxncTBRNUhFNTMwQjc2TGxHb3RucFdBeWdIUWFBaTlrRUFMd193Y0I.*_gcl_au*MTA2NzQ3OTM4Ni4xNzcyNTU5MTY3', logo: 'https://suzukimotos.com.br/images/brands/logo_haojue.png' },
  { label: 'Zontes', link: 'https://zontesmotos.com.br/', logo: 'https://suzukimotos.com.br/images/brands/logo_zontes.png' },
  { label: 'Hisun', link: 'https://hisunmotors.com.br/', logo: 'https://suzukimotos.com.br/images/brands/logo_hisun.png' },
  { label: 'Kymco', link: 'https://kymcomotos.com.br/', logo: 'https://suzukimotos.com.br/images/brands/logo_kymco.png' },
];

export function buildNavItems(scrollToProducts: () => void): NavItem[] {
  return [
    { label: 'Motos', action: scrollToProducts, hasMegaMenu: true },
    {
      label: 'Marcas',
      isMarcasMenu: true,
      subLinks: BRAND_LINKS,
    },
    { label: 'Ofertas', link: 'https://suzukimotos.com.br/ofertas?utm_source=Google&utm_medium=cpc&utm_campaign=21515698302' },
    {
      label: 'Comprar',
      subLinks: [
        { label: 'Financiamentos', link: 'https://suzukimotos.com.br/financiamento?utm_source=Google&utm_medium=cpc&utm_campaign=21515698302' },
        { label: 'Consórcio', link: 'https://suzukimotos.com.br/consorcio?utm_source=Google&utm_medium=cpc&utm_campaign=21515698302' },
      ],
    },
    {
      label: 'Proprietários',
      subLinks: [
        { label: 'Manual do proprietário', link: 'https://suzukimotos.com.br/manual-do-proprietario?utm_source=Google&utm_medium=cpc&utm_campaign=21515698302' },
        { label: 'Garantia', link: 'https://suzukimotos.com.br/garantia?utm_source=Google&utm_medium=cpc&utm_campaign=21515698302' },
        { label: 'Serviços', link: 'https://suzukimotos.com.br/servicos?utm_source=Google&utm_medium=cpc&utm_campaign=21515698302' },
        { label: 'Recall', link: 'https://suzukimotos.com.br/recall?utm_source=Google&utm_medium=cpc&utm_campaign=21515698302' },
      ],
    },
    {
      label: 'A Suzuki',
      subLinks: [
        { label: 'Suzuki no Brasil', link: 'https://suzukimotos.com.br/suzuki-no-brasil?utm_source=Google&utm_medium=cpc&utm_campaign=21515698302' },
        { label: 'Suzuki Adventures', link: 'https://suzukimotos.com.br/suzuki-adventures?utm_source=Google&utm_medium=cpc&utm_campaign=21515698302' },
        { label: 'Assessoria de Imprensa', link: 'https://suzukimotos.com.br/assessoria-de-imprensa?utm_source=Google&utm_medium=cpc&utm_campaign=21515698302' },
      ],
    },
  ];
}
