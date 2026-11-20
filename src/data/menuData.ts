export type MenuCategory = 'Todos' | 'Clássicos' | 'Duplos' | 'Acompanhamentos' | 'Bebidas';

export type MeatPoint = 'Ao ponto da casa' | 'Mal passado' | 'Bem passado';

export interface ExtraOption {
  id: string;
  label: string;
  price: number;
}

export interface MenuItem {
  id: string;
  name: string;
  category: Exclude<MenuCategory, 'Todos'>;
  description: string;
  price: number;
  image: string;
  specs: string;
  badge?: 'Mais Pedido' | 'Na Brasa' | 'Edição da Casa';
  allowMeatPoint?: boolean;
  availableExtras?: ExtraOption[];
}

export interface ReviewItem {
  id: string;
  author: string;
  initials: string;
  neighborhood: string;
  rating: number;
  date: string;
  comment: string;
  orderedItem: string;
}

export interface DeliveryZone {
  id: string;
  name: string;
  fee: number;
  eta: string;
}

export const BURGER_EXTRAS: ExtraOption[] = [
  { id: 'bacon-crocante', label: 'Bacon artesanal crocante', price: 6.5 },
  { id: 'cheddar-duplo', label: 'Queijo cheddar maturado duplo', price: 5.5 },
  { id: 'cebola-caramelizada', label: 'Cebola caramelizada na cerveja escura', price: 4.5 },
  { id: 'maionese-defumada', label: 'Maionese de alho assado na brasa', price: 3.5 },
  { id: 'blend-extra', label: 'Hambúrguer extra 180g na brasa', price: 14.0 },
];

export const SIDE_EXTRAS: ExtraOption[] = [
  { id: 'cheddar-bacon-pot', label: 'Cobertura de cheddar e bacon picado', price: 8.0 },
  { id: 'maionese-defumada', label: 'Pote extra maionese defumada', price: 3.5 },
];

export const HERO_IMAGE = '/src/assets/images/hero_moniz_brasa_1795213016278.jpg';
export const CRAFT_GRILL_IMAGE = '/src/assets/images/craft_open_flame_1795213017689.jpg';

export const MENU_CATEGORIES: MenuCategory[] = [
  'Todos',
  'Clássicos',
  'Duplos',
  'Acompanhamentos',
  'Bebidas',
];

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'moniz-classico',
    name: 'Moniz Clássico da Casa',
    category: 'Clássicos',
    description:
      'Blend bovino 180g grelhado no carvão vegetal, cheddar inglês derretido, alface americana crocante, tomate italiano e maionese defumada no brioche selado.',
    price: 34.9,
    image: '/src/assets/images/burger_classico_moniz_1795213016793.jpg',
    specs: '180g · Brioche Selado · 18 min',
    badge: 'Mais Pedido',
    allowMeatPoint: true,
    availableExtras: BURGER_EXTRAS,
  },
  {
    id: 'ceilandia-duplo-brasa',
    name: 'Ceilândia Duplo Brasa',
    category: 'Duplos',
    description:
      'Dois cortes de 140g prensados direto sobre a grelha em brasa viva, dupla camada de cheddar cremoso, tiras grossas de bacon defumado e cebola caramelizada.',
    price: 44.9,
    image: '/src/assets/images/burger_duplo_brasa_1795213016585.jpg',
    specs: '280g · Duplo Bacon · 22 min',
    badge: 'Na Brasa',
    allowMeatPoint: true,
    availableExtras: BURGER_EXTRAS,
  },
  {
    id: 'moniz-provolone-bbq',
    name: 'Defumado Provolone & Crispy',
    category: 'Clássicos',
    description:
      'Hambúrguer alto de 180g defumado na lenha frutífera, queijo provolone maçaricado, cebola crispy artesanal, rúcula fresca e barbecue de rapadura.',
    price: 38.9,
    image: '/src/assets/images/burger_defumado_especial_1795213016774.jpg',
    specs: '180g · Provolone Maçaricado · 20 min',
    badge: 'Edição da Casa',
    allowMeatPoint: true,
    availableExtras: BURGER_EXTRAS,
  },
  {
    id: 'monstro-qnn-duplo',
    name: 'Moniz QNN Duplo Bacon',
    category: 'Duplos',
    description:
      'Dois blends suculentos de 180g (360g totais), queijo prato e cheddar duplo, bacon curado na casa, picles de pepino agridoce e molho da brasa.',
    price: 48.9,
    image: '/src/assets/images/hero_moniz_brasa_1795213016278.jpg',
    specs: '360g · Pão Australiano ou Brioche · 24 min',
    badge: 'Mais Pedido',
    allowMeatPoint: true,
    availableExtras: BURGER_EXTRAS,
  },
  {
    id: 'smash-fogo-cerrado',
    name: 'Brasa Duplo Cerrado',
    category: 'Duplos',
    description:
      'Duas carnes de 120g com crosta caramelizada na brasa forte, queijo coalho tostado, geleia de pimenta biquinho artesanal e maionese de alho assado.',
    price: 42.9,
    image: '/src/assets/images/burger_duplo_brasa_1795213016585.jpg',
    specs: '240g · Queijo Coalho · 20 min',
    badge: 'Na Brasa',
    allowMeatPoint: false,
    availableExtras: BURGER_EXTRAS,
  },
  {
    id: 'moniz-salad-especial',
    name: 'Brioche Alho & Rúcula',
    category: 'Clássicos',
    description:
      'Blend bovino 180g ao ponto, queijo mussarela especial derretido, folhas de rúcula, cebola roxa marinada e creme de alho tostado no carvão.',
    price: 35.9,
    image: '/src/assets/images/burger_classico_moniz_1795213016793.jpg',
    specs: '180g · Creme de Alho · 18 min',
    allowMeatPoint: true,
    availableExtras: BURGER_EXTRAS,
  },
  {
    id: 'batata-rustica-brasa',
    name: 'Batata Rústica com Páprica',
    category: 'Acompanhamentos',
    description:
      'Batatas cortadas à mão com casca, fritas até ficarem douradas e crocantes, finalizadas com páprica defumada, alecrim fresco, flor de sal e aioli da casa.',
    price: 22.9,
    image: '/src/assets/images/sides_rustic_fries_1795213016520.jpg',
    specs: '320g · Acompanha Aioli · 12 min',
    badge: 'Mais Pedido',
    allowMeatPoint: false,
    availableExtras: SIDE_EXTRAS,
  },
  {
    id: 'batata-cheddar-bacon',
    name: 'Batata Rústica Cheddar & Bacon',
    category: 'Acompanhamentos',
    description:
      'Porção generosa de batatas rústicas crocantes cobertas com creme quente de cheddar maturado e cubos de bacon artesanal defumado.',
    price: 29.9,
    image: '/src/assets/images/sides_rustic_fries_1795213016520.jpg',
    specs: '400g · Serve 2 pessoas · 14 min',
    allowMeatPoint: false,
    availableExtras: SIDE_EXTRAS,
  },
  {
    id: 'refrigerante-artesanal-limao',
    name: 'Soda Italiana de Limão Siciliano',
    category: 'Bebidas',
    description:
      'Preparada na hora com suco natural de limão siciliano, xarope artesanal de capim-santo, água com gás bem gelada e gelo cristalino.',
    price: 13.9,
    image: '/src/assets/images/sides_rustic_fries_1795213016520.jpg',
    specs: '400ml · Gelada na hora · 5 min',
    allowMeatPoint: false,
  },
  {
    id: 'guarana-coca-lata',
    name: 'Refrigerante Lata Gelado',
    category: 'Bebidas',
    description:
      'Coca-Cola Original, Coca-Cola Sem Açúcar ou Guaraná Antarctica servidos bem gelados para acompanhar o burger na brasa.',
    price: 7.5,
    image: '/src/assets/images/burger_classico_moniz_1795213016793.jpg',
    specs: '350ml · Lata trincando · 2 min',
    allowMeatPoint: false,
  },
];

export const CRAFT_PILLARS = [
  {
    number: '01',
    title: 'Blend Bovino Moído Diariamente',
    description:
      'Selecionamos cortes frescos de acém e peito com 22% de gordura nobre, moídos todas as tardes sem conservantes para garantir suculência real.',
    detail: '180g por corte · Sem congelamento',
  },
  {
    number: '02',
    title: 'Brasa de Carvão Vegetal a 380 °C',
    description:
      'Nada de chapa elétrica. Cada hambúrguer sela diretamente sobre grelha de ferro fundido e carvão aceso, criando crosta caramelizada e aroma defumado.',
    detail: 'Grelha de ferro · Carvão de eucalipto',
  },
  {
    number: '03',
    title: 'Brioche Selado & Molhos da Casa',
    description:
      'Pão brioche amanteigado selado na manteiga de garrafa segundos antes da montagem, acompanhado de maionese de alho assado e barbecue de rapadura.',
    detail: 'Produção noturna · Receita autoral',
  },
];

export const REVIEWS: ReviewItem[] = [
  {
    id: 'rev-1',
    author: 'Lucas Mendes',
    initials: 'LM',
    neighborhood: 'Ceilândia Sul',
    rating: 5,
    date: 'Há 3 dias',
    comment:
      'O gosto de brasa de verdade faz toda diferença. Pedi o Ceilândia Duplo Brasa para entrega e chegou quente, pão intacto e bacon bem crocante.',
    orderedItem: 'Ceilândia Duplo Brasa',
  },
  {
    id: 'rev-2',
    author: 'Camila Ferreira',
    initials: 'CF',
    neighborhood: 'Ceilândia Norte',
    rating: 5,
    date: 'Há 1 semana',
    comment:
      'Melhor hambúrguer artesanal da QNN. A carne veio exatamente ao ponto que eu pedi e a maionese de alho assado com a batata rústica é viciante.',
    orderedItem: 'Moniz Clássico da Casa',
  },
  {
    id: 'rev-3',
    author: 'Rafael Oliveira',
    initials: 'RO',
    neighborhood: 'Taguatinga Norte',
    rating: 4,
    date: 'Há 2 semanas',
    comment:
      'Retirei no balcão em 18 minutos numa sexta à noite. Ambiente bem cuidado, atendimento direto e o Defumado Provolone vale cada centavo.',
    orderedItem: 'Defumado Provolone & Crispy',
  },
];

export const RATING_BREAKDOWN = [
  { stars: 5, percent: 68 },
  { stars: 4, percent: 21 },
  { stars: 3, percent: 7 },
  { stars: 2, percent: 3 },
  { stars: 1, percent: 1 },
];

export const DELIVERY_ZONES: DeliveryZone[] = [
  { id: 'ceilandia-sul', name: 'Ceilândia Sul & Centro', fee: 5.0, eta: '25–35 min' },
  { id: 'ceilandia-norte', name: 'Ceilândia Norte & P Sul', fee: 6.5, eta: '30–40 min' },
  { id: 'taguatinga', name: 'Taguatinga Norte / Sul', fee: 8.5, eta: '35–45 min' },
  { id: 'samambaia', name: 'Samambaia & Sol Nascente', fee: 9.0, eta: '40–50 min' },
  { id: 'aguas-claras', name: 'Águas Claras & Vicente Pires', fee: 11.0, eta: '45–55 min' },
];

export const STORE_INFO = {
  brand: 'Moniz Burger Artesanal',
  address: 'QNN 14 Conjunto A, Loja 04 — Ceilândia, Brasília - DF',
  cep: 'CEP 72220-141',
  hours: 'Terça a Domingo · 18h30 às 23h45',
  phone: '(61) 99842-3190',
  averageRating: 4.4,
  totalReviews: 318,
  freeDeliveryThreshold: 90,
};
