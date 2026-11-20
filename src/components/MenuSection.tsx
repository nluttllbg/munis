import React, { useMemo, useState } from 'react';
import { Plus, Search, SlidersHorizontal, X } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import {
  MENU_CATEGORIES,
  MENU_ITEMS,
  MenuCategory,
  MenuItem,
} from '../data/menuData';
import { formatBRL } from '../utils/format';
import { ResilientImage } from './ResilientImage';
import {
  MOTION_DURATION,
  MOTION_EASING,
  MOTION_STAGGER,
  VIEWPORT_CONFIG,
} from '../motion/tokens';

interface MenuSectionProps {
  onSelectBurger: (item: MenuItem) => void;
  onQuickAdd: (item: MenuItem) => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  onSelectBurger,
  onQuickAdd,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<MenuCategory>('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [justAddedId, setJustAddedId] = useState<string | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const filteredItems = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();
    return MENU_ITEMS.filter((item) => {
      const matchesCategory =
        selectedCategory === 'Todos' || item.category === selectedCategory;
      const matchesQuery =
        !normalizedQuery ||
        item.name.toLowerCase().includes(normalizedQuery) ||
        item.description.toLowerCase().includes(normalizedQuery);
      return matchesCategory && matchesQuery;
    });
  }, [selectedCategory, searchQuery]);

  const handleQuickAdd = (e: React.MouseEvent, item: MenuItem) => {
    e.stopPropagation();
    onQuickAdd(item);
    setJustAddedId(item.id);
    window.setTimeout(() => {
      setJustAddedId((prev) => (prev === item.id ? null : prev));
    }, 1100);
  };

  return (
    <section
      id="cardapio"
      className="py-16 lg:py-24 bg-[#0E0E10] border-b border-[#2E2E34]"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-[12px] font-semibold tracking-[0.03em] text-[#F4A261]">
              Cardápio Noturno · Direto da Grelha
            </p>
            <h2 className="mt-2 font-display text-[28px] leading-[34px] md:text-[36px] md:leading-[42px] font-bold tracking-[-0.015em] text-[#FAF7F2] text-balance">
              Escolha seu burger artesanal na brasa
            </h2>
            <p className="mt-3 text-[16px] leading-[24px] text-[#C4C0B8]">
              Clique em qualquer item para escolher o ponto da carne e adicionais, ou adicione direto à sacola.
            </p>
          </div>

          {/* Search Input */}
          <div className="relative w-full lg:w-[320px] shrink-0">
            <Search
              className="w-4 h-4 text-[#8A867E] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
              aria-hidden="true"
            />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar burger, bacon, batata..."
              aria-label="Buscar no cardápio"
              className="w-full min-h-[44px] pl-10 pr-10 py-2.5 rounded-[8px] bg-[#18181B] border border-[#2E2E34] text-[14px] text-[#FAF7F2] placeholder:text-[#8A867E] focus:outline-none focus:border-[#F4A261] focus:ring-1 focus:ring-[#F4A261] transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                aria-label="Limpar busca"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center rounded-[6px] text-[#8A867E] hover:text-[#FAF7F2] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div
          role="tablist"
          aria-label="Categorias do cardápio"
          className="mt-8 flex items-center gap-2.5 overflow-x-auto pb-2"
        >
          {MENU_CATEGORIES.map((category) => {
            const isActive = selectedCategory === category;
            return (
              <button
                key={category}
                role="tab"
                aria-selected={isActive}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`min-h-[44px] px-4 py-2 rounded-[8px] text-[14px] font-semibold tracking-[0.02em] whitespace-nowrap shrink-0 transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F4A261] ${
                  isActive
                    ? 'bg-[#E63926] text-[#FAF7F2]'
                    : 'bg-[#222226] text-[#C4C0B8] border border-[#2E2E34] hover:text-[#FAF7F2] hover:border-[#5C403B]'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Menu Grid */}
        {filteredItems.length === 0 ? (
          <div className="mt-10 p-10 rounded-[16px] bg-[#18181B] border border-[#2E2E34] text-center">
            <p className="font-display text-[20px] font-semibold text-[#FAF7F2]">
              Nenhum item encontrado para "{searchQuery}"
            </p>
            <p className="mt-2 text-[14px] text-[#C4C0B8]">
              Tente limpar a busca ou explorar outra categoria do nosso cardápio.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('Todos');
              }}
              className="mt-5 inline-flex items-center justify-center min-h-[44px] px-5 py-2.5 rounded-[8px] bg-[#222226] border border-[#2E2E34] text-[14px] font-semibold text-[#FAF7F2] hover:border-[#F4A261] transition-colors cursor-pointer"
            >
              Mostrar todo o cardápio
            </button>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item, idx) => {
              const isAdded = justAddedId === item.id;
              return (
                <motion.article
                  key={item.id}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={VIEWPORT_CONFIG}
                  transition={{
                    duration: MOTION_DURATION.normal,
                    delay: shouldReduceMotion ? 0 : Math.min(idx * MOTION_STAGGER.cards, 0.24),
                    ease: MOTION_EASING.settle,
                  }}
                  onClick={() => onSelectBurger(item)}
                  className="group flex flex-col rounded-[16px] bg-[#18181B] border border-[#2E2E34] hover:border-[#5C403B] overflow-hidden transition-transform duration-200 hover:-translate-y-0.5 cursor-pointer"
                >
                  {/* 16:10 Image Container */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#131315]">
                    <ResilientImage
                      src={item.image}
                      alt={item.name}
                      fallbackTitle={item.name}
                      className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-[#18181B]/60 via-transparent to-transparent"
                    />
                    {item.badge && (
                      <span
                        className={`absolute top-3 left-3 px-2.5 py-1 rounded-[8px] text-[11px] font-bold tracking-[0.04em] text-[#FAF7F2] ${
                          item.badge === 'Na Brasa'
                            ? 'bg-[#FF6B35]'
                            : item.badge === 'Mais Pedido'
                            ? 'bg-[#E63926]'
                            : 'bg-[#222226]/95 border border-[#F4A261]/50 text-[#F4A261]'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </div>

                  {/* Card Body */}
                  <div className="flex flex-col flex-1 p-5">
                    <p className="text-[12px] font-medium text-[#8A867E]">
                      {item.specs}
                    </p>

                    <h3 className="mt-1.5 font-display text-[20px] leading-[26px] font-bold tracking-[-0.01em] text-[#FAF7F2] group-hover:text-[#F4A261] transition-colors">
                      {item.name}
                    </h3>

                    <p className="mt-2 text-[14px] leading-[20px] text-[#C4C0B8] line-clamp-3 flex-1">
                      {item.description}
                    </p>

                    <div className="mt-5 pt-4 border-t border-[#2E2E34] flex items-center justify-between gap-3">
                      <div>
                        <span className="block text-[11px] font-semibold tracking-[0.03em] text-[#8A867E]">
                          Valor unitário
                        </span>
                        <span className="font-display text-[20px] font-bold tabular-nums text-[#F4A261]">
                          {formatBRL(item.price)}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {(item.allowMeatPoint || (item.availableExtras && item.availableExtras.length > 0)) && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onSelectBurger(item);
                            }}
                            aria-label={`Personalizar ${item.name}`}
                            className="inline-flex items-center justify-center w-11 h-11 rounded-[8px] bg-[#222226] hover:bg-[#2A2A2C] border border-[#2E2E34] text-[#C4C0B8] hover:text-[#FAF7F2] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F4A261]"
                          >
                            <SlidersHorizontal className="w-4 h-4" />
                          </button>
                        )}

                        <button
                          type="button"
                          onClick={(e) => handleQuickAdd(e, item)}
                          className={`inline-flex items-center justify-center gap-1.5 min-h-[44px] px-4 py-2 rounded-[8px] text-[14px] font-semibold whitespace-nowrap shrink-0 transition-all duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F4A261] ${
                            isAdded
                              ? 'bg-[#22C55E] text-[#0E0E10]'
                              : 'bg-[#E63926] hover:bg-[#CC2E1C] active:bg-[#B02415] text-[#FAF7F2]'
                          }`}
                        >
                          <Plus className="w-4 h-4" aria-hidden="true" />
                          <span>{isAdded ? 'Adicionado' : 'Adicionar'}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
