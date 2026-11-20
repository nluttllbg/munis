import React, { useEffect, useState } from 'react';
import {
  CheckCircle2,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  X,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { DELIVERY_ZONES, STORE_INFO } from '../data/menuData';
import { CartItem, OrderReceipt } from '../types/cart';
import { formatBRL } from '../utils/format';
import { MOTION_DURATION, MOTION_EASING } from '../motion/tokens';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  selectedZoneId: string;
  onChangeZoneId: (id: string) => void;
  onUpdateQuantity: (cartKey: string, delta: number) => void;
  onRemoveItem: (cartKey: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  selectedZoneId,
  onChangeZoneId,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [fulfillment, setFulfillment] = useState<'delivery' | 'pickup'>('delivery');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'card' | 'cash'>('pix');
  const [formError, setFormError] = useState<string | null>(null);
  const [receipt, setReceipt] = useState<OrderReceipt | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const subtotal = items.reduce(
    (sum, entry) => sum + entry.unitTotal * entry.quantity,
    0
  );
  const currentZone =
    DELIVERY_ZONES.find((z) => z.id === selectedZoneId) ?? DELIVERY_ZONES[0];
  const qualifiesFreeDelivery = subtotal >= STORE_INFO.freeDeliveryThreshold;
  const deliveryFee =
    fulfillment === 'pickup' || items.length === 0 || qualifiesFreeDelivery
      ? 0
      : currentZone.fee;
  const total = subtotal + deliveryFee;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (items.length === 0) {
      setFormError('Adicione pelo menos um item antes de finalizar o pedido.');
      return;
    }
    if (customerName.trim().length < 2) {
      setFormError('Informe seu nome para identificação do pedido.');
      return;
    }
    const cleanPhone = customerPhone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setFormError('Informe um número de WhatsApp válido com DDD (ex.: 61 99999-9999).');
      return;
    }
    if (fulfillment === 'delivery' && address.trim().length < 6) {
      setFormError('Informe sua quadra, conjunto e número para a entrega.');
      return;
    }

    const orderNumber = Math.floor(100 + Math.random() * 899);
    const itemsCount = items.reduce((sum, entry) => sum + entry.quantity, 0);

    setReceipt({
      orderCode: `MB-${orderNumber}`,
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
      fulfillment,
      zoneName: fulfillment === 'delivery' ? currentZone.name : undefined,
      address: fulfillment === 'delivery' ? address.trim() : undefined,
      paymentMethod,
      eta: fulfillment === 'delivery' ? currentZone.eta : '15–20 min no balcão',
      subtotal,
      deliveryFee,
      total,
      itemsCount,
    });
    onClearCart();
  };

  const resetReceiptAndClose = () => {
    setReceipt(null);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex justify-end"
          role="dialog"
          aria-modal="true"
          aria-label="Sacola de pedidos"
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

          {/* Drawer Panel */}
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: MOTION_DURATION.normal, ease: MOTION_EASING.settle }}
            className="relative z-10 w-full max-w-[460px] h-full bg-[#18181B] border-l border-[#2E2E34] shadow-modal-deep flex flex-col"
          >
            {/* Header */}
            <div className="px-5 py-4 border-b border-[#2E2E34] flex items-center justify-between gap-4 shrink-0">
              <div className="flex items-center gap-2.5">
                <ShoppingBag className="w-5 h-5 text-[#E63926]" aria-hidden="true" />
                <h2 className="font-display text-[20px] font-bold text-[#FAF7F2]">
                  {receipt ? 'Pedido Confirmado' : 'Sua Sacola'}
                </h2>
              </div>
              <button
                type="button"
                onClick={receipt ? resetReceiptAndClose : onClose}
                aria-label="Fechar sacola"
                className="w-11 h-11 rounded-[8px] bg-[#222226] border border-[#2E2E34] text-[#C4C0B8] hover:text-[#FAF7F2] flex items-center justify-center cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-5 space-y-6">
              {receipt ? (
                <div className="space-y-5">
                  <div className="p-5 rounded-[16px] bg-[#222226] border border-[#22C55E]/40">
                    <div className="flex items-center gap-3 text-[#22C55E]">
                      <CheckCircle2 className="w-6 h-6 shrink-0" />
                      <span className="font-display text-[18px] font-bold">
                        Pedido #{receipt.orderCode} recebido na brasa
                      </span>
                    </div>
                    <p className="mt-2 text-[14px] leading-[21px] text-[#C4C0B8]">
                      Preparamos sua comanda para <strong className="text-[#FAF7F2]">{receipt.customerName}</strong>. Tempo estimado:{' '}
                      <strong className="text-[#F4A261]">{receipt.eta}</strong>.
                    </p>
                  </div>

                  <div className="rounded-[16px] bg-[#131315] border border-[#2E2E34] p-5 space-y-3 text-[14px]">
                    <div className="flex justify-between gap-4">
                      <span className="text-[#8A867E]">Modalidade</span>
                      <span className="font-medium text-[#FAF7F2]">
                        {receipt.fulfillment === 'delivery'
                          ? `Entrega · ${receipt.zoneName}`
                          : 'Retirada na QNN 14'}
                      </span>
                    </div>
                    {receipt.address && (
                      <div className="flex justify-between gap-4">
                        <span className="text-[#8A867E]">Endereço</span>
                        <span className="font-medium text-[#FAF7F2] text-right">
                          {receipt.address}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between gap-4">
                      <span className="text-[#8A867E]">Pagamento</span>
                      <span className="font-medium text-[#FAF7F2]">
                        {receipt.paymentMethod === 'pix'
                          ? 'Pix na entrega / balcão'
                          : receipt.paymentMethod === 'card'
                          ? 'Cartão na maquininha'
                          : 'Dinheiro'}
                      </span>
                    </div>
                    <div className="flex justify-between gap-4 pt-3 border-t border-[#2E2E34]">
                      <span className="text-[#C4C0B8]">Total ({receipt.itemsCount} itens)</span>
                      <span className="font-display text-[18px] font-bold tabular-nums text-[#F4A261]">
                        {formatBRL(receipt.total)}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={resetReceiptAndClose}
                    className="w-full min-h-[44px] px-5 py-2.5 rounded-[8px] bg-[#E63926] hover:bg-[#CC2E1C] text-[#FAF7F2] text-[14px] font-semibold cursor-pointer"
                  >
                    Voltar ao Cardápio
                  </button>
                </div>
              ) : items.length === 0 ? (
                <div className="py-12 text-center space-y-4">
                  <p className="font-display text-[20px] font-semibold text-[#FAF7F2]">
                    Sua sacola está vazia
                  </p>
                  <p className="text-[14px] text-[#C4C0B8] max-w-xs mx-auto">
                    Escolha um de nossos hambúrgueres artesanais na brasa ou batatas rústicas para começar.
                  </p>
                  <button
                    type="button"
                    onClick={onClose}
                    className="inline-flex items-center justify-center min-h-[44px] px-5 py-2.5 rounded-[8px] bg-[#E63926] hover:bg-[#CC2E1C] text-[#FAF7F2] text-[14px] font-semibold cursor-pointer"
                  >
                    Ver Cardápio
                  </button>
                </div>
              ) : (
                <>
                  {/* Free Delivery Progress */}
                  {fulfillment === 'delivery' && (
                    <div className="p-3.5 rounded-[12px] bg-[#222226] border border-[#2E2E34] text-[13px]">
                      {qualifiesFreeDelivery ? (
                        <p className="text-[#22C55E] font-medium">
                          Entrega grátis garantida para este pedido.
                        </p>
                      ) : (
                        <p className="text-[#C4C0B8]">
                          Faltam{' '}
                          <span className="font-semibold tabular-nums text-[#F4A261]">
                            {formatBRL(STORE_INFO.freeDeliveryThreshold - subtotal)}
                          </span>{' '}
                          para ganhar entrega grátis.
                        </p>
                      )}
                    </div>
                  )}

                  {/* Cart Items */}
                  <ul className="space-y-3">
                    {items.map((entry) => (
                      <li
                        key={entry.cartKey}
                        className="p-4 rounded-[12px] bg-[#131315] border border-[#2E2E34] space-y-3"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="font-display text-[16px] font-bold text-[#FAF7F2]">
                              {entry.item.name}
                            </p>
                            {entry.meatPoint && (
                              <p className="text-[12px] text-[#C4C0B8] mt-0.5">
                                Ponto: {entry.meatPoint}
                              </p>
                            )}
                            {entry.extras.length > 0 && (
                              <p className="text-[12px] text-[#8A867E] mt-0.5">
                                + {entry.extras.map((e) => e.label).join(', ')}
                              </p>
                            )}
                            {entry.notes && (
                              <p className="text-[12px] text-[#F4A261] mt-1">
                                Obs.: {entry.notes}
                              </p>
                            )}
                          </div>

                          <button
                            type="button"
                            onClick={() => onRemoveItem(entry.cartKey)}
                            aria-label={`Remover ${entry.item.name}`}
                            className="w-9 h-9 rounded-[8px] text-[#8A867E] hover:text-[#EF4444] hover:bg-[#222226] flex items-center justify-center shrink-0 cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="flex items-center justify-between gap-3 pt-2 border-t border-[#2E2E34]">
                          <div className="inline-flex items-center rounded-[8px] bg-[#18181B] border border-[#2E2E34]">
                            <button
                              type="button"
                              onClick={() => onUpdateQuantity(entry.cartKey, -1)}
                              aria-label="Diminuir quantidade"
                              className="w-9 h-9 flex items-center justify-center text-[#C4C0B8] hover:text-[#FAF7F2] cursor-pointer"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="w-7 text-center text-[13px] font-bold tabular-nums text-[#FAF7F2]">
                              {entry.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => onUpdateQuantity(entry.cartKey, 1)}
                              aria-label="Aumentar quantidade"
                              className="w-9 h-9 flex items-center justify-center text-[#C4C0B8] hover:text-[#FAF7F2] cursor-pointer"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <span className="font-display text-[15px] font-bold tabular-nums text-[#F4A261]">
                            {formatBRL(entry.unitTotal * entry.quantity)}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>

                  {/* Checkout Form */}
                  <form id="checkout-form" onSubmit={handleSubmitOrder} className="space-y-4 pt-2">
                    <div>
                      <span className="block text-[13px] font-semibold text-[#FAF7F2] mb-2">
                        Como deseja receber?
                      </span>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setFulfillment('delivery')}
                          className={`min-h-[44px] px-3 py-2 rounded-[8px] border text-[13px] font-semibold transition-colors cursor-pointer ${
                            fulfillment === 'delivery'
                              ? 'bg-[#E63926] border-[#E63926] text-[#FAF7F2]'
                              : 'bg-[#222226] border-[#2E2E34] text-[#C4C0B8]'
                          }`}
                        >
                          Entrega Delivery
                        </button>
                        <button
                          type="button"
                          onClick={() => setFulfillment('pickup')}
                          className={`min-h-[44px] px-3 py-2 rounded-[8px] border text-[13px] font-semibold transition-colors cursor-pointer ${
                            fulfillment === 'pickup'
                              ? 'bg-[#E63926] border-[#E63926] text-[#FAF7F2]'
                              : 'bg-[#222226] border-[#2E2E34] text-[#C4C0B8]'
                          }`}
                        >
                          Retirar (Grátis)
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label
                          htmlFor="checkout-name"
                          className="block text-[12px] font-semibold text-[#C4C0B8] mb-1.5"
                        >
                          Seu nome
                        </label>
                        <input
                          id="checkout-name"
                          type="text"
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                          placeholder="Ex.: Mariana Souza"
                          className="w-full min-h-[44px] px-3 py-2 rounded-[8px] bg-[#131315] border border-[#2E2E34] text-[14px] text-[#FAF7F2] placeholder:text-[#8A867E] focus:outline-none focus:border-[#F4A261]"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="checkout-phone"
                          className="block text-[12px] font-semibold text-[#C4C0B8] mb-1.5"
                        >
                          WhatsApp
                        </label>
                        <input
                          id="checkout-phone"
                          type="tel"
                          value={customerPhone}
                          onChange={(e) => setCustomerPhone(e.target.value)}
                          placeholder="(61) 99999-9999"
                          className="w-full min-h-[44px] px-3 py-2 rounded-[8px] bg-[#131315] border border-[#2E2E34] text-[14px] text-[#FAF7F2] placeholder:text-[#8A867E] focus:outline-none focus:border-[#F4A261]"
                        />
                      </div>
                    </div>

                    {fulfillment === 'delivery' && (
                      <div className="space-y-3">
                        <div>
                          <label
                            htmlFor="checkout-zone"
                            className="block text-[12px] font-semibold text-[#C4C0B8] mb-1.5"
                          >
                            Região de entrega
                          </label>
                          <select
                            id="checkout-zone"
                            value={selectedZoneId}
                            onChange={(e) => onChangeZoneId(e.target.value)}
                            className="w-full min-h-[44px] px-3 py-2 rounded-[8px] bg-[#131315] border border-[#2E2E34] text-[14px] text-[#FAF7F2] focus:outline-none focus:border-[#F4A261]"
                          >
                            {DELIVERY_ZONES.map((z) => (
                              <option key={z.id} value={z.id}>
                                {z.name} ({z.eta} · {formatBRL(z.fee)})
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label
                            htmlFor="checkout-address"
                            className="block text-[12px] font-semibold text-[#C4C0B8] mb-1.5"
                          >
                            Quadra, conjunto, lote/apto e referência
                          </label>
                          <input
                            id="checkout-address"
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="Ex.: QNN 12 Conjunto C, Casa 14"
                            className="w-full min-h-[44px] px-3 py-2 rounded-[8px] bg-[#131315] border border-[#2E2E34] text-[14px] text-[#FAF7F2] placeholder:text-[#8A867E] focus:outline-none focus:border-[#F4A261]"
                          />
                        </div>
                      </div>
                    )}

                    <div>
                      <span className="block text-[12px] font-semibold text-[#C4C0B8] mb-1.5">
                        Forma de pagamento na entrega / balcão
                      </span>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { id: 'pix', label: 'Pix' },
                          { id: 'card', label: 'Cartão' },
                          { id: 'cash', label: 'Dinheiro' },
                        ].map((opt) => (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() =>
                              setPaymentMethod(opt.id as 'pix' | 'card' | 'cash')
                            }
                            className={`min-h-[40px] px-2.5 py-2 rounded-[8px] border text-[13px] font-semibold transition-colors cursor-pointer ${
                              paymentMethod === opt.id
                                ? 'bg-[#222226] border-[#F4A261] text-[#F4A261]'
                                : 'bg-[#131315] border-[#2E2E34] text-[#C4C0B8]'
                            }`}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {formError && (
                      <p
                        role="alert"
                        className="p-3 rounded-[8px] bg-[#EF4444]/15 border border-[#EF4444]/40 text-[13px] text-[#FFB4AB]"
                      >
                        {formError}
                      </p>
                    )}
                  </form>
                </>
              )}
            </div>

            {/* Sticky Drawer Footer when items exist */}
            {!receipt && items.length > 0 && (
              <div className="p-5 border-t border-[#2E2E34] bg-[#222226] space-y-3 shrink-0">
                <div className="space-y-1.5 text-[13px]">
                  <div className="flex justify-between text-[#C4C0B8]">
                    <span>Subtotal</span>
                    <span className="tabular-nums">{formatBRL(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-[#C4C0B8]">
                    <span>
                      {fulfillment === 'pickup' ? 'Retirada no balcão' : 'Taxa de entrega'}
                    </span>
                    <span className="tabular-nums">
                      {deliveryFee === 0 ? 'Grátis' : formatBRL(deliveryFee)}
                    </span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-[#2E2E34] text-[16px] font-bold text-[#FAF7F2]">
                    <span>Total do Pedido</span>
                    <span className="font-display tabular-nums text-[#F4A261]">
                      {formatBRL(total)}
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  form="checkout-form"
                  className="w-full min-h-[48px] px-5 py-3 rounded-[8px] bg-[#E63926] hover:bg-[#CC2E1C] active:bg-[#B02415] text-[#FAF7F2] text-[15px] font-semibold transition-all duration-150 hover:shadow-[0_4px_20px_rgba(230,57,38,0.28)] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F4A261]"
                >
                  Finalizar Pedido · {formatBRL(total)}
                </button>
              </div>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
};
