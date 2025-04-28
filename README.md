<a name="readme-top"></a>

<h1 align="center">Solucione</h1>

## Sumário

<ol>
  <li><a href="#sobre-o-projeto">Sobre o Projeto</a></li>
  <li><a href="#tecnologias">Tecnologias</a></li>
  <li><a href="#funcionalidades">Funcionalidades</a></li>
  <li><a href="#como-executar-o-projeto">Como Executar o Projeto</a></li>
  <li><a href="#endpoints">Endpoints</a></li>
  <li><a href="#contato">Contato</a></li>
</ol>

## Sobre o Projeto

Projeto desenvolvido para a disciplina de UPX - Usina de Projetos Experimentais IV, pertencente ao curso EAD de Análise e Desenvolvimento de Sistemas do [Centro Universitário Facens][facens].

A Solucione é uma plataforma de envio de reclamações relacionadas à infraestrutura, meio ambiente e mobilidade urbana. O projeto tem como ideia atuar em conjunto com as prefeituras, oferecendo um canal adicional e mais acessível para o registro dessas demandas.

Esta aplicação foi desenvolvida com Next.js para o backend e frontend. Utiliza um container Docker com PostgreSQL para o banco de dados, Prisma como ORM e R2 da Cloudflare para armazenamento de imagens.

<br/>

## Tecnologias

<details>
  <summary><strong>💻 Desenvolvimento</strong></summary>

- [AWS SDK][awssdk] → Conjunto de ferramentas da Amazon utilizado na interação com buckets da R2 Cloudflare.
- [Docker][docker] → Sistema de containers utilizado para criar e executar o banco de dados PostgreSQL de forma isolada.
- [Google - API Gemini][gemini] → Análise e validação de conteúdo.
- [Next.js][nextjs] → Framework React.js utilizado na construção de toda estrutura do frontend e das rotas de API.
- [NextAuth.js][nextauth] → Autenticação de usuários.
- [React TanStack Query][tanstackquery] → Biblioteca utilizada no gerenciamento de estado de dados assíncronos.
- [shadcn/ui][shadcn] → Conjunto de componentes acessíveis e performáticos.
- [Tailwind CSS][tailwind] → Framework CSS utilizado na estilização dos componentes e páginas.
- [TypeScript][typescript] → Linguagem de programação fortemente tipada baseada em Javascript. Utilizada no desenvolvimento do projeto.
- [Zod][zod] + [React Hook Form][reacthookform] → Validação e gerenciamento de formulários.

</details>

<details>
  <summary><strong>🗄️ Banco de Dados</strong></summary>
  
- [Cloudflare R2][r2] → Banco de dados de objetos, utilizado no armazenamento das imagens.
- [PostgreSQL][postgresql] → Banco de dados relacional, utilizado no armazenamento das informações dos usuários e das reclamações.
- [Prisma][prisma] → ORM (Object-Relational Mapper) utilizado na manipulação de dados e na interação com bancos de dados.

</details>

<details>
  <summary><strong>✨ Alinhamento e qualidade de código</strong></summary>

- [ESLint][eslint] → Ferramenta de linting para garantir a qualidade do código e encontrar problemas.
- [Prettier][prettier] → Ferramenta de formatação de código para manter o estilo consistente.

</details>

<br/>

## Funcionalidades

- **Login e autenticação de usuários**: Permite que os usuários façam login com credenciais e acessem a plataforma de forma segura.
- **Logout de usuários**: Desfaz a autenticação, encerrando a sessão do usuário na aplicação.
- **Listagem de reclamações**: Exibe na tela inicial todas as reclamações registradas na plataforma.
- **Detalhes de reclamação**: Apresenta informações detalhadas sobre uma reclamação específica.
- **Criação de reclamações**: Permite que os usuários registrem novas reclamações no sistema.
- **Validação de conteúdo impróprio**: Utiliza a inteligência artificial do Google Gemini para detectar e bloquear conteúdo ofensivo ou inadequado em texto e imagens.

<br/>

## Como Executar o Projeto

Para rodar o projeto localmente, siga os passos abaixo.

1. Verifique se a sua máquina possui as configurações mínimas para execução do projeto;

- Sistema Operacional Distribuição Unix;
- Node versão igual ou superior à `16.14.0 LTS`;
- Docker;
- Docker-compose versão igual ou superior à `1.29.2`.

2. Clone o repositório;

```
git clone git@github.com:garciaagui/trybe-futebol-clube.git
```

3. Navegue até a raiz do projeto;

```
cd trybe-futebol-clube/
```

4. Na raiz do projeto, instale as dependências com o comando abaixo;

```
npm run postinstall
```

5. Na raiz do projeto, vá até a diretório `app` e execute o comando abaixo para subir os containers. Ao fazê-lo, três containers serão inicializados:

- **app_backend**: referente ao back-end;
- **app_frontend**: referente ao front-end;
- **db**: referente ao banco de dados.

```
cd app/ && npm run compose:up:dev
```

6. No navegador, visite `http://localhost:3000`. Se tudo ocorreu bem, será possível utilizar a aplicação.

<details>
  <summary><strong> ℹ️ Para instruções adicionais, clique aqui.</strong></summary><br />

- Para executar os testes do back-end, vá até o diretório `app/backend/` e utilize o comando abaixo.

```
npm run test:coverage
```

- Para inicializar a aplicação fora do container e conectar com seu banco local, siga os passos abaixo.

1. Vá até o diretório `app/backend/`;
2. Renomeie o arquivo `.env.example` para `.env`;
3. Configure os valores de acordo com o cenário do seu ambiente (credenciais de banco de dados, secrets desejadas e etc).
</details>

<br/>

## Endpoints

Abaixo você pode conferir um detalhamento dos endpoints utilizados no projeto. Para realizar as requisições HTTP e consultar o comportamento de cada endpoint, você pode utilizar a extensão [Thunder Client][thunder-client].

> ⚠️ Atente-se ao token gerado durante o login, ele será necessário para outras operações. Lembre-se também que seu tempo de expiração é de 1h.

<details>
  <summary><strong>Login</strong></summary>

### POST /login

- Valida o login do usuário e retorna um token gerado com jsonwebtoken (jwt).
- O token gerado deve ser inserido no Header `Authorization` para autenticar outras operações. Lembre-se de guardá-lo e tenha em mente que seu tempo de expiração é de 1h.
- URL: `http://localhost:3001/login`
- O corpo da requisição deve conter o seguinte formato:

```
{
  "email": "string",
  "password": "string"
}
```

### GET /login/validate

- Valida o login do usuário e retorna o `role` (admin ou user) do usuário.
- 🔑 O token é validado neste endpoint.
- URL: `http://localhost:3001/login/validate`

---

</details>

<details>
  <summary><strong>Teams</strong></summary>
  
### GET /teams
- Retorna todos os times registrados no banco de dados.
- URL: `http://localhost:3001/teams`

### GET /teams/:id

- Retorna o time de acordo com o id passado no endpoint.
- Exemplo de URL: `http://localhost:3001/teams/1`

---

</details>
  
<details>
  <summary><strong>Matches</strong></summary>
  
### GET /matches
- Retorna todas as partidas registradas no banco de dados.
- URL: `http://localhost:3001/matches`

### POST /matches

- Registra uma nova partida.
- 🔑 O token é validado neste endpoint.
- URL: `http://localhost:3001/matches`
- O corpo da requisição deve conter o seguinte formato:

```
{
  "homeTeamId": number, // O valor deve ser o id do time
  "awayTeamId": number, // O valor deve ser o id do time
  "homeTeamGoals": number,
  "awayTeamGoals": number,
}
```

### PATCH /matches/:id

- Atualiza o placar da partida cujo id foi passado no endpoint.
- Exemplo de URL: `http://localhost:3001/matches/42`
- O corpo da requisição deve conter o seguinte formato:

```
{
  "homeTeamGoals": number,
  "awayTeamGoals": number
}
```

### PATCH /matches/:id/finish

- Finaliza a partida cujo id foi passado no endpoint.
- Exemplo de URL: `http://localhost:3001/matches/42/finish`
- Nada precisa ser inserido no corpo da requisição.

---

</details>

<details>
  <summary><strong>Leaderboard</strong></summary>
  
### GET /leaderboard
- Descrição: Retorna a classificação geral do campeonato (considera todas as partidas).
- URL: `http://localhost:3001/leaderboard`

### GET /leaderboard/home

- Descrição: Retorna a classificação baseada somente nos jogos disputados em casa.
- URL: `http://localhost:3001/leaderboard/home`

### GET /leaderboard/away

- Descrição: Retorna a classificação baseada somente nos jogos disputados como visitante.
- URL: `http://localhost:3001/leaderboard/away`

---

</details>

<br/>

## Contato

Projeto desenvolvido por Guilherme Garcia. Seguem abaixo minhas redes sociais e meios de contato. 🤘

[![Gmail][gmail-badge]][gmail-url]
[![Linkedin][linkedin-badge]][linkedin-url]
[![GitHub][github-badge]][github-url]
[![Instagram][instagram-badge]][instagram-url]

<p align="right"><a href="#readme-top">Voltar ao topo</a></p>

<!-- MARKDOWN LINKS & BADGES -->

[awssdk]: https://aws.amazon.com/pt/sdk-for-javascript
[docker]: https://www.docker.com
[eslint]: https://eslint.org
[prettier]: https://prettier.io/docs
[facens]: https://facens.br
[gemini]: https://ai.google.dev/aistudio?hl=pt-br
[github-badge]: https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white
[github-url]: https://github.com/garciaagui
[gmail-badge]: https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white
[gmail-url]: mailto:garciaguig@gmail.com
[instagram-badge]: https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white
[instagram-url]: https://www.instagram.com/garciaagui/
[linkedin-badge]: https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white
[linkedin-url]: https://www.linkedin.com/in/garciaagui/
[nextjs]: https://nextjs.org
[nextauth]: https://next-auth.js.org/getting-started/introduction
[postgresql]: https://www.postgresql.org
[prisma]: https://www.prisma.io/orm
[reacthookform]: https://react-hook-form.com
[shadcn]: https://ui.shadcn.com
[tailwind]: https://tailwindcss.com
[tanstackquery]: https://tanstack.com/query/latest
[thunder-client]: https://www.thunderclient.com
[typescript]: https://www.typescriptlang.org
[zod]: https://zod.dev/?id=introduction
[r2]: https://developers.cloudflare.com/r2
