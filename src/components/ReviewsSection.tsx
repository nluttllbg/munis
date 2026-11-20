import React from 'react';
import { Star } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { RATING_BREAKDOWN, REVIEWS, STORE_INFO } from '../data/menuData';
import {
  MOTION_DURATION,
  MOTION_EASING,
  MOTION_STAGGER,
  VIEWPORT_CONFIG,
} from '../motion/tokens';

export const ReviewsSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="avaliacoes"
      className="py-16 lg:py-24 bg-[#0E0E10] border-b border-[#2E2E34]"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Aggregate Rating Summary */}
          <div className="lg:col-span-4 rounded-[16px] bg-[#18181B] border border-[#2E2E34] p-6">
            <p className="text-[12px] font-semibold tracking-[0.03em] text-[#F4A261]">
              Avaliação dos Clientes
            </p>

            <div className="mt-4 flex items-baseline gap-3">
              <span className="font-display text-[48px] leading-[52px] font-extrabold tabular-nums text-[#F4A261]">
                {STORE_INFO.averageRating.toFixed(1)}
              </span>
              <div>
                <div className="flex items-center gap-1" aria-label="Nota 4.4 de 5 estrelas">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-4 h-4 ${
                        star <= 4
                          ? 'fill-[#F4A261] text-[#F4A261]'
                          : 'fill-[#F4A261]/40 text-[#F4A261]'
                      }`}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <p className="mt-1 text-[13px] text-[#C4C0B8] tabular-nums">
                  {STORE_INFO.totalReviews} avaliações em Ceilândia e DF
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-2.5">
              {RATING_BREAKDOWN.map((row) => (
                <div key={row.stars} className="flex items-center gap-3 text-[12px]">
                  <span className="w-8 font-semibold tabular-nums text-[#C4C0B8]">
                    {row.stars} ★
                  </span>
                  <div className="flex-1 h-2 rounded-full bg-[#222226] overflow-hidden">
                    <motion.div
                      initial={shouldReduceMotion ? { scaleX: 1 } : { scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={VIEWPORT_CONFIG}
                      transition={{
                        duration: MOTION_DURATION.slow,
                        ease: MOTION_EASING.ember,
                      }}
                      style={{
                        width: `${row.percent}%`,
                        transformOrigin: 'left center',
                      }}
                      className="h-full rounded-full bg-[#F4A261]"
                    />
                  </div>
                  <span className="w-9 text-right tabular-nums text-[#8A867E]">
                    {row.percent}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Review Cards */}
          <div className="lg:col-span-8">
            <div className="max-w-xl">
              <p className="text-[12px] font-semibold tracking-[0.03em] text-[#F4A261]">
                Quem Pede, Recomenda
              </p>
              <h2 className="mt-2 font-display text-[28px] leading-[34px] md:text-[36px] md:leading-[42px] font-bold tracking-[-0.015em] text-[#FAF7F2] text-balance">
                Aprovado na mesa e no delivery do Distrito Federal
              </h2>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-5">
              {REVIEWS.map((review, idx) => (
                <motion.article
                  key={review.id}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={VIEWPORT_CONFIG}
                  transition={{
                    duration: MOTION_DURATION.normal,
                    delay: shouldReduceMotion ? 0 : idx * MOTION_STAGGER.reviews,
                    ease: MOTION_EASING.settle,
                  }}
                  className="flex flex-col justify-between rounded-[16px] bg-[#18181B] border border-[#2E2E34] p-5"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <div
                          aria-hidden="true"
                          className="w-10 h-10 rounded-full bg-[#222226] border border-[#2E2E34] flex items-center justify-center font-display text-[13px] font-bold text-[#F4A261] shrink-0"
                        >
                          {review.initials}
                        </div>
                        <div>
                          <p className="text-[14px] font-semibold text-[#FAF7F2]">
                            {review.author}
                          </p>
                          <p className="text-[12px] text-[#8A867E]">
                            {review.neighborhood}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center gap-1" aria-label={`Nota ${review.rating} de 5`}>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-3.5 h-3.5 ${
                            star <= review.rating
                              ? 'fill-[#F4A261] text-[#F4A261]'
                              : 'text-[#2E2E34]'
                          }`}
                          aria-hidden="true"
                        />
                      ))}
                    </div>

                    <p className="mt-3 text-[14px] leading-[21px] text-[#C4C0B8]">
                      "{review.comment}"
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-[#2E2E34] flex items-center justify-between gap-2 text-[12px] text-[#8A867E]">
                    <span className="truncate text-[#C4C0B8]">{review.orderedItem}</span>
                    <span className="shrink-0">{review.date}</span>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
