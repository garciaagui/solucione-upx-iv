<a name="readme-top"></a>

<h1 align="center">Solucione</h1>

## Sumário

<ol>
  <li><a href="#sobre-o-projeto">Sobre o Projeto</a></li>
  <li><a href="#tecnologias">Tecnologias</a></li>
  <li><a href="#funcionalidades">Funcionalidades</a></li>
  <li><a href="#endpoints">Endpoints</a></li>
  <li><a href="#demonstra%C3%A7%C3%A3o">Demonstração</a></li>
  <li><a href="#como-executar-o-projeto">Como Executar o Projeto</a></li>
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
- [bcryptjs][bcryptjs] → Utilizado para realizar o hash seguro das senhas dos usuários.
- [Docker][docker] → Sistema de containers utilizado para criar e executar o banco de dados PostgreSQL de forma isolada.
- [framer-motion][framer-motion] → Animações e transições suaves aplicadas na interface.
- [Google - API Gemini][gemini] → Análise e validação de conteúdo.
- [Next.js][nextjs] → Framework React.js utilizado na construção de toda estrutura do frontend e das rotas de API.
- [NextAuth.js][nextauth] → Autenticação de usuários.
- [React TanStack Query][tanstackquery] → Biblioteca utilizada no gerenciamento de estado de dados assíncronos.
- [Resend][resend] → Envio de e-mails para verificação de e-mail e confirmação do cadastro.
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

- **Cadastro de usuário com verificação de e-mail**: Permite o cadastro de novos usuários mediante verificação de e-mail.
- **Login e autenticação de usuários**: Permite que os usuários façam login com credenciais e acessem a plataforma de forma segura.
- **Logout de usuários**: Desfaz a autenticação, encerrando a sessão do usuário na aplicação.
- **Listagem de reclamações**: Exibe na tela inicial todas as reclamações registradas na plataforma.
- **Detalhes de reclamação**: Apresenta informações detalhadas sobre uma reclamação específica.
- **Criação de reclamações**: Permite que os usuários registrem novas reclamações no sistema.
- **Atualização de status das reclamações**: Permite que administradores alterem o status das ocorrências.
- **Validação de conteúdo impróprio**: Utiliza a inteligência artificial do Google Gemini para detectar e bloquear conteúdo ofensivo ou inadequado em texto e imagens.
- **Mudança de tema**: Oferece a opção de alternar entre temas claro e escuro para melhorar a experiência do usuário.

<br/>

## Endpoints

Abaixo você pode conferir um detalhamento dos endpoints utilizados no projeto. Para realizar as requisições HTTP e consultar o comportamento de cada endpoint, você pode utilizar a extensão [Thunder Client][thunder-client].

> ⚠️ As URLs abaixo consideram que o projeto está rodando na porta `3000`. Tenha isso em mente ao testar as rotas.

<details>
  <summary><strong>Auth</strong></summary>

#### POST /auth/login

- Login de usuários
- URL: `http://localhost:3000/api/auth/login`
- Exemplo do corpo da requisição:

```
{
  "email": "joao@example.com",
  "password": "123456"
}
```

- Exemplo de retorno bem-sucedido:

```
{
  "message": "Login realizado com sucesso!",
  "data": {
    "user": {
      "id": 1,
      "name": "João Silva",
      "email": "joao@example.com",
      "role": "admin"
    }
  }
}
```

#### POST /auth/register

- Cadastro de usuários
- URL: `http://localhost:3000/api/auth/register`
- Exemplo do corpo da requisição:

```
{
  "email": "pedro@example.com",
  "password": "xX123456789@",
  "name": "Pedro"
}
```

- Após cadastro bem-sucedido, um e-mail de verificação é enviado para o endereço de e-mail informado no cadastro.
- Exemplo de retorno bem-sucedido:

```
{
  "message": "Usuário cadastrado. Verifique seu e-mail.",
  "data": {
    "user": {
      "id": 5,
      "name": "Pedro",
      "email": "pedro@example.com"
    }
  }
}
```

#### GET /auth/verify-email

- Valida o token da verificação de e-mail
- URL: `http://localhost:3000/api/auth/verify-email?token={token}`
- Exemplo de retorno bem-sucedido:

```
{ "message": "E-mail verificado com sucesso." }
```

</details>

<details>
  <summary><strong>Occurrences</strong></summary>

#### GET /occurrences

- Retorna todas as reclamações registradas no banco de dados.
- URL: `http://localhost:3000/api/occurrences`
- Exemplo de retorno bem-sucedido:

```
{
  "message": "Ocorrências encontradas",
  "data": [
    {
      "id": 2,
      "title": "Lâmpada queimada no parque",
      "description": "Uma das lâmpadas do poste no parque está queimada, deixando a área escura à noite.",
      "street": "Rua das Flores",
      "neighborhood": "Vila Nova",
      "zipCode": "56.812-350",
      "reference": "Próximo à esquina",
      "status": "Aberto",
      "image": "https://pub-192c7de9eb344c6b87b7ac901aa60c7e.r2.dev/lampada-queimada.jpg",
      "userId": 4,
      "createdAt": "2025-04-02T10:00:00.000Z",
      "updatedAt": "2025-04-24T23:02:13.781Z",
      "user": {
        "id": 4,
        "name": "Ana Moares",
        "email": "ana@example.com",
        "role": "user",
        "createdAt": "2025-04-24T23:02:13.781Z",
        "updatedAt": "2025-04-24T23:02:13.781Z"
      },
      "occurrenceReplies": []
    },
    {
      "id": 1,
      "title": "Vazamento de água na rua principal",
      "description": "Há um vazamento de água na calçada em frente ao supermercado.",
      "street": "Rua Principal",
      "neighborhood": "Centro",
      "zipCode": "25.689-420",
      "reference": "Em frente ao estacionamento da praça",
      "status": "Finalizado",
      "image": "https://pub-192c7de9eb344c6b87b7ac901aa60c7e.r2.dev/vazamento-agua.jpg",
      "userId": 3,
      "createdAt": "2025-04-01T12:00:00.000Z",
      "updatedAt": "2025-04-24T23:02:13.781Z",
      "user": {
        "id": 3,
        "name": "Carlos Santos",
        "email": "carlos@example.com",
        "role": "user",
        "createdAt": "2025-04-24T23:02:13.781Z",
        "updatedAt": "2025-04-24T23:02:13.781Z"
      },
      "occurrenceReplies": [
        {
          "id": 1,
          "description": "Problema localizado e o conserto foi agendado para amanhã.",
          "imageUrl": "",
          "userId": 2,
          "occurrenceId": 1,
          "occurrenceStatus": "Andamento",
          "createdAt": "2025-04-06T00:00:00.000Z",
          "updatedAt": "2025-04-24T23:02:13.781Z",
          "user": {
            "id": 2,
            "name": "Maria Oliveira",
            "email": "maria@example.com",
            "role": "admin",
            "createdAt": "2025-04-24T23:02:13.781Z",
            "updatedAt": "2025-04-24T23:02:13.781Z"
          }
        },
        {
          "id": 2,
          "description": "Após vazamento de água na rua principal, nossa equipe respondeu prontamente, localizou e reparou a fonte, com medidas preventivas para evitar recorrências. Priorizamos a rápida resolução para garantir o bem-estar da comunidade",
          "imageUrl": "https://pub-192c7de9eb344c6b87b7ac901aa60c7e.r2.dev/conserto-vazamento-agua.jpg",
          "userId": 2,
          "occurrenceId": 1,
          "occurrenceStatus": "Finalizado",
          "createdAt": "2025-04-08T00:00:00.000Z",
          "updatedAt": "2025-04-24T23:02:13.781Z",
          "user": {
            "id": 2,
            "name": "Maria Oliveira",
            "email": "maria@example.com",
            "role": "admin",
            "createdAt": "2025-04-24T23:02:13.781Z",
            "updatedAt": "2025-04-24T23:02:13.781Z"
          }
        }
      ]
    }
  ]
}
```

#### GET /occurrences/:id

- Retorna a reclamação de acordo com o id passado no endpoint.
- Exemplo de URL: `http://localhost:3000/api/occurrences/4`
- Exemplo de retorno bem-sucedido:

```
{
  "message": "Ocorrência encontrada",
  "data": {
    "id": 4,
    "title": "Passeio com buracos na Avenida Central",
    "description": "Os buracos no passeio estão representando um perigo para os pedestres.",
    "street": "Rua das Árvores",
    "neighborhood": "Jardim Botânico",
    "zipCode": "98.145-710",
    "reference": "Próximo à escola",
    "status": "Aberto",
    "image": "https://pub-192c7de9eb344c6b87b7ac901aa60c7e.r2.dev/passeio-buracos.jpg",
    "userId": 3,
    "createdAt": "2025-04-04T15:00:00.000Z",
    "updatedAt": "2025-04-24T23:02:13.781Z",
    "user": {
      "id": 3,
      "name": "Carlos Santos",
      "email": "carlos@example.com",
      "password": "123456",
      "role": "user",
      "createdAt": "2025-04-24T23:02:13.781Z",
      "updatedAt": "2025-04-24T23:02:13.781Z"
    },
    "occurrenceReplies": []
  }
}
```

#### POST /occurrences

- Cria uma nova reclamação.
- URL: `http://localhost:3000/api/occurrences`
- O corpo da requisição precisa estar no formato `form`. Segue abaixo exemplo dos campos de texto:

```
{
  "title": "Buraco na rua principal",
  "description": "Grande buraco na pista colocando em risco a segurança dos motoristas.",
  "street": "Avenida Central, 1234",
  "neighborhood": "Centro",
  "zipCode": "12345-678",
  "reference": "Próximo ao supermercado Central"
}
```

- Para requisições do tipo `form`, arquivos geralmente possuem um campo específico de envio.
- Exemplo de retorno bem-sucedido:

```
{
  message: 'Ocorrência criada!',
  data: {
    id: 6,
    title: 'Buraco na rua principal',
    description: 'Grande buraco na pista colocando em risco a segurança dos motoristas.',
    street: 'Avenida Central, 1234',
    neighborhood: 'Centro',
    zipCode: '12.345-678',
    reference: 'Próximo ao supermercado Central',
    status: 'Aberto',
    image: 'https://exemplo.com/imagens/ocorrencia-buraco.jpg',
    userId: 4,
    createdAt: 2025-04-28T23:44:17.896Z,
    updatedAt: 2025-04-28T23:44:17.896Z
  },
},
```

</details>

<details>
  <summary><strong>Replies</strong></summary>

#### POST /replies

- Cria uma nova atualização para uma reclamação.
- URL: `http://localhost:3000/api/replies`
- O corpo da requisição precisa estar no formato `form`. Segue abaixo exemplo dos campos de texto:

```
{
  "userId": "1",
  "description": "Problema localizado e serviço iniciado.",
  "occurrenceId": "2",
  "occurrenceStatus": "Aberto",
}
```

- Para requisições do tipo `form`, arquivos geralmente possuem um campo específico de envio.
- Exemplo de retorno bem-sucedido:

```
{
  message: 'Atualização criada!',
  data: {
    id: 8,
    description: 'O problema foi resolvido e medidas preventivas foram implementadas.',
    imageUrl: '',
    userId: 1,
    occurrenceId: 3,
    occurrenceStatus: 'Finalizado',
    createdAt: 2025-05-29T21:48:56.956Z,
    updatedAt: 2025-05-29T21:48:56.956Z
  },
},
```

</details>

<br/>

## Demonstração

Você pode testar a aplicação através do link abaixo. Use as credenciais fornecidas para acessar com permissões de **usuário comum** ou **administrador**:

### 🔍 Link de Acesso

[https://solucione-upx-iv.vercel.app](https://solucione-upx-iv.vercel.app)

### 🔐 Credenciais de Teste

#### Usuário comum

- **E-mail:** ana@example.com
- **Senha:** 90JhaZ1_19zx@

#### Administrador

- **E-mail:** joao@example.com
- **Senha:** xX123456789@

> ⚠️ Os dados cadastrados neste ambiente são públicos e podem ser restaurados a qualquer momento. Não insira informações sensíveis.

<br/>

## Como Executar o Projeto

Para rodar o projeto localmente, siga os passos abaixo.

1. Verifique se a sua máquina possui as configurações mínimas para execução do projeto:

- Sistema Operacional Distribuição Unix (Linux/macOS);
- Node versão igual ou superior à `20.0.0 LTS`;
- Docker versão igual ou superior à `24.0.0`;
- Docker Compose versão igual ou superior à `2.20.0`.

2. Verifique se possui os elementos necessários dos serviços abaixo:

- API key do Google Gemini;
- API key do Resend;
- Bucket criado no Cloudflare R2.

3. Clone o repositório:

```
git clone git@github.com:garciaagui/solucione-upx-iv.git
```

4. Navegue até a raiz do projeto:

```
cd solucione-upx-iv/
```

5. Instale as dependências com o comando abaixo:

```
npm install
```

6. Execute o comando abaixo para subir o container do banco de dados. Ao fazê-lo, o container **project_upx_db** será inicializado:

```
docker compose up
```

7. Execute o comando abaixo para criar e aplicar as migrations no banco de dados. Ao fazê-lo, o banco será atualizado conforme o esquema definido no Prisma:

```
npx prisma migrate dev
```

8. Preencha as variáveis de ambiente do arquivo `.env`

- ⚠️ O valor padrão associado à variável `RESEND_EMAIL` no `.env.example` utiliza o domínio gratuito oferecido pelo Resend: `@resend.dev`. Com ele, só é possível enviar e-mails ao endereço de e-mail associado à sua conta Resend. Para fins de teste, é suficiente.

9. Inicie a aplicação:

```
npm run dev
```

10. No navegador, visite `http://localhost:3000`. Se tudo ocorreu bem, será possível utilizar a aplicação.

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
[bcryptjs]: https://www.npmjs.com/package/bcryptjs
[docker]: https://www.docker.com
[eslint]: https://eslint.org
[prettier]: https://prettier.io/docs
[facens]: https://facens.br
[framer-motion]: https://www.npmjs.com/package/framer-motion
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
[resend]: https://resend.com/docs/introduction
[shadcn]: https://ui.shadcn.com
[tailwind]: https://tailwindcss.com
[tanstackquery]: https://tanstack.com/query/latest
[thunder-client]: https://www.thunderclient.com
[typescript]: https://www.typescriptlang.org
[zod]: https://zod.dev/?id=introduction
[r2]: https://developers.cloudflare.com/r2
