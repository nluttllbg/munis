import { useEffect, useState } from 'react';
import { MotionConfig } from 'motion/react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { MenuSection } from './components/MenuSection';
import { CraftSection } from './components/CraftSection';
import { ReviewsSection } from './components/ReviewsSection';
import { LocationSection } from './components/LocationSection';
import { Footer } from './components/Footer';
import { BurgerModal } from './components/BurgerModal';
import { CartDrawer } from './components/CartDrawer';
import { DELIVERY_ZONES, ExtraOption, MeatPoint, MenuItem } from './data/menuData';
import { CartItem } from './types/cart';

const CART_STORAGE_KEY = 'moniz_burger_cart_v1';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = window.localStorage.getItem(CART_STORAGE_KEY);
      return saved ? (JSON.parse(saved) as CartItem[]) : [];
    } catch {
      return [];
    }
  });
  const [selectedBurger, setSelectedBurger] = useState<MenuItem | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedZoneId, setSelectedZoneId] = useState(DELIVERY_ZONES[0].id);
  const [activeSection, setActiveSection] = useState('cardapio');

  useEffect(() => {
    try {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch {
      // Ignore storage quota errors
    }
  }, [cartItems]);

  useEffect(() => {
    const sectionIds = ['cardapio', 'na-brasa', 'avaliacoes', 'localizacao'];
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: '-35% 0px -50% 0px', threshold: 0.05 }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const addToCart = (payload: {
    item: MenuItem;
    quantity: number;
    meatPoint?: MeatPoint;
    extras: ExtraOption[];
    notes: string;
  }) => {
    const extrasIds = payload.extras
      .map((e) => e.id)
      .sort()
      .join(',');
    const cartKey = `${payload.item.id}|${payload.meatPoint ?? ''}|${extrasIds}|${payload.notes}`;
    const extrasSum = payload.extras.reduce((sum, e) => sum + e.price, 0);
    const unitTotal = payload.item.price + extrasSum;

    setCartItems((prev) => {
      const existing = prev.find((entry) => entry.cartKey === cartKey);
      if (existing) {
        return prev.map((entry) =>
          entry.cartKey === cartKey
            ? { ...entry, quantity: entry.quantity + payload.quantity }
            : entry
        );
      }
      return [
        ...prev,
        {
          cartKey,
          item: payload.item,
          quantity: payload.quantity,
          meatPoint: payload.meatPoint,
          extras: payload.extras,
          notes: payload.notes,
          unitTotal,
        },
      ];
    });
  };

  const handleQuickAdd = (item: MenuItem) => {
    addToCart({
      item,
      quantity: 1,
      meatPoint: item.allowMeatPoint ? 'Ao ponto da casa' : undefined,
      extras: [],
      notes: '',
    });
  };

  const handleUpdateQuantity = (cartKey: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((entry) =>
          entry.cartKey === cartKey
            ? { ...entry, quantity: entry.quantity + delta }
            : entry
        )
        .filter((entry) => entry.quantity > 0)
    );
  };

  const handleRemoveItem = (cartKey: string) => {
    setCartItems((prev) => prev.filter((entry) => entry.cartKey !== cartKey));
  };

  const scrollToMenu = () => {
    const el = document.getElementById('cardapio');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const cartCount = cartItems.reduce((sum, entry) => sum + entry.quantity, 0);
  const cartTotal = cartItems.reduce(
    (sum, entry) => sum + entry.unitTotal * entry.quantity,
    0
  );

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen flex flex-col bg-[#0E0E10] text-[#FAF7F2]">
        <Header
          cartCount={cartCount}
          cartTotal={cartTotal}
          onOpenCart={() => setCartOpen(true)}
          activeSection={activeSection}
        />

        <main className="flex-1">
          <HeroSection
            onExploreMenu={scrollToMenu}
            onQuickOrder={() => setCartOpen(true)}
          />

          <MenuSection
            onSelectBurger={(item) => setSelectedBurger(item)}
            onQuickAdd={handleQuickAdd}
          />

          <CraftSection />

          <ReviewsSection />

          <LocationSection
            onOpenCartWithZone={(zoneId) => {
              setSelectedZoneId(zoneId);
              setCartOpen(true);
            }}
          />
        </main>

        <Footer />

        <BurgerModal
          item={selectedBurger}
          onClose={() => setSelectedBurger(null)}
          onAddToCart={addToCart}
        />

        <CartDrawer
          isOpen={cartOpen}
          onClose={() => setCartOpen(false)}
          items={cartItems}
          selectedZoneId={selectedZoneId}
          onChangeZoneId={setSelectedZoneId}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
          onClearCart={() => setCartItems([])}
        />
      </div>
    </MotionConfig>
  );
}
