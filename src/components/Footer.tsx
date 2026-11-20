import React from 'react';
import { BrandLogo } from './BrandLogo';
import { STORE_INFO } from '../data/menuData';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0E0E10] border-t border-[#2E2E34] py-12">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-[#2E2E34]">
          <div className="md:col-span-5">
            <BrandLogo />
            <p className="mt-4 text-[14px] leading-[22px] text-[#C4C0B8] max-w-sm">
              Hamburgueria artesanal feita na brasa de carvão vegetal em Ceilândia, Brasília - DF. Qualidade diária do blend ao brioche.
            </p>
          </div>

          <div className="md:col-span-4">
            <p className="text-[12px] font-semibold tracking-[0.03em] text-[#F4A261]">
              Unidade Ceilândia
            </p>
            <p className="mt-3 text-[14px] text-[#FAF7F2]">{STORE_INFO.address}</p>
            <p className="mt-1 text-[13px] text-[#8A867E]">{STORE_INFO.hours}</p>
            <p className="mt-1 text-[13px] tabular-nums text-[#C4C0B8]">
              {STORE_INFO.phone}
            </p>
          </div>

          <div className="md:col-span-3">
            <p className="text-[12px] font-semibold tracking-[0.03em] text-[#F4A261]">
              Navegação
            </p>
            <ul className="mt-3 space-y-2 text-[14px] text-[#C4C0B8]">
              <li>
                <a href="#cardapio" className="hover:text-[#FAF7F2] transition-colors">
                  Cardápio da Brasa
                </a>
              </li>
              <li>
                <a href="#na-brasa" className="hover:text-[#FAF7F2] transition-colors">
                  Nossa Cozinha
                </a>
              </li>
              <li>
                <a href="#avaliacoes" className="hover:text-[#FAF7F2] transition-colors">
                  Avaliações
                </a>
              </li>
              <li>
                <a href="#localizacao" className="hover:text-[#FAF7F2] transition-colors">
                  Taxas & Entrega
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[12px] text-[#8A867E]">
          <p>© {new Date().getFullYear()} Moniz Burger Artesanal. Ceilândia, Brasília - DF.</p>
          <p>Todos os preços em Reais (BRL).</p>
        </div>
      </div>
    </footer>
  );
};
