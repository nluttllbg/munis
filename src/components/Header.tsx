import React, { useState, useEffect } from 'react';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { BrandLogo } from './BrandLogo';
import { MOTION_DURATION, MOTION_EASING } from '../motion/tokens';

interface HeaderProps {
  cartCount: number;
  cartTotal: number;
  onOpenCart: () => void;
  activeSection: string;
}

const NAV_LINKS = [
  { href: '#cardapio', id: 'cardapio', label: 'Cardápio' },
  { href: '#na-brasa', id: 'na-brasa', label: 'Na Brasa' },
  { href: '#avaliacoes', id: 'avaliacoes', label: 'Avaliações' },
  { href: '#localizacao', id: 'localizacao', label: 'Localização' },
];

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  onOpenCart,
  activeSection,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0E0E10]/90 backdrop-blur-md border-b border-[#2E2E34]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 h-16 md:h-[72px] flex items-center justify-between gap-8">
        {/* Zone 1: Single-line Brand Wordmark */}
        <a
          href="#topo"
          className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F4A261] rounded-[8px]"
          aria-label="Moniz Burger Artesanal - Voltar ao início"
        >
          <BrandLogo />
        </a>

        {/* Zone 2: 4 single-line Navigation Links */}
        <nav
          aria-label="Navegação principal"
          className="hidden md:flex items-center gap-7 text-[14px] font-semibold tracking-[0.02em]"
        >
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                className={`relative py-2 whitespace-nowrap shrink-0 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F4A261] rounded-[4px] ${
                  isActive
                    ? 'text-[#FAF7F2]'
                    : 'text-[#C4C0B8] hover:text-[#FAF7F2]'
                }`}
              >
                {link.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-active-underline"
                    transition={{
                      duration: MOTION_DURATION.normal,
                      ease: MOTION_EASING.settle,
                    }}
                    className="absolute inset-x-0 -bottom-0.5 h-[2px] bg-[#E63926] rounded-full"
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Primary Action + Mobile Menu Trigger */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={onOpenCart}
            className="inline-flex items-center justify-center gap-2 min-h-[44px] px-4 py-2.5 rounded-[8px] bg-[#E63926] hover:bg-[#CC2E1C] active:bg-[#B02415] text-[#FAF7F2] text-[14px] font-semibold tracking-[0.02em] whitespace-nowrap shrink-0 transition-all duration-150 hover:shadow-[0_4px_20px_rgba(230,57,38,0.25)] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F4A261]"
          >
            <ShoppingBag className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>{cartCount > 0 ? 'Sacola' : 'Fazer Pedido'}</span>
            {cartCount > 0 && (
              <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-[6px] bg-[#0E0E10]/30 text-[#FAF7F2] text-[12px] font-bold tabular-nums">
                {cartCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-[8px] bg-[#222226] border border-[#2E2E34] text-[#FAF7F2] hover:border-[#F4A261] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F4A261]"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: MOTION_DURATION.fast, ease: MOTION_EASING.settle }}
            className="md:hidden border-t border-[#2E2E34] bg-[#18181B]"
          >
            <nav
              aria-label="Menu mobile"
              className="px-4 py-4 flex flex-col gap-1"
            >
              {NAV_LINKS.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`min-h-[44px] px-3 flex items-center justify-between rounded-[8px] text-[15px] font-semibold transition-colors ${
                    activeSection === link.id
                      ? 'bg-[#222226] text-[#FAF7F2]'
                      : 'text-[#C4C0B8] hover:bg-[#222226] hover:text-[#FAF7F2]'
                  }`}
                >
                  <span>{link.label}</span>
                  {activeSection === link.id && (
                    <span className="text-[12px] text-[#F4A261]">Ativo</span>
                  )}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
