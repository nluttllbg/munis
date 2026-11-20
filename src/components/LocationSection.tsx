import React, { useState } from 'react';
import { Clock, MapPin, Phone, Truck, ArrowRight } from 'lucide-react';
import { DELIVERY_ZONES, STORE_INFO } from '../data/menuData';
import { formatBRL } from '../utils/format';

interface LocationSectionProps {
  onOpenCartWithZone: (zoneId: string) => void;
}

export const LocationSection: React.FC<LocationSectionProps> = ({
  onOpenCartWithZone,
}) => {
  const [selectedZoneId, setSelectedZoneId] = useState(DELIVERY_ZONES[0].id);
  const currentZone =
    DELIVERY_ZONES.find((z) => z.id === selectedZoneId) ?? DELIVERY_ZONES[0];

  return (
    <section
      id="localizacao"
      className="py-16 lg:py-24 bg-[#131315]"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Store Details */}
          <div className="lg:col-span-6 flex flex-col justify-between rounded-[24px] bg-[#18181B] border border-[#2E2E34] p-6 sm:p-8">
            <div>
              <p className="text-[12px] font-semibold tracking-[0.03em] text-[#F4A261]">
                Retirada no Balcão & Salão Noturno
              </p>
              <h2 className="mt-2 font-display text-[28px] leading-[34px] md:text-[36px] md:leading-[42px] font-bold tracking-[-0.015em] text-[#FAF7F2] text-balance">
                Visite nossa cozinha na QNN 14 em Ceilândia
              </h2>
              <p className="mt-3 text-[15px] leading-[24px] text-[#C4C0B8]">
                Prepare-se para sentir o aroma da brasa antes mesmo de entrar. Atendemos no salão, retirada rápida sem taxa e entrega própria em toda Ceilândia e regiões vizinhas.
              </p>

              <dl className="mt-8 space-y-5">
                <div className="flex items-start gap-3.5">
                  <MapPin className="w-5 h-5 text-[#E63926] shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <dt className="text-[12px] font-semibold tracking-[0.03em] text-[#8A867E]">
                      Endereço
                    </dt>
                    <dd className="mt-0.5 text-[15px] font-medium text-[#FAF7F2]">
                      {STORE_INFO.address} · {STORE_INFO.cep}
                    </dd>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Clock className="w-5 h-5 text-[#F4A261] shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <dt className="text-[12px] font-semibold tracking-[0.03em] text-[#8A867E]">
                      Horário de Funcionamento
                    </dt>
                    <dd className="mt-0.5 text-[15px] font-medium text-[#FAF7F2]">
                      {STORE_INFO.hours}
                    </dd>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Phone className="w-5 h-5 text-[#C4C0B8] shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <dt className="text-[12px] font-semibold tracking-[0.03em] text-[#8A867E]">
                      Atendimento & WhatsApp
                    </dt>
                    <dd className="mt-0.5 text-[15px] font-medium tabular-nums text-[#FAF7F2]">
                      {STORE_INFO.phone}
                    </dd>
                  </div>
                </div>
              </dl>
            </div>

            <div className="mt-8 pt-6 border-t border-[#2E2E34] flex flex-wrap items-center justify-between gap-4">
              <p className="text-[13px] text-[#C4C0B8]">
                Entrega gratuita em pedidos acima de{' '}
                <span className="font-semibold text-[#F4A261] tabular-nums">
                  {formatBRL(STORE_INFO.freeDeliveryThreshold)}
                </span>
              </p>
              <a
                href="#cardapio"
                className="text-[14px] font-semibold text-[#F4A261] hover:underline underline-offset-4 whitespace-nowrap"
              >
                Voltar ao cardápio
              </a>
            </div>
          </div>

          {/* Right Delivery Estimator & Direct Order CTA */}
          <div className="lg:col-span-6 flex flex-col justify-between rounded-[24px] bg-[#18181B] border border-[#2E2E34] p-6 sm:p-8">
            <div>
              <div className="flex items-center gap-2.5 text-[12px] font-semibold tracking-[0.03em] text-[#F4A261]">
                <Truck className="w-4 h-4" aria-hidden="true" />
                <span>Simulador de Entrega Regional</span>
              </div>
              <h3 className="mt-2 font-display text-[24px] leading-[30px] font-bold text-[#FAF7F2]">
                Consulte taxa e tempo para sua quadra
              </h3>
              <p className="mt-2 text-[14px] leading-[21px] text-[#C4C0B8]">
                Selecione sua região no Distrito Federal para calcular o tempo médio de preparo na brasa mais o trajeto até você.
              </p>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {DELIVERY_ZONES.map((zone) => {
                  const active = zone.id === selectedZoneId;
                  return (
                    <button
                      key={zone.id}
                      type="button"
                      onClick={() => setSelectedZoneId(zone.id)}
                      className={`min-h-[48px] px-4 py-2.5 rounded-[8px] border text-left transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F4A261] ${
                        active
                          ? 'bg-[#E63926]/15 border-[#E63926] text-[#FAF7F2]'
                          : 'bg-[#222226] border-[#2E2E34] text-[#C4C0B8] hover:border-[#5C403B] hover:text-[#FAF7F2]'
                      }`}
                    >
                      <span className="block text-[13px] font-semibold truncate">
                        {zone.name}
                      </span>
                      <span className="block text-[12px] text-[#8A867E] tabular-nums mt-0.5">
                        {zone.eta} · {formatBRL(zone.fee)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-8 p-5 rounded-[16px] bg-[#222226] border border-[#2E2E34] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="text-[12px] font-semibold text-[#8A867E]">
                  Região selecionada: {currentZone.name}
                </p>
                <p className="mt-1 font-display text-[20px] font-bold tabular-nums text-[#FAF7F2]">
                  {currentZone.eta}{' '}
                  <span className="text-[#F4A261] font-semibold">
                    · Taxa {formatBRL(currentZone.fee)}
                  </span>
                </p>
              </div>

              <button
                type="button"
                onClick={() => onOpenCartWithZone(currentZone.id)}
                className="inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-2.5 rounded-[8px] bg-[#E63926] hover:bg-[#CC2E1C] active:bg-[#B02415] text-[#FAF7F2] text-[14px] font-semibold whitespace-nowrap shrink-0 transition-all duration-150 hover:shadow-[0_4px_20px_rgba(230,57,38,0.25)] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F4A261]"
              >
                <span>Pedir para essa região</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
