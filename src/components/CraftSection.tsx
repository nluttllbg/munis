import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { CRAFT_GRILL_IMAGE, CRAFT_PILLARS } from '../data/menuData';
import { ResilientImage } from './ResilientImage';
import {
  MOTION_DURATION,
  MOTION_EASING,
  MOTION_STAGGER,
  VIEWPORT_CONFIG,
} from '../motion/tokens';

export const CraftSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="na-brasa"
      className="py-16 lg:py-24 bg-[#131315] border-b border-[#2E2E34]"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Editorial Grill Image */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT_CONFIG}
            transition={{
              duration: MOTION_DURATION.slow,
              ease: MOTION_EASING.ember,
            }}
            className="lg:col-span-6"
          >
            <div className="relative aspect-[4/3] rounded-[24px] overflow-hidden border border-[#2E2E34] bg-[#18181B]">
              <ResilientImage
                src={CRAFT_GRILL_IMAGE}
                alt="Hambúrgueres artesanais sendo grelhados diretamente sobre brasa de carvão vegetal na cozinha da Moniz Burger"
                fallbackTitle="Grelha na Brasa — Moniz Burger"
                className="w-full h-full object-cover"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-[#0E0E10]/85 via-transparent to-transparent"
              />
              <div className="absolute bottom-5 left-5 right-5 flex flex-wrap items-center justify-between gap-3">
                <span className="text-[13px] font-semibold text-[#FAF7F2]">
                  Grelha de ferro fundido · Brasa viva de eucalipto
                </span>
                <span className="text-[13px] font-bold tabular-nums text-[#F4A261]">
                  380 °C
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right Craftsmanship Narrative */}
          <div className="lg:col-span-6">
            <p className="text-[12px] font-semibold tracking-[0.03em] text-[#F4A261]">
              Ofício & Fogo Real
            </p>
            <h2 className="mt-2 font-display text-[28px] leading-[34px] md:text-[36px] md:leading-[42px] font-bold tracking-[-0.015em] text-[#FAF7F2] text-balance">
              Por que o sabor da Moniz começa horas antes da chapa esquentar
            </h2>

            <div className="mt-8 divide-y divide-[#2E2E34] border-t border-b border-[#2E2E34]">
              {CRAFT_PILLARS.map((pillar, index) => (
                <motion.div
                  key={pillar.number}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={VIEWPORT_CONFIG}
                  transition={{
                    duration: MOTION_DURATION.normal,
                    delay: shouldReduceMotion ? 0 : index * MOTION_STAGGER.lines,
                    ease: MOTION_EASING.settle,
                  }}
                  className="py-6"
                >
                  <div className="flex items-baseline gap-3">
                    <span className="font-display text-[15px] font-bold tabular-nums text-[#E63926]">
                      {pillar.number}.
                    </span>
                    <h3 className="font-display text-[20px] leading-[26px] font-semibold text-[#FAF7F2]">
                      {pillar.title}
                    </h3>
                  </div>
                  <p className="mt-2 text-[15px] leading-[23px] text-[#C4C0B8]">
                    {pillar.description}
                  </p>
                  <p className="mt-2 text-[12px] font-medium text-[#8A867E]">
                    {pillar.detail}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
