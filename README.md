# Portfolio — Henrico Birochi

Vitrine de projetos de back-end em Java e Spring Boot. A página abre direto nos projetos e cada um traz
prints capturados com a aplicação rodando: telas reais, requisições reais à API e o banco de dados populado.

Site estático (HTML, CSS e JavaScript puros), sem build, com tema escuro/claro e versão em português e inglês.

## Rodando localmente

Qualquer servidor estático serve. Por exemplo:

```bash
python3 -m http.server 5500
```

Depois abra `http://localhost:5500`.

## Estrutura

```
index.html              conteúdo em português (marcado com data-i18n)
js/i18n.js              traduções em inglês
js/script.js            tema, idioma, menu, galerias de prints e lightbox
css/base.css            tokens de design (cores dos dois temas), tipografia e componentes
css/layout.css          header, hero, seções, sobre/contato e rodapé
css/projects.css        cards de projeto, galerias e visuais
img/projects/<projeto>  prints em WebP de cada projeto
docs/                   currículo em PDF
```

## Projetos na vitrine

| # | Projeto | Stack | Print |
|---|---------|-------|-------|
| 01 | [Petshop Spring MVC](https://github.com/HenricoBirochi/Petshop-Spring-MVC) | Spring MVC, Thymeleaf, JPA, AOP, PostgreSQL | telas: catálogo, carrinho, pedido, admin |
| 02 | [Tasks API](https://github.com/HenricoBirochi/Tasks-API) (em desenvolvimento) | Spring Boot 4.1, Clean Architecture, PostgreSQL | requisições `POST /user` e schema no banco |
| 03 | [Validating CPF · Hexagonal](https://github.com/HenricoBirochi/Validating-CPF-Hexagon-Arch) | Ports & Adapters, Kafka, MongoDB, OpenFeign | fluxo REST → Feign → MongoDB → Kafka |
| 04 | [Voyager People Management](https://github.com/HenricoBirochi/Voyager-People-Management) | Spring Boot, Thymeleaf, PDFBox, OpenCSV | telas de funcionários, projetos e relatórios |
| 05 | [Image Lite API](https://github.com/HenricoBirochi/Image-Lite-API) | Spring Boot, JPA Specifications, PostgreSQL | upload multipart, busca e download |
| 06 | [To-Do List API](https://github.com/HenricoBirochi/To-Do-List) | Spring Boot, BCrypt, Servlet Filter | cadastro, Basic Auth e 401 |
| 07 | [rustlings](https://github.com/rust-lang/rustlings) (estudos) | Rust | 28 exercícios recompilados e testados |
| 08 | IoT, CPU de 16 bits e Crazy Calculator | C++, C#, Logisim, Python/Flask | simulação Wokwi, chamadas à API e pytest |

## Como os prints foram feitos

- **Aplicações com interface** (Petshop, Voyager): cada projeto rodou localmente com PostgreSQL em Docker,
  os dados foram cadastrados pelos próprios formulários e as telas foram capturadas com um navegador headless.
- **APIs** (Tasks API, Image Lite, To-Do List, Crazy Calculator, Hexagonal): as requisições foram feitas com `curl`;
  as imagens mostram a saída real (status, headers e corpo) formatada como um console HTTP.
- **Rust**: os 28 exercícios concluídos foram recompilados com `rustc` e os testes executados.
- Os dados exibidos (nomes, e-mails, CPFs) são fictícios.
