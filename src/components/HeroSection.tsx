import React, { useRef } from 'react';
import { ArrowRight, Star } from 'lucide-react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { HERO_IMAGE, STORE_INFO } from '../data/menuData';
import { ResilientImage } from './ResilientImage';
import { MOTION_DURATION, MOTION_EASING, MOTION_DISTANCE } from '../motion/tokens';

interface HeroSectionProps {
  onExploreMenu: () => void;
  onQuickOrder: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreMenu,
  onQuickOrder,
}) => {
  const heroRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [0, shouldReduceMotion ? 0 : 38]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.02, shouldReduceMotion ? 1.02 : 1.08]);

  return (
    <section
      id="topo"
      ref={heroRef}
      className="relative overflow-hidden bg-[#0E0E10] border-b border-[#2E2E34]"
    >
      {/* Subtle ambient ember radial glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 right-0 w-[620px] h-[620px] rounded-full opacity-20 blur-3xl"
        style={{
          background:
            'radial-gradient(circle, rgba(230,57,38,0.45) 0%, rgba(255,107,53,0.18) 45%, rgba(14,14,16,0) 75%)',
        }}
      />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-12 lg:pt-16 lg:pb-16">
        {/* 2-Column Editorial Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Content Column */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: MOTION_DISTANCE.micro }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: MOTION_DURATION.normal, ease: MOTION_EASING.settle }}
              className="flex flex-wrap items-center gap-2 text-[12px] font-semibold tracking-[0.03em] text-[#F4A261] mb-4"
            >
              <span>Ceilândia · Brasília - DF</span>
              <span aria-hidden="true" className="text-[#8A867E]">
                /
              </span>
              <span className="text-[#C4C0B8]">{STORE_INFO.hours}</span>
            </motion.div>

            <motion.h1
              initial={shouldReduceMotion ? false : { opacity: 0, y: MOTION_DISTANCE.reveal }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: MOTION_DURATION.slow,
                delay: 0.06,
                ease: MOTION_EASING.ember,
              }}
              className="font-display text-[32px] leading-[38px] sm:text-[42px] sm:leading-[48px] lg:text-[48px] lg:leading-[52px] font-extrabold tracking-[-0.02em] text-[#FAF7F2] text-balance"
            >
              Fogo alto, carne fresca e o sabor real da brasa em Ceilândia.
            </motion.h1>

            <motion.p
              initial={shouldReduceMotion ? false : { opacity: 0, y: MOTION_DISTANCE.reveal }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: MOTION_DURATION.slow,
                delay: 0.14,
                ease: MOTION_EASING.ember,
              }}
              className="mt-5 text-[16px] leading-[24px] sm:text-[18px] sm:leading-[28px] text-[#C4C0B8] max-w-xl"
            >
              Blend bovino de 180g moído diariamente, selado na grelha sobre carvão vegetal aceso e servido no brioche amanteigado com molhos defumados da casa.
            </motion.p>

            {/* Primary & Secondary Actions */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: MOTION_DISTANCE.micro }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: MOTION_DURATION.normal,
                delay: 0.22,
                ease: MOTION_EASING.settle,
              }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <button
                type="button"
                onClick={onExploreMenu}
                className="inline-flex items-center justify-center gap-2.5 min-h-[48px] px-6 py-3 rounded-[8px] bg-[#E63926] hover:bg-[#CC2E1C] active:bg-[#B02415] text-[#FAF7F2] text-[15px] font-semibold tracking-[0.02em] whitespace-nowrap shrink-0 transition-all duration-150 hover:shadow-[0_4px_20px_rgba(230,57,38,0.28)] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F4A261]"
              >
                <span>Explorar Cardápio</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={onQuickOrder}
                className="inline-flex items-center justify-center min-h-[48px] px-5 py-3 rounded-[8px] bg-[#222226] hover:bg-[#2A2A2C] border border-[#2E2E34] hover:border-[#F4A261]/50 text-[#FAF7F2] text-[15px] font-semibold whitespace-nowrap shrink-0 transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F4A261]"
              >
                Ver Sacola & Delivery
              </button>
            </motion.div>
          </div>

          {/* Right Media Column */}
          <div className="lg:col-span-6 flex">
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: MOTION_DURATION.cinematic,
                ease: MOTION_EASING.ember,
              }}
              className="relative w-full aspect-[16/10] lg:aspect-auto lg:min-h-[430px] lg:h-full rounded-[24px] overflow-hidden border border-[#2E2E34] bg-[#18181B]"
            >
              <motion.div
                style={{ y: imageY, scale: imageScale }}
                className="w-full h-full will-change-transform"
              >
                <ResilientImage
                  src={HERO_IMAGE}
                  alt="Hambúrguer artesanal Moniz Burger duplo com cheddar derretido e bacon sobre ardósia e brasas acesas"
                  loading="eager"
                  fallbackTitle="Moniz Burger na Brasa"
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Measured scrim for crisp editorial caption contrast */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-[#0E0E10]/85 via-[#0E0E10]/20 to-transparent"
              />

              <div className="absolute bottom-5 left-5 right-5 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="text-[12px] font-semibold tracking-[0.03em] text-[#F4A261]">
                    Destaque da Noite · QNN 14
                  </p>
                  <p className="font-display text-[20px] leading-[26px] font-bold text-[#FAF7F2] mt-0.5">
                    Moniz QNN Duplo Bacon
                  </p>
                </div>
                <span className="text-[16px] font-bold tabular-nums text-[#F4A261]">
                  R$ 48,90
                </span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Full-Width 4-Column Operational Proof Strip */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: MOTION_DURATION.slow,
            delay: 0.28,
            ease: MOTION_EASING.settle,
          }}
          className="mt-10 pt-8 border-t border-[#2E2E34] grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
        >
          <div>
            <div className="flex items-center gap-1.5 font-display text-[22px] font-bold tabular-nums text-[#F4A261]">
              <span>4.4</span>
              <Star className="w-4 h-4 fill-[#F4A261] text-[#F4A261]" aria-hidden="true" />
            </div>
            <p className="mt-1 text-[13px] text-[#C4C0B8] tabular-nums">
              318 avaliações verificadas
            </p>
          </div>

          <div>
            <p className="font-display text-[22px] font-bold tabular-nums text-[#FAF7F2]">
              380 °C
            </p>
            <p className="mt-1 text-[13px] text-[#C4C0B8]">
              Brasa real de carvão vegetal
            </p>
          </div>

          <div>
            <p className="font-display text-[22px] font-bold tabular-nums text-[#FAF7F2]">
              180 g
            </p>
            <p className="mt-1 text-[13px] text-[#C4C0B8]">
              Blend fresco moído todo dia
            </p>
          </div>

          <div>
            <p className="font-display text-[22px] font-bold tabular-nums text-[#FAF7F2]">
              25–40 min
            </p>
            <p className="mt-1 text-[13px] text-[#C4C0B8]">
              Delivery Ceilândia ou retirada
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
