# user management

[![React/ViteJS](https://img.shields.io/badge/react/vite-f1f5f9?logo=vite)](https://vitejs.dev/)
[![Material UI](https://img.shields.io/badge/MUI_-Material--UI-007FFF?logo=mui)](https://mui.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-f1f5f9?logo=TypeScript)](https://www.typescriptlang.org/)
[![Jest](https://img.shields.io/badge/Jest-c21325?logo=jest)](https://jestjs.io/)
[![Testing Library](https://img.shields.io/badge/Testing--Library-f1f5f9?logo=Testing-Library)](https://testing-library.com/)
[![semantic-release](https://img.shields.io/badge/semantic--release-e10079?logo=semantic-release)](https://semantic-release.gitbook.io/semantic-release)
[![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-f1f5f9?logo=GitHub-Actions)](https://docs.github.com/pt/actions)
[![Vercel](https://img.shields.io/badge/Vercel-000?logo=Vercel)](https://vercel.com/)

Este projeto e uma aplicação web desenvolvida com react, vite e typescript, o mesmo permite gerenciar usuários.

O armazenamento das informações esta sendo feito no localStorage:

`users_bd`: Usuários cadastrados.

`user_token`: Informações do usuario logado na aplicação, `id` e `type` somente.

## Funcionalidades

- [x] Autenticação: A aplicação é protegida por login e senha.
- [x] Perfis de Usuário: Suporte para dois tipos de perfis - ADMIN e USER.
- [x] Listagem de Usuários: listagem dos usuários cadastrados.
- [x] Gestão de Usuários (CRUD): Usuários com perfil ADMIN podem criar, ler, atualizar e deletar usuários.
- [x] Visualização e Edição de Perfil: O usuário pode editar seu próprio perfil, podendo alterar nome, senha, etc.

## Índice

- [Instalação](#instalação)
- [Uso](#uso)
- [Testes](#testes)

## Instalação

Para instalar e rodar o projeto localmente, siga os passos abaixo:

1. Clone o repositório:

   ```bash
    git clone git@github.com:maycon8609/vite-user-management.git
   ```

2. Navegue até o diretório do projeto:

   ```bash
    cd vite-user-management
   ```

3. Instale as dependências:

   ```bash
    npm install
   ```

## Uso

Para iniciar a aplicação localmente, execute:

```bash
 npm run dev
```

ou

[Link deploy vercel](https://vite-user-management.vercel.app/)

Usuario com nivel de acesso `ADMIN`

```bash
  email: admin@softplan.com
  senha: 123
```

Usuario com nivel de acesso `USER`

```bash
  email: user@softplan.com
  senha: 123
```

## Testes

Para rodar os testes, use o comando:

```bash
 npm run test
```
