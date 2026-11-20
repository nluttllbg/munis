import React, { useEffect, useState } from 'react';
import { Check, Minus, Plus, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { ExtraOption, MeatPoint, MenuItem } from '../data/menuData';
import { formatBRL } from '../utils/format';
import { ResilientImage } from './ResilientImage';
import { MOTION_DURATION, MOTION_EASING } from '../motion/tokens';

interface BurgerModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onAddToCart: (payload: {
    item: MenuItem;
    quantity: number;
    meatPoint?: MeatPoint;
    extras: ExtraOption[];
    notes: string;
  }) => void;
}

const MEAT_POINTS: MeatPoint[] = [
  'Ao ponto da casa',
  'Mal passado',
  'Bem passado',
];

export const BurgerModal: React.FC<BurgerModalProps> = ({
  item,
  onClose,
  onAddToCart,
}) => {
  const [meatPoint, setMeatPoint] = useState<MeatPoint>('Ao ponto da casa');
  const [selectedExtras, setSelectedExtras] = useState<ExtraOption[]>([]);
  const [notes, setNotes] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (item) {
      setMeatPoint('Ao ponto da casa');
      setSelectedExtras([]);
      setNotes('');
      setQuantity(1);
    }
  }, [item]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && item) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [item, onClose]);

  const toggleExtra = (extra: ExtraOption) => {
    setSelectedExtras((prev) =>
      prev.some((e) => e.id === extra.id)
        ? prev.filter((e) => e.id !== extra.id)
        : [...prev, extra]
    );
  };

  const extrasSum = selectedExtras.reduce((acc, e) => acc + e.price, 0);
  const unitPrice = item ? item.price + extrasSum : 0;
  const totalPrice = unitPrice * quantity;

  const handleConfirm = () => {
    if (!item) return;
    onAddToCart({
      item,
      quantity,
      meatPoint: item.allowMeatPoint ? meatPoint : undefined,
      extras: selectedExtras,
      notes: notes.trim(),
    });
    onClose();
  };

  return (
    <AnimatePresence>
      {item && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="burger-modal-title"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: MOTION_DURATION.fast }}
            onClick={onClose}
            className="fixed inset-0 bg-[#0E0E10]/80 backdrop-blur-sm"
          />

          {/* Modal / Bottom Sheet */}
          <motion.div
            initial={{ opacity: 0, y: 32, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: MOTION_DURATION.normal, ease: MOTION_EASING.settle }}
            className="relative z-10 w-full sm:max-w-[560px] max-h-[90vh] flex flex-col rounded-t-[24px] sm:rounded-[24px] bg-[#18181B] border border-[#2E2E34] shadow-modal-deep overflow-hidden"
          >
            {/* Header Image */}
            <div className="relative aspect-[16/9] w-full shrink-0 bg-[#131315]">
              <ResilientImage
                src={item.image}
                alt={item.name}
                fallbackTitle={item.name}
                className="w-full h-full object-cover"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-[#18181B] via-[#18181B]/20 to-transparent"
              />
              <button
                type="button"
                onClick={onClose}
                aria-label="Fechar detalhes do item"
                className="absolute top-4 right-4 w-11 h-11 rounded-[8px] bg-[#0E0E10]/85 border border-[#2E2E34] text-[#FAF7F2] hover:border-[#F4A261] flex items-center justify-center transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F4A261]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="flex-1 overflow-y-auto px-5 sm:px-6 pb-6 pt-2 space-y-6">
              <div>
                <p className="text-[12px] font-medium text-[#8A867E]">{item.specs}</p>
                <div className="mt-1 flex items-baseline justify-between gap-4">
                  <h3
                    id="burger-modal-title"
                    className="font-display text-[24px] leading-[30px] font-bold text-[#FAF7F2]"
                  >
                    {item.name}
                  </h3>
                  <span className="font-display text-[20px] font-bold tabular-nums text-[#F4A261] shrink-0">
                    {formatBRL(item.price)}
                  </span>
                </div>
                <p className="mt-2 text-[14px] leading-[21px] text-[#C4C0B8]">
                  {item.description}
                </p>
              </div>

              {/* Meat Point Selector (Custom Radio Buttons) */}
              {item.allowMeatPoint && (
                <div>
                  <p className="text-[14px] font-semibold text-[#FAF7F2]">
                    Ponto da carne na brasa
                  </p>
                  <div className="mt-3 space-y-2">
                    {MEAT_POINTS.map((point) => {
                      const active = meatPoint === point;
                      return (
                        <button
                          key={point}
                          type="button"
                          onClick={() => setMeatPoint(point)}
                          className={`w-full min-h-[44px] px-4 py-2.5 rounded-[8px] border flex items-center justify-between transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F4A261] ${
                            active
                              ? 'bg-[#222226] border-[#E63926] text-[#FAF7F2]'
                              : 'bg-[#131315] border-[#2E2E34] text-[#C4C0B8] hover:border-[#5C403B]'
                          }`}
                        >
                          <span className="text-[14px] font-medium">{point}</span>
                          <span
                            className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                              active
                                ? 'bg-[#E63926] border-[#E63926]'
                                : 'border-[#2E2E34] bg-transparent'
                            }`}
                          >
                            {active && (
                              <span className="w-2 h-2 rounded-full bg-[#FAF7F2]" />
                            )}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Extras Selector (Custom Checkboxes) */}
              {item.availableExtras && item.availableExtras.length > 0 && (
                <div>
                  <p className="text-[14px] font-semibold text-[#FAF7F2]">
                    Adicionais artesanais
                  </p>
                  <div className="mt-3 space-y-2">
                    {item.availableExtras.map((extra) => {
                      const checked = selectedExtras.some((e) => e.id === extra.id);
                      return (
                        <button
                          key={extra.id}
                          type="button"
                          onClick={() => toggleExtra(extra)}
                          className={`w-full min-h-[44px] px-4 py-2.5 rounded-[8px] border flex items-center justify-between gap-3 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F4A261] ${
                            checked
                              ? 'bg-[#222226] border-[#E63926] text-[#FAF7F2]'
                              : 'bg-[#131315] border-[#2E2E34] text-[#C4C0B8] hover:border-[#5C403B]'
                          }`}
                        >
                          <div className="flex items-center gap-3 text-left">
                            <span
                              className={`w-5 h-5 rounded-[6px] border flex items-center justify-center shrink-0 transition-colors ${
                                checked
                                  ? 'bg-[#E63926] border-[#E63926] text-[#FAF7F2]'
                                  : 'border-[#2E2E34] bg-transparent'
                              }`}
                            >
                              {checked && <Check className="w-3.5 h-3.5" strokeWidth={2.5} />}
                            </span>
                            <span className="text-[14px] font-medium">{extra.label}</span>
                          </div>
                          <span className="text-[13px] font-semibold tabular-nums text-[#F4A261] shrink-0">
                            +{formatBRL(extra.price)}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Notes Input */}
              <div>
                <label
                  htmlFor="burger-notes"
                  className="block text-[14px] font-semibold text-[#FAF7F2]"
                >
                  Observações da cozinha
                </label>
                <input
                  id="burger-notes"
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  maxLength={140}
                  placeholder="Ex.: Sem tomate, maionese à parte..."
                  className="mt-2 w-full min-h-[44px] px-3.5 py-2.5 rounded-[8px] bg-[#131315] border border-[#2E2E34] text-[14px] text-[#FAF7F2] placeholder:text-[#8A867E] focus:outline-none focus:border-[#F4A261] focus:ring-1 focus:ring-[#F4A261]"
                />
              </div>
            </div>

            {/* Footer Action Bar */}
            <div className="p-4 sm:px-6 border-t border-[#2E2E34] bg-[#222226] flex items-center justify-between gap-3 shrink-0">
              <div className="inline-flex items-center rounded-[8px] bg-[#18181B] border border-[#2E2E34]">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Diminuir quantidade"
                  className="w-11 h-11 flex items-center justify-center text-[#C4C0B8] hover:text-[#FAF7F2] cursor-pointer"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-8 text-center text-[15px] font-bold tabular-nums text-[#FAF7F2]">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  aria-label="Aumentar quantidade"
                  className="w-11 h-11 flex items-center justify-center text-[#C4C0B8] hover:text-[#FAF7F2] cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button
                type="button"
                onClick={handleConfirm}
                className="flex-1 min-h-[44px] px-5 py-2.5 rounded-[8px] bg-[#E63926] hover:bg-[#CC2E1C] active:bg-[#B02415] text-[#FAF7F2] text-[14px] sm:text-[15px] font-semibold flex items-center justify-between gap-2 transition-all duration-150 hover:shadow-[0_4px_20px_rgba(230,57,38,0.25)] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F4A261]"
              >
                <span>Adicionar à Sacola</span>
                <span className="tabular-nums font-bold">{formatBRL(totalPrice)}</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
