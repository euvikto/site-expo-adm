const px = (id: number, w = 800, h = 1200) =>
  `/midia/imagens/foto-${id}-${w}x${h}.jpg`;

export type Product = {
  id: number;
  name: string;
  category: "Mulher" | "Homem" | "Bolsas" | "Decoração";
  price: number;
  img: string;
  img2: string;
  tag?: string;
  desc: string;
};

export const IMG = {
  heroVideo: "/midia/videos/artmis-modelo.mp4",
  heroPoster: "/midia/imagens/artmis-modelo-capa.jpg",
  women: "/midia/imagens/artmis-mulher.png",
  men: "/midia/imagens/artmis-homem.png",
  runway1: "/midia/imagens/artmis-desfile.png",
  runway2: px(5185592, 1800, 1000),
  bags: px(34121562, 1000, 1400),
  story: px(14738813, 1000, 1400),
  storyB: px(21338240, 1000, 1400),
  menB: px(4651334, 1000, 1400),
};

// Catálogo fictício: preços ilustrativos em reais para o projeto escolar.
export const products: Product[] = [
  {
    "id": 1,
    "name": "Vestido Escultural de Jornal",
    "category": "Mulher",
    "price": 890,
    "img": "/midia/imagens/produtos/vestido-jornal.png",
    "img2": "/midia/imagens/produtos/vestido-jornal.png",
    "tag": "Conceito",
    "desc": "Criação conceitual com recortes de jornal, volumes assimétricos e saia longa com cauda. Uma proposta de moda artística inspirada no reaproveitamento."
  },
  {
    "id": 2,
    "name": "Saia de Retalhos com Laço",
    "category": "Mulher",
    "price": 249,
    "img": "/midia/imagens/produtos/saia-retalhos.png",
    "img2": "/midia/imagens/produtos/saia-retalhos.png",
    "tag": "Novo",
    "desc": "Saia curta com sobreposição de retalhos e rendas em tons suaves, finalizada por um laço acetinado na cintura."
  },
  {
    "id": 3,
    "name": "Corselet Jeans com Flores",
    "category": "Mulher",
    "price": 329,
    "img": "/midia/imagens/produtos/corselet-jeans.png",
    "img2": "/midia/imagens/produtos/corselet-jeans.png",
    "tag": "Destaque",
    "desc": "Corselet tomara que caia em patchwork de jeans, com barra em ponta e aplicações florais em diferentes tons de azul."
  },
  {
    "id": 4,
    "name": "Colete de Tampinhas Coloridas",
    "category": "Homem",
    "price": 289,
    "img": "/midia/imagens/produtos/colete-tampinhas.png",
    "img2": "/midia/imagens/produtos/colete-tampinhas.png",
    "tag": "Conceito",
    "desc": "Colete aberto de inspiração experimental, composto por tampinhas metálicas conectadas. Uma peça conceitual para sobrepor ao look."
  },
  {
    "id": 5,
    "name": "Blazer com Mosaico de CDs",
    "category": "Homem",
    "price": 459,
    "img": "/midia/imagens/produtos/blazer-cds.png",
    "img2": "/midia/imagens/produtos/blazer-cds.png",
    "tag": "Destaque",
    "desc": "Blazer preto com aplicação de CDs inteiros e fragmentos espelhados nas costas, criando um mosaico de reflexos."
  },
  {
    "id": 6,
    "name": "Lustre Cascata de Lacres",
    "category": "Decoração",
    "price": 389,
    "img": "/midia/imagens/produtos/lustre-lacres.png",
    "img2": "/midia/imagens/produtos/lustre-lacres.png",
    "tag": "Novo",
    "desc": "Lustre decorativo em formato de cascata, com fileiras de lacres metálicos e estrutura suspensa. Lâmpada não inclusa."
  },
  {
    "id": 7,
    "name": "Sobreposição de Contas e Franjas",
    "category": "Mulher",
    "price": 219,
    "img": "/midia/imagens/produtos/saia-contas.png",
    "img2": "/midia/imagens/produtos/saia-contas.png",
    "tag": "Artesanal",
    "desc": "Sobreposição curta em trama de contas marrons, com desenhos em losango e franjas longas. A peça de base e os acessórios não acompanham."
  },
  {
    "id": 8,
    "name": "Corselet de Palha Trançada",
    "category": "Mulher",
    "price": 349,
    "img": "/midia/imagens/produtos/corselet-palha.png",
    "img2": "/midia/imagens/produtos/corselet-palha.png",
    "tag": "Artesanal",
    "desc": "Corselet de trama entrelaçada em tom natural, com detalhe circular no decote e acabamento de franjas na barra."
  },
  {
    "id": 9,
    "name": "Calça Patchwork de Tramas",
    "category": "Homem",
    "price": 399,
    "img": "/midia/imagens/produtos/calca-patchwork.png",
    "img2": "/midia/imagens/produtos/calca-patchwork.png",
    "tag": "Destaque",
    "desc": "Peça de cintura estruturada com painéis têxteis multicoloridos, tramas aparentes e franjas. O patchwork é o destaque da composição."
  },
  {
    "id": 10,
    "name": "Regata de Crochê Verde Bordada",
    "category": "Homem",
    "price": 279,
    "img": "/midia/imagens/produtos/regata-verde.png",
    "img2": "/midia/imagens/produtos/regata-verde.png",
    "tag": "Novo",
    "desc": "Regata verde em trama aberta de crochê, com aplicações coloridas de formas florais e geométricas. Parte de baixo não inclusa."
  },
  {
    "id": 11,
    "name": "Regata de Renda com Formas Orgânicas",
    "category": "Homem",
    "price": 259,
    "img": "/midia/imagens/produtos/regata-renda.png",
    "img2": "/midia/imagens/produtos/regata-renda.png",
    "tag": "Artesanal",
    "desc": "Regata clara de alças finas, com desenho vazado de curvas e círculos e barra irregular. Short não incluso."
  },
  {
    "id": 12,
    "name": "Bolsa Trançada Multicolorida",
    "category": "Bolsas",
    "price": 299,
    "img": "/midia/imagens/produtos/bolsa-trancada.png",
    "img2": "/midia/imagens/produtos/bolsa-trancada.png",
    "tag": "Artesanal",
    "desc": "Bolsa ampla com tiras têxteis multicoloridas entrelaçadas e alça larga. O valor corresponde apenas à bolsa; roupa e gorro não inclusos."
  }
];

export const brl = (n: number) =>
  n.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
