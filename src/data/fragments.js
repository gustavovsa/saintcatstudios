// ─── FRAGMENTOS ───────────────────────────────────────────────────────────────
// 13 fragmentos escondidos pelo site. O id é o que liga o texto ao lugar
// onde o brilho aparece (o comentário de cada um diz onde está).
// Pra textos com parágrafos, troque as aspas por crases (`) e pule uma linha.
export const fragments = [
  {
    id: 1, // Home — Hero
    title: "Fragmento I",
    text: `Os que rezavam mais alto eram os que mais caçavam.
E a presa tinha duas vozes:
uma implorava perdão,
a outra ria baixinho.`,
  },
  {
    id: 2, // Home — capa de The Storm Fall
    title: "Fragmento II",
    text: `Desde pequenos, aprendemos que quem sorri é bom.
Mas até o mar tem criaturas que sorriem enquanto matam.
Alguns monstros não se escondem nas sombras,
e a inocência é a primeira coisa que levam.`,
  },
  {
    id: 3, // Home — Jogos, item "Modelagem: Localizador"
    title: "Fragmento III",
    text: `Escutai: houve um tempo cujo nome a terra prefere esquecer.
Dele restou apenas a pedra, e a pedra se lembra.
Quando ela desperta, desperta inteira,
e aos seus pés floresce a única cura que restou.`,
  },
  {
    id: 4, // Home — novidade mais antiga
    title: "Fragmento IV",
    text: `Um deles amava uma bandeira mais do que qualquer homem.
O outro esqueceu quem era,
até aprender a ser quem mandaram.
Há prisões que não precisam de grades.`,
  },
  {
    id: 5, // Rodapé (todas as páginas)
    title: "Fragmento V",
    text: `Também recebi uma missão, um dia.
Fui mais longe do que deveria,
e algo que não era eu aprendeu a usar minhas mãos.
Hoje o trovão me obedece, e não sobrou ninguém ao meu lado para ouvi-lo.`,
  },
  {
    id: 6, // Livro — brilho atrás da capa
    title: "Fragmento VI",
    text: `Algumas portas só se abrem por dentro.
Atrás delas está tudo o que você deixou para trás,
esperando, com paciência,
que você tenha coragem de olhar.`,
  },
  {
    id: 7, // Livro — fim da sinopse
    title: "Fragmento VII",
    text: `Um não existe sem o outro.
Quando um brilha, o outro se esconde,
e quando enfim se encontram,
o mundo inteiro escurece por um instante.`,
  },
  {
    id: 8, // Livro — pergunta da seção emocional
    title: "Fragmento VIII",
    text: `Ali, o céu deixou de ser abrigo.
Crianças contavam os segundos entre o assobio e o estrondo,
e homens comuns faziam o imperdoável
porque alguém, de uniforme, mandou.`,
  },
  {
    id: 9, // Livro — card do Hudson
    title: "Fragmento IX",
    text: `Há perguntas que a gente passa a vida evitando.
E respostas que, uma vez ouvidas,
mudam o sentido de tudo o que veio antes.
Algumas coisas vivem tempo demais para esquecer.`,
  },
  {
    id: 10, // Livro — aspas do depoimento
    title: "Fragmento X",
    text: `Há homens que nunca escolheram estar a bordo.
E há quem escolheu, e mesmo assim afundou o navio.
Nenhum casco racha de uma vez:
a primeira fenda sempre começa por dentro.`,
  },
  {
    id: 11, // Livro — resposta do FAQ sobre a saga
    title: "Fragmento XI",
    text: `Há trilhos que levam a qualquer lugar, menos de volta.
Se cada passo já estava escrito,
de quem é a mão que segura a lâmina?
Algumas linhas só se cruzam uma vez.`,
  },
  {
    id: 12, // Leitura — cabeçalho do prólogo
    title: "Fragmento XII",
    text: `Algumas lembranças não ficam no passado:
giram, giram, e voltam sempre ao mesmo ponto.
Entre luzes que mentem e sorrisos que mordem,
alguém finalmente precisa descer.`,
  },
  {
    id: 13, // Leitura — fim da página
    title: "Fragmento XIII",
    text: `Toda culpa tem um endereço.
Alguns passam a vida fugindo dele,
outros, um dia, voltam para bater à porta.
Do outro lado, alguém espera há muito tempo.`,
  },
];

// ─── LOCALIZADOR ──────────────────────────────────────────────────────────────
// A página /localizado, pra onde o Localizador teletransporta quem encontrou
// os 13 fragmentos. Lá a pessoa deixa o e-mail pra receber as novidades.
// Atenção: tudo aqui fica visível no código do site — quem souber olhar
// chega na página sem achar os fragmentos. Nada de cupom valioso aqui.
export const localizadorReward = {
  title: "Você foi localizado",
  text: "[Escreva aqui o que a pessoa lê ao chegar do outro lado]",
  perks: [
    "Novidades antes de todo mundo",
    "Chance de ser leitor beta dos próximos livros",
    "Testar o jogo antes do lançamento",
  ],
};

// Pra onde o formulário manda o e-mail (MailerLite, Brevo, Google Forms...).
// Enquanto action for null, a página mostra que as inscrições abrem em breve.
export const localizadorSignup = {
  action: null, // URL de envio do formulário do serviço de e-mail
  emailField: "email", // nome do campo de e-mail que o serviço espera
  privacy:
    "Seu e-mail só é usado pra mandar novidades da Saint Cat Studios. Dá pra sair da lista quando quiser.",
};
