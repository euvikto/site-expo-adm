const px = (id: number, w = 800, h = 1200) =>
  `/midia/imagens/foto-${id}-${w}x${h}.jpg`;

export type Product = {
  id: number;
  name: string;
  category: "Mulher" | "Homem" | "Bolsas";
  price: number;
  img: string;
  img2: string;
  tag?: string;
  desc: string;
};

export const IMG = {
  heroVideo: "/midia/videos/artmis-modelo.mp4",
  heroPoster: "/midia/imagens/artmis-modelo-capa.jpg",
  women: px(34769660, 1000, 1400),
  men: px(26903318, 1000, 1400),
  runway1: px(31648380, 1800, 1000),
  runway2: px(5185592, 1800, 1000),
  bags: px(34121562, 1000, 1400),
  story: px(14738813, 1000, 1400),
  storyB: px(21338240, 1000, 1400),
  menB: px(4651334, 1000, 1400),
};

export const products: Product[] = [
  { id: 1, name: "Vestido Envelope em Cetim", category: "Mulher", price: 18900, img: px(34769660), img2: px(17238334), tag: "Novo", desc: "Cetim de seda italiana com amarração lateral e caimento fluido. Feito à mão em Milão." },
  { id: 2, name: "Casaco Pelo Sintético Ancora", category: "Mulher", price: 32500, img: px(10356436), img2: px(21338240), tag: "Exclusivo", desc: "Casaco oversized em pelo sintético premium, forro em seda bordô ARTMIS." },
  { id: 3, name: "Vestido Noir com Luvas", category: "Mulher", price: 21400, img: px(9690414), img2: px(10147909), desc: "Silhueta escultural em crepe preto acompanhada de luvas longas em couro." },
  { id: 4, name: "Blazer Estruturado Camel", category: "Homem", price: 16800, img: px(3095442), img2: px(26903333), tag: "Novo", desc: "Lã virgem com ombros estruturados e botões em metal dourado gravado." },
  { id: 5, name: "Terno Noir Slim", category: "Homem", price: 24900, img: px(26903318), img2: px(13080473), desc: "Terno de alfaiataria em lã fria, corte slim e lapela de cetim." },
  { id: 6, name: "Conjunto Alfaiataria Duo", category: "Homem", price: 27300, img: px(4651334), img2: px(4651381), tag: "Desfile", desc: "Peça apresentada no desfile ARTMIS Primavera-Verão 2026." },
  { id: 7, name: "Bolsa ARTMIS Tote Marrom", category: "Bolsas", price: 19800, img: px(27174573, 800, 1000), img2: px(27174572, 800, 1000), tag: "Ícone", desc: "Couro granulado com alças em lona bege e fecho com o monograma ARTMIS." },
  { id: 8, name: "Bolsa Croco Mini", category: "Bolsas", price: 14200, img: px(27174572, 800, 1000), img2: px(27174573, 800, 1000), desc: "Couro com textura croco, alça de corrente removível." },
  { id: 9, name: "Bolsa Shoulder Verde", category: "Bolsas", price: 15600, img: px(27174571, 800, 1000), img2: px(27174565, 800, 1000), tag: "Novo", desc: "Alça transversal ajustável, interior em camurça." },
  { id: 10, name: "Bolsa Bicolor Textura", category: "Bolsas", price: 17100, img: px(27174565, 800, 1000), img2: px(27174571, 800, 1000), desc: "Bicolor branco e marrom em couro texturizado." },
  { id: 11, name: "Look Listrado Monocromo", category: "Mulher", price: 12900, img: px(17238334), img2: px(34769660), desc: "Conjunto em algodão listrado com recortes geométricos." },
  { id: 12, name: "Casaco Urbano Gelo", category: "Mulher", price: 29900, img: px(34121562), img2: px(38290951), desc: "Casaco longo com gola ampla e cinto. Acompanha bolsa em couro." },
];

export const brl = (n: number) =>
  n.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
