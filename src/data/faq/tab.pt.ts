import imgIcon from 'src/assests/imgFaq/icon.webp';
import imgUpdate from 'src/assests/imgFaq/imgUpdate.png';

import type { Tabs } from './tab';

type TabContents = Tabs[];

// Mesma ordem e mesma quantidade de itens por categoria do tab.ts (inglês).
export const tabContents: TabContents[] = [
  [
    {
      titleTab: 'Informações sobre a listagem e o lançamento do jogo',
      text: `03:00 UTC (10:00 GMT+7) de 22 de setembro: listagem na PancakeSwap
    <br />  
    30 de setembro de 2021: lançamento do jogo na web `,
    },
    {
      titleTab: 'Quantos tipos de token o jogo tem?',
      text: `O jogo terá apenas 1 token: BCOIN <br /> Endereço oficial do contrato da BCOIN: <strong>0x00e1656e45f18ec6747F5a8496Fd39B50b38396D</strong> `,
    },
    {
      titleTab: 'Em qual plataforma o Bomb Crypto será lançado?',
      text: 'PC (jogo na web), com login pela MetaMask (usando a rede BSC)',
    },
    {
      titleTab: 'Qual é o preço inicial na PancakeSwap?',
      text: 'O preço inicial na listagem da PancakeSwap será de 1 BCOIN = 0,1 BUSD.',
    },
    {
      titleTab: 'Quanto custa para começar a jogar?',
      text: 'O custo inicial para entrar no jogo é de 10 BCOIN (o mesmo que comprar 1 herói Bomber)',
    },
    {
      titleTab: 'Por que alguns heróis recuperam energia devagar?',
      text: `Quanto maior a raridade do herói, maior a barra de energia que ele guarda, então mais tempo ele leva para recuperar. Sem casa, a recuperação é de 0,5 de energia por minuto <br> 
Quanto maior a stamina do herói, maior a reserva de energia. <br> 
1 de stamina = 50 de energia `,
    },
    {
      titleTab: 'Às vezes a taxa de gás chega a 0,4 BNB, o que eu faço?',
      text: 'Atualize o site e faça a transação normalmente. Recuse a transação quando a taxa de gás for de 0,4 BNB',
    },
    {
      titleTab: 'Quando posso sacar BCOIN e resgatar heróis?',
      text: `Você pode sacar quando minerar 40 BCOIN, e precisa ter pelo menos 1 BCOIN na carteira <br> 
Você pode resgatar um herói quando houver um herói para resgatar. Além disso, o baú precisa ter o herói e é preciso ter espaço, sem passar de 500 heróis.`,
    },
    {
      titleTab:
        'Meus heróis travaram e não quebram nada, mesmo tendo blocos no mapa?',
      text: 'Basta voltar ao menu principal e entrar de novo no modo Treasure Hunt.',
    },
    {
      titleTab: 'Comprei o herói com sucesso mas não recebi, o que eu faço?',
      text: `- Atualize a página do jogo. <img src=${imgIcon} width={${25}} height={{${25}}} /> <br>  no menu de cima e clique em resgatar herói`,
    },
    {
      titleTab: 'O carregamento para em 10%, o que eu faço?',
      text: 'Atualize a página, limpe o cache e repita algumas vezes até conseguir entrar no jogo.',
    },
    {
      titleTab:
        'Saquei herói/BCOIN e a transação aparece com sucesso no report https://report.bombcrypto.io/, mas não recebi',
      text: `BCOIN: <br> 1. Se o saque falhou. <br>  >> Vá ao site de Report <a href="https://report.bombcrypto.io/" target="_blank">(https://report.bombcrypto.io/)</a>  para tentar de novo. Se você não tentar de novo em até 24 horas, nós tentamos automaticamente para você e a BCOIN volta para a sua carteira. <br> <br> 2. Se o saque deu certo, mas ainda não chegou <br> >> Nós processamos automaticamente em até 24 horas e a BCOIN volta para a sua carteira. <br> <br>  BHERO: <br> O saque falhou ou deu certo mas não chegou: <br> => Espere até 24 horas e depois vá ao site de Report (https://report.bombcrypto.io/hero) <br> e conecte a carteira para receber o herói de volta. `,
    },
    {
      titleTab: 'O herói recupera energia quando está inativo?',
      text: 'Heróis não recuperam energia enquanto estão inativos. Quando inativos, eles também mantêm o nível de energia que já têm.',
    },
    {
      titleTab: 'Existe um limite de casas no jogo?',
      text: 'Hoje o número de casas no jogo é limitado a apenas 5000.',
    },
    {
      titleTab:
        'Para vencer, o jogo usa a habilidade do jogador ou os atributos do personagem?',
      text: `A fase 1 tem só um modo, o Treasure Hunt, em que você minera BCOIN com os heróis Bomber. O PvP na fase 4 vai deixar os jogadores usarem mais a própria habilidade. <br> Mas ainda precisamos de tempo para entender o que os jogadores preferem antes de decidir como será o PvP. `,
    },
    {
      titleTab: 'É obrigatório comprar uma casa para o herói Bomber?',
      text: 'Não é obrigatório. Sem casa, o herói Bomber descansa e recupera energia mais devagar.',
    },
    {
      titleTab: 'O Bomb Crypto pretende melhorar os gráficos?',
      text: 'Os gráficos vão melhorando aos poucos, mas mantendo o estilo pixel clássico.',
    },
    {
      titleTab: 'A quantidade de heróis Bomber é limitada?',
      text: 'Precisamos de um tempo para analisar os dados dos jogadores no jogo e só então decidir se vamos limitar os heróis Bomber.',
    },
    {
      titleTab: 'Quantos heróis posso ter no máximo?',
      text: 'Uma conta pode ter 500 heróis, e no jogo 15 heróis podem minerar ao mesmo tempo',
    },
    {
      titleTab: 'Posso transferir meus heróis / casas para outra carteira?',
      text: `Não. Mas em breve teremos o Marketplace para comprar/vender heróis e casas, no 4º trimestre de 2021.`,
    },
  ],
  [
    {
      titleTab: 'Informações sobre a listagem e o lançamento do jogo',
      text: `03:00 UTC (10:00 GMT+7) de 22 de setembro: listagem na PancakeSwap
    <br />  
    30 de setembro de 2021: lançamento do jogo na web `,
    },
    {
      titleTab: 'Quantos tipos de token o jogo tem?',
      text: `O jogo terá apenas 1 token: BCOIN <br /> Endereço oficial do contrato da BCOIN: <strong>0x00e1656e45f18ec6747F5a8496Fd39B50b38396D</strong> `,
    },
    {
      titleTab: 'Em qual plataforma o Bomb Crypto será lançado?',
      text: 'PC (jogo na web), com login pela MetaMask (usando a rede BSC)',
    },
    {
      titleTab: 'Qual é o preço inicial na PancakeSwap?',
      text: 'O preço inicial na listagem da PancakeSwap será de 1 BCOIN = 0,1 BUSD.',
    },
    {
      titleTab: 'Quanto custa para começar a jogar?',
      text: 'O custo inicial para entrar no jogo é de 10 BCOIN (o mesmo que comprar 1 herói Bomber)',
    },
    {
      titleTab:
        'Já dá para jogar e ganhar (Play-To-Earn) no lançamento do jogo?',
      text: `O Play-To-Earn já está disponível no modo Treasure Hunt. <br> Você pode comprar um herói na Loja e usar ele para minerar BCOIN e heróis no modo Treasure Hunt.`,
    },
    {
      titleTab: 'O jogo tem sistema de stake?',
      text: `<strong>VIP e STAKE serão lançados no 1º trimestre de 2022.</strong> <br> Quanto mais você colocar em stake, mais benefícios terá, conforme a imagem abaixo: `,
    },
    {
      titleTab: 'Onde acompanho as informações oficiais do Bomb Crypto?',
      text: `<strong>Entre nos grupos da comunidade:</strong> <br> 
    <strong>Twitter:</strong> <a href="https://twitter.com/BombCryptoGame">https://twitter.com/BombCryptoGame</a> <br> 
    <strong>Facebook:</strong> <a href="https://www.facebook.com/BombCryptoGame">https://www.facebook.com/BombCryptoGame</a> <br>
    <strong>Discord:</strong> <a href="https://discord.link/bombcrypto">https://discord.link/bombcrypto</a> <br>
    <strong>Youtube:</strong> <a href="https://bit.ly/bombcrypto">https://bit.ly/bombcrypto</a> <br>
    <strong>Medium:</strong> <a href="https://bombcrypto.medium.com/">https://bombcrypto.medium.com/</a> <br>
    <strong>Tiktok:</strong> <a href="https://www.tiktok.com/@bombcrypto_official">https://www.tiktok.com/@bombcrypto_official</a> <br>
    <strong>Canal do Telegram:</strong> <a href=" https://t.me/BombCryptoGroup"> https://t.me/BombCryptoGroup</a> <br>
    <strong>Grupos do Telegram:</strong> <a></a> <br>
    <strong>Oficial:</strong> <a href=" https://t.me/BombCryptoGroup">https://t.me/BombCryptoGroup</a> <br>
    <strong>Vietnã:</strong> <a href="https://t.me/BombcryptoVietnamgroup">https://t.me/BombcryptoVietnamgroup</a> <br>
    <strong>Filipinas:</strong> <a href="https://t.me/Bombcrypto_PH">https://t.me/Bombcrypto_PH</a> <br>
    <strong>China:</strong> <a href=" https://t.me/BombCryptoGroup_CN"> https://t.me/BombCryptoGroup_CN</a> <br>
    <strong>Brasil:</strong> <a href="https://t.me/BombCryptoBR">https://t.me/BombCryptoBR</a> <br>
    <strong>Espanhol:</strong> <a href="https://t.me/BombCryptoGroup_SP">https://t.me/BombCryptoGroup_SP</a> <br>
    <strong>Tailândia:</strong> <a href="https://t.me/bombcrypto_Thailand">https://t.me/bombcrypto_Thailand</a> <br>
    `,
    },
    {
      titleTab:
        'Se eu tiver um problema que não está no FAQ, com quem falo para ter ajuda?',
      text: `Entre no <strong>Telegram:</strong> <a href="  https://t.me/BombCryptoGroup ">  https://t.me/BombCryptoGroup </a> e procure por /admin <br> Você pode mandar mensagem para um deles. <br> <strong>Atenção: os admins nunca chamam você primeiro nem pedem sua chave secreta ou senha.</strong> `,
    },
  ],
  [
    {
      titleTab: 'Quanto custa para começar a jogar?',
      text: 'O custo inicial para entrar no jogo é de 10 BCOIN (o mesmo que comprar 1 herói Bomber)',
    },
    {
      titleTab: 'Por que alguns heróis recuperam energia devagar?',
      text: `Quanto maior a raridade do herói, maior a barra de energia que ele guarda, então mais tempo ele leva para recuperar. Sem casa, a recuperação é de 0,5 de energia por minuto <br> Quanto maior a stamina do herói, maior a reserva de energia. <br> 1 de stamina = 50 de energia`,
    },
    {
      titleTab: 'Quando posso sacar BCOIN e resgatar heróis?',
      text: `Você pode sacar quando minerar 40 BCOIN, e precisa ter pelo menos 1 BCOIN na carteira <br> Você pode resgatar um herói quando houver um herói para resgatar. Além disso, o baú precisa ter o herói e é preciso ter espaço, sem passar de 500 heróis.`,
    },
    {
      titleTab: 'O herói recupera energia quando está inativo?',
      text: `Heróis não recuperam energia enquanto estão inativos. Quando inativos, eles também mantêm o nível de energia que já têm.`,
    },
    {
      titleTab: 'Existe um limite de casas no jogo?',
      text: `Hoje o número de casas no jogo é limitado a apenas 5000.`,
    },
    {
      titleTab:
        'Para vencer, o jogo usa a habilidade do jogador ou os atributos do personagem?',
      text: `A fase 1 tem só um modo, o Treasure Hunt, em que você minera BCOIN com os heróis Bomber. O PvP na fase 4 vai deixar os jogadores usarem mais a própria habilidade. <br> Mas ainda precisamos de tempo para entender o que os jogadores preferem antes de decidir como será o PvP.`,
    },
    {
      titleTab: 'É obrigatório comprar uma casa para o herói Bomber?',
      text: `Não é obrigatório. Sem casa, o herói Bomber descansa e recupera energia mais devagar.`,
    },
    {
      titleTab: 'O Bomb Crypto pretende melhorar os gráficos?',
      text: `Os gráficos vão melhorando aos poucos, mas mantendo o estilo pixel clássico.`,
    },
    {
      titleTab: 'A quantidade de heróis Bomber é limitada?',
      text: `Precisamos de um tempo para analisar os dados dos jogadores no jogo e só então decidir se vamos limitar os heróis Bomber.`,
    },
    {
      titleTab: 'Quantos heróis posso ter no máximo?',
      text: `Uma conta pode ter 500 heróis, e no jogo 15 heróis podem minerar ao mesmo tempo`,
    },
    {
      titleTab: 'Posso transferir meus heróis / casas para outra carteira?',
      text: `Não. Mas em breve teremos o Marketplace para comprar/vender heróis e casas, no 4º trimestre de 2021.`,
    },
    {
      titleTab:
        'O jogo tem algo especial para manter os jogadores jogando por muito tempo?',
      text: `O jogo terá vários modos diferentes para agradar tanto quem joga quanto quem investe <br>
  Os destaques são o Story Mode, o modo Treasure Hunt, o modo PvP e a coleta e venda de itens NFT especiais <br>
- O jogo tem 3 estilos principais, para vários públicos. Quem tem pouco tempo vai adorar o modo Treasure Hunt <br>
- O jogo tem o Story Mode, para quem gosta de jogar offline, explorar e ainda assim ganhar dinheiro. <br>
- O jogo tem o modo PvP, para quem gosta de jogar online, competir e mostrar habilidade`,
    },
    {
      titleTab: 'O que o Bomb Crypto tem de especial para atrair jogadores?',
      text: `- Dá para jogar e ganhar BCOIN logo que o jogo for lançado. <br>
- Jogos casuais clássicos são um nicho novo no mercado de NFT em blockchain. <br>
- O jogo já fez sucesso no celular com o nome Bomb Squad, com mais de 1 milhão de jogadores. <br>
- O jogo tem mais de 1 milhão de downloads e fez sucesso no Google Play. <br>
- Nosso time tem mais de 10 anos de experiência em desenvolvimento de jogos. <br>
- Nosso time tem consultoria de segurança e marketing de especialistas do Google. <br>
- Os gráficos em pixel são familiares para os jogadores. Haverá eventos para criar personagens e escolher os mais bonitos para Airdrop.`,
    },
  ],
  [
    {
      titleTab: 'Às vezes a taxa de gás chega a 0,4 BNB, o que eu faço?',
      text: 'Atualize o site e faça a transação normalmente. Recuse a transação quando a taxa de gás for de 0,4 BNB',
    },
    {
      titleTab:
        'Meus heróis travaram e não quebram nada, mesmo tendo blocos no mapa?',
      text: 'Basta voltar ao menu principal e entrar de novo no modo Treasure Hunt.',
    },
    {
      titleTab: 'Comprei o herói com sucesso mas não recebi, o que eu faço?',
      text: `- Atualize a página do jogo. <br>
- Abra o Baú    no menu de cima e clique em resgatar herói`,
    },
    {
      titleTab: 'O carregamento para em 10%, o que eu faço?',
      text: 'Atualize a página, limpe o cache e repita algumas vezes até conseguir entrar no jogo',
    },
    {
      titleTab:
        'Saquei herói/BCOIN e a transação aparece com sucesso no report https://report.bombcrypto.io/, mas não recebi',
      text: `BCOIN: <br> 1. Se o saque falhou. <br>  >> Vá ao site de Report <a href="https://report.bombcrypto.io/" target="_blank">(https://report.bombcrypto.io/)</a>  para tentar de novo. Se você não tentar de novo em até 24 horas, nós tentamos automaticamente para você e a BCOIN volta para a sua carteira. <br> <br> 2. Se o saque deu certo, mas ainda não chegou <br> >> Nós processamos automaticamente em até 24 horas e a BCOIN volta para a sua carteira. <br> <br>  BHERO: <br> O saque falhou ou deu certo mas não chegou: <br> => Espere até 24 horas e depois vá ao site de Report (https://report.bombcrypto.io/hero) <br> e conecte a carteira para receber o herói de volta. `,
    },
  ],
  [
    {
      titleTab: 'Quando posso sacar BCOIN e resgatar heróis?',
      text: `Você pode sacar quando minerar 40 BCOIN, e precisa ter pelo menos 1 BCOIN na carteira <br>
Você pode resgatar um herói quando houver um herói para resgatar. Além disso, o baú precisa ter o herói e é preciso ter espaço, sem passar de 500 heróis.`,
    },
    {
      titleTab: 'Saquei BCOIN mas não recebi, o que eu faço?',
      text: `Acesse o endereço <a href=" https://report.bombcrypto.io/">https://report.bombcrypto.io/</a> e cole o endereço da sua carteira MetaMask no campo "Search by wallet address" para conferir. <br>

Se o saque de BCOIN falhou (Status: failed), clique no botão Retry na coluna Action para receber suas BCOIN de volta.`,
    },
  ],
  [
    {
      titleTab: 'Quando posso sacar BCOIN e resgatar heróis?',
      text: `Você pode sacar quando minerar 40 BCOIN, e precisa ter pelo menos 1 BCOIN na carteira <br>
Você pode resgatar um herói quando houver um herói para resgatar. Além disso, o baú precisa ter o herói e é preciso ter espaço, sem passar de 500 heróis.`,
    },
    {
      titleTab: 'Como resgato meus heróis (BHERO)?',
      text: `Acesse o endereço <a href=" https://report.bombcrypto.io/hero">https://report.bombcrypto.io/hero</a> e siga estes passos: <br>
Passo 1: Conecte a carteira. <br>
Passo 2: Clique em claim BHERO e confirme na carteira MetaMask. <br>
Passo 3: Clique em Receive BHERO e confirme na carteira MetaMask. <br>
Depois espere uns 5 minutos, entre no jogo de novo e confira no BAÚ.`,
    },
  ],
  [
    {
      titleTab: 'Como funciona o upgrade de herói?',
      text: `Você pode subir o nível de um herói Bomber usando outro herói Bomber do mesmo nível, mais um custo em BCOIN. <br>
Os passos para fazer o upgrade são: <br>
Passo 1: Vá ao menu HEROES e escolha o herói Bomber que quer evoluir. <br>
Passo 2: Clique no botão UPGRADE. <br>
Passo 3: Escolha 1 herói Bomber do mesmo nível como material (Atenção: depois do upgrade, o herói usado como material é perdido). <br>
Passo 4: Clique no botão UPGRADE e confirme na carteira MetaMask para concluir. <br>
<img src=${imgUpdate} width="300" height="157" />
`,
    },
    {
      titleTab: 'O que o herói ganha depois do upgrade?',
      text: `Depois do upgrade, o herói ganha mais Power. Quanto ele ganha depende do nível.`,
    },
    {
      titleTab: 'Quanto custa e quanto Power o herói ganha no upgrade?',
      text: `Custo e Power ganho no upgrade de herói:`,
    },
  ],
  [
    {
      titleTab: 'Quando o Marketplace abre?',
      text: `O Marketplace será lançado no 4º trimestre de 2021.`,
    },
  ],
];
