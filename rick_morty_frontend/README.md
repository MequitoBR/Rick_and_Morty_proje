# Rick & Morty Explorer — Parte prática

Projeto em HTML, CSS e JavaScript puro que consome a API pública Rick and Morty.

## Estrutura
- `index.html`: estrutura da página e área vazia que receberá os cards.
- `css/style.css`: identidade visual e responsividade.
- `js/script.js`: fetch, leitura JSON, criação dinâmica dos cards, filtros e paginação.

## API
Endpoint: https://rickandmortyapi.com/api/character
Documentação: https://rickandmortyapi.com/documentation

A API é pública e não exige token para este endpoint. A resposta possui `info` (paginação) e `results` (personagens). Os campos utilizados incluem `name`, `image`, `status`, `species` e `origin`.