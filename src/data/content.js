export const site = {
  heroBackground: "/images/H 3.png",
  heroBackgroundPosition: "center 40%",
};

// ─── LIVROS ───────────────────────────────────────────────────────────────────
export const books = [
  {
    id: "the-storm-fall",
    slug: "the-storm-fall",
    title: "The Storm Fall",
    subtitle: "A Queda da Tempestade",
    series: "A Writer's Story — Vol. I",
    genre: "Ação · Aventura · Fantasia",
    // Atualizar com sua sinopse final
    synopsis: `Quando o pior pesadelo de Gustavo cai do céu, leva seu chão junto.

Arrancado da própria vida ao lado de outros cinco que também nunca pediram por isso, ele precisa carregar o peso do mundo através do tempo, atrás dos treze Fragmentos da Joia do Éden.

Cada era é uma história que já estava sendo escrita antes de eles chegarem. Eles caem no meio das páginas, sem conhecer o começo, sem direito ao fim. Ali, não são heróis. São intrusos.

Quanto mais fundo ele mergulha, mais perto está de se afogar. E nem toda ferida dessa jornada fica no corpo. Algumas ele vai carregar muito depois da última batalha. Mas é no fundo que ele encontra a única coisa pela qual vale a pena voltar à superfície.

O pesadelo os espera no fim. E dessa vez, acordar não é uma opção.`,
    available: false,
    status: "Em breve",
    buyLink: null, // substituir pelo link real
    cover: "/images/books/Frente Capa TSF.jpg", // substituir pelo caminho real
    coverAlt: "Capa de The Storm Fall",
    accentColor: "#A2C4E0", // azul gelo do universo TSF
    heroBackground: "/images/chars/eu.png",
    heroBackgroundPosition: "center 32%",
    emotional: {
      quote:
        "Você já sentiu que carrega um peso que ninguém mais consegue ver?",
      description:
        "Gustavo sentia isso todas as noites. Até descobrir que o peso era real — e que ele não estava mais sozinho nisso.",
    },
    // Artes da seção "Arte & universo": src é o caminho da imagem,
    // alt descreve a imagem pra quem usa leitor de tela
    gallery: [
      {
        src: "/images/herosection/sc/tsf/H 3.png",
        alt: "O Localizador sendo ativado, cercado de luzes azuis",
      },
      {
        src: "/images/books/Frente Capa TSF.jpg",
        alt: "Capa de The Storm Fall",
      },
    ],
    reasons: [
      {
        icon: "∞",
        title: "Universo em expansão",
        desc: "The Storm Fall é o primeiro de uma saga. Cada compra é a porta de entrada para algo maior.",
      },
      {
        icon: "◈",
        title: "Livro + jogo",
        desc: "A mesma história em dois formatos. Ler e jogar são experiências diferentes do mesmo universo.",
      },
      {
        icon: "◎",
        title: "Direto do autor",
        desc: "Sem editora no meio. Seu dinheiro vai direto para a próxima parte da história.",
      },
      {
        icon: "◇",
        title: "Universo em construção",
        desc: "Você não está comprando um produto acabado. Está entrando enquanto ainda está sendo feito.",
      },
      {
        icon: "✦",
        title: "Experiência completa",
        desc: "Você receberá brindes exclusivos, acesso antecipado a capítulos e novidades do universo, e mídias extras que não estão no livro.",
      },
    ],
    author: {
      name: "Gustavo — Saint Cat",
      image: "/images/Profile Picture.png",
      bio: [
        "The Storm Fall começou como um roteiro de jogo. Sem o computador pra programar, o roteiro virou livro. Agora, finalmente, os dois acontecem ao mesmo tempo.",
        "Designer, ilustrador e desenvolvedor. A Writer's Story é uma saga de livros com enredo completo já arquitetado.",
      ],
    },
    prologue: {
      available: true,
      heading: "Comece agora. Sem compromisso.",
      description:
        "O prólogo completo está disponível. Leia antes de decidir qualquer coisa.",
      title: "Prólogo",
      pdfUrl: "/prologues/The Storm Fall - 2ª Ed. (Prólogo).pdf",
    },
  },
/*
  {
    id: "the-mystic",
    slug: "the-mystic",
    title: "The Mystic",
    subtitle: "O Místico",
    series: "A Writer's Story — Vol. II",
    genre: "Terror · Investigação Policial · Fantasia",
    synopsis: `Sinopse do livro The Mystic ainda não disponível.`,
    available: false,
    status: "Em desenvolvimento",
    buyLink: null, // substituir pelo link real
    cover: "/images/books/Capa TM.png", // substituir pelo caminho real
    coverAlt: "Capa de The Mystic",
    accentColor: "#4A90E2", // azul do universo TM
    heroBackground: "/images/books/Capa TM.png",
    heroBackgroundPosition: "center 36%",
    emotional: null,
    gallery: [],
    reasons: [],
    author: {
      name: "Gustavo — Saint Cat",
      image: "/images/Profile Picture.png",
      bio: [
        "Designer, ilustrador e desenvolvedor. A Writer's Story é uma saga de livros com enredo completo já arquitetado.",
      ],
    },
    prologue: {
      available: false,
      pdfUrl: null,
    },
  },
  */
  // Adicionar próximos volumes aqui
];

// ─── JOGOS ────────────────────────────────────────────────────────────────────
export const games = [
  {
    id: "tsf-game",
    localizador: true, // mostra o Localizador 3D no lugar da arte do jogo
    slug: "the-storm-fall-game",
    bookId: "the-storm-fall",
    title: "The Storm Fall",
    subtitle: "O Jogo",
    genre: "Ação-Aventura",
    description:
      "A mesma história, vivida de dentro. Ação-aventura na linha de Uncharted, com os personagens e o universo do livro.",
    available: true,
    status: "Em desenvolvimento",
    cover: null,
    heroBackground: "/images/chars/eu.png",
    heroBackgroundPosition: "center",
    accentColor: "#F2BE42",
    reasons: [],
  },
];

// ─── PERSONAGENS ──────────────────────────────────────────────────────────────
export const characters = [
  {
    id: "gustavo",
    name: "Gustavo",
    role: "Protagonista",
    essence: "A espada não pesa nada pra ele. O que ele faz com ela, sim.",
    image: "/images/chars/eu.png",
    bookIds: ["the-storm-fall"],
    gameIds: [],
  },
  {
    id: "carol",
    name: "Carol",
    role: "",
    essence: "Mudar de vida foi fácil. Difícil é largar quem ela precisou ser pra sobreviver.",
    image: "/images/chars/carol.png",
    bookIds: ["the-storm-fall"],
    gameIds: [],
  },
  {
    id: "hudson",
    name: "Hudson",
    role: "",
    essence: "Hoje ele nota tudo. Teme o que um dia deixou passar.",
    image: "/images/chars/H.png",
    fragment: 9,
    bookIds: ["the-storm-fall"],
    gameIds: [],
  },
  {
    id: "dayllon",
    name: "Dayllon",
    role: "",
    essence: "Ele sempre foi o melhor. Ninguém perguntou se ele queria ser.",
    image: "/images/chars/dayllon.png",
    bookIds: ["the-storm-fall"],
    gameIds: [],
  },
  {
    id: "ana",
    name: "Ana",
    role: "",
    essence: "Aprendeu a pedir desculpa pela própria dor.",
    image: "/images/chars/ana.png",
    bookIds: ["the-storm-fall"],
    gameIds: [],
  },
  {
    id: "laura",
    name: "Laura",
    role: "",
    essence: "Agir ou não agir? Ela já fez os dois e não sabe qual foi pior.",
    image: "/images/chars/laura.png",
    bookIds: ["the-storm-fall"],
    gameIds: [],
  },
  {
    id: "aidan",
    name: "Aidan",
    role: "",
    essence: "Está disposto a tudo para salvar que ama. Tudo.",
    image: "/images/chars/aidan.png",
    bookIds: ["the-mystic"],
    gameIds: [],
  },
  {
    id: "jim",
    name: "Jim",
    role: "",
    essence: "Um pai que fará de tudo por sua família.",
    image: "/images/chars/jim.png",
    bookIds: ["the-mystic"],
    gameIds: [],
  },
];

// ─── AVALIAÇÕES ───────────────────────────────────────────────────────────────
export const reviews = [
  {
    id: 1,
    text: `Cada capítulo é mais interessante que o outro. E logo no começo já teve uma personagem que ganhou meu coração: a mais divertida de todas, e que virou minha favorita sem esforço nenhum. Eu recomendo muito para quem gosta de mistério, aventura e fantasia.`,
    author: "Ângela Carioca",
    age: 19,
    context: "Leitora da 1ª edição",
    bookId: "the-storm-fall",
  },
];

// ─── PROGRESSO ────────────────────────────────────────────────────────────────
export const progress = {
  books: {
    "the-storm-fall": {
      label: "The Storm Fall — 2ª Edição",
      percent: 15, // atualizar conforme avança
      status: "Escrevendo o 1º Capítulo.",
      updatedAt: "Out 2026",
    },

  },
  games: {
    "tsf-game": {
      label: "TSF — Jogo",
      items: [
        { label: "Modelagem: Gustavo", done: true },
        { label: "Modelagem: Gancho", done: true },
        { label: "Modelagem: Localizador", done: true, fragment: 3 },
        { label: "Sistema de gancho", done: false, detail: "~60%" },
        // Adicionar mais conforme avança
      ],
      updatedAt: "Out 2026",
    },
  },
};

// ─── FAQ ──────────────────────────────────────────────────────────────────────
export const faq = [
  {
    q: "Quando o livro vai sair?",
    a: "Estamos na revisão da segunda edição. Não tem data fechada — queremos entregar a versão certa, não a mais rápida. Deixa seu e-mail e você é o primeiro a saber.",
    bookIds: ["the-storm-fall"],
  },
  {
    q: "Vai ter versão digital?",
    a: "Sim. O livro vai estar disponível nos dois formatos.",
    bookIds: ["the-storm-fall"],
  },
  {
    q: "O universo tem mais livros planejados?",
    fragment: 11,
    a: "A Writer's Story é uma saga de 8 livros. The Storm Fall é o primeiro. The Mystic, o segundo, já está em desenvolvimento.",
    bookIds: ["the-storm-fall", "the-mystic"],
  },
  {
    q: "O jogo vai lançar junto com o livro?",
    a: "Não necessariamente. São projetos paralelos — o livro vem primeiro.",
    bookIds: ["the-storm-fall"],
    gameIds: ["tsf-game"],
  },
];

// ─── NOVIDADES ────────────────────────────────────────────────────────────────
export const news = [
  {
    id: 1,
    date: "Out 2026",
    tag: "Jogo",
    text: "Sistema de gancho chegando a 60% de conclusão.",
    gameId: "tsf-game",
  },
  {
    id: 2,
    date: "Set 2026",
    tag: "Jogo",
    text: "Modelagem do personagem principal finalizada.",
    gameId: "tsf-game",
  },
  {
    id: 3,
    date: "Ago 2026",
    tag: "Livro",
    text: "Escrita do capítulo 1 de The Storm Fall.",
    fragment: 4,
    bookId: "the-storm-fall",
  },
];
