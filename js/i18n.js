/*
 * Traduções em inglês. O texto em português fica no próprio HTML
 * e é lido na inicialização, então só a versão em inglês mora aqui.
 * Cada chave corresponde a um atributo data-i18n no index.html.
 */
const TRANSLATIONS_EN = {
    "nav.about": "About",
    "nav.experience": "Experience",
    "nav.projects": "Projects",
    "nav.skills": "Skills",
    "nav.contact": "Contact",

    "contact.title": "Let's talk?",
    "contact.text": "Pick whichever way you prefer to get in touch.",
    "contact.copy": "Copy e-mail",

    "hero.greeting": "My name is",
    "hero.role": "Java <span class=\"nowrap\">Back-end</span> Developer",
    "hero.text": `I build REST APIs and applications with <strong>Java</strong> and <strong>Spring Boot</strong>,
        focusing on clean code, good practices and relational databases.
        <img class="inline-icon" src="./img/icons/coffee.svg" alt="">`,
    "hero.projects": "See projects",
    "hero.cv": "Download CV",
    "hero.contact": "Get in touch",
    "hero.javaLabel": "Main language",

    "about.title": "About",
    "about.p1": `I'm a <strong>back-end</strong> developer with hands-on experience in <strong>Java</strong>,
        <strong>Spring Boot</strong>, <strong>REST APIs</strong>, <strong>SQL</strong>, <strong>Docker</strong> and <strong>Git</strong>.
        I also work with enterprise systems and web development.`,
    "about.p2": `I'm studying <strong>Computer Engineering</strong> and I enjoy learning what makes a system easy to maintain:
        <strong>OOP</strong>, <strong>SOLID</strong> and <strong>Clean Architecture</strong>.`,
    "about.p3": `I've worked end to end: from gathering and documenting business rules to development,
        delivery and validation with users.`,
    "about.locationLabel": "Location",
    "about.educationLabel": "Education",
    "about.education": "B.Sc. in Computer Engineering<br><small>Faculdade Engenheiro Salvador Arena · 2023 – 2027</small>",
    "about.languagesLabel": "Languages",
    "about.languages": "Portuguese (native)<br>English (intermediate · Cambridge B1)",

    "experience.title": "Experience",
    "experience.metagal.role": "IT Intern",
    "experience.metagal.i1": "Programmed in <strong>Baan 4GL</strong> on the <strong>Infor LN</strong> ERP, fixing and adapting business rules and implementing new logic in legacy production code.",
    "experience.metagal.i2": "Built automations with <strong>Python</strong> and <strong>Playwright</strong> and a <strong>DSL with a transpiler to Python</strong>, shipped as an executable for users with no Python knowledge.",
    "experience.metagal.i3": "Developed an <strong>n8n</strong> automation that read files, sent the data to the ERP and saved them to SharePoint, replacing a manual process.",
    "experience.metagal.i4": "Used <strong>SQL</strong> to investigate incidents, fix data inconsistencies and generate operational reports.",
    "experience.mr.role": "Software Development Intern",
    "experience.mr.i1": "Developed and maintained web applications and <strong>REST APIs</strong> with <strong>Java</strong> and <strong>Spring Boot</strong>, as well as Python with Flask and Django.",
    "experience.mr.i2": "Implemented back-end and front-end features applying <strong>OOP</strong>, the <strong>MVC</strong> pattern and good coding practices.",
    "experience.mr.i3": "Containerized services with <strong>Docker</strong> and took part in <strong>AWS</strong> proofs of concept focused on availability and scalability.",
    "experience.tg.role": "Conscript",
    "experience.tg.i1": "Completed Brazilian military service. Served as official bugler at ceremonies and was the standout conscript in August, which reinforced discipline and responsibility.",

    "projects.title": "Projects",
    "projects.petshop": "Team-built e-commerce with product CRUD, cart, orders, image upload and authentication. MVC back-end with Spring Data JPA, PostgreSQL and role-based access control using Spring AOP.",
    "projects.voyager": "Management of positions, departments, employees, time records and reports. Layered into Controllers, Services and Repositories, with a containerized local environment.",
    "projects.wip": "in progress",
    "projects.tasks": "REST API for task management, built to practice Clean Architecture: organized into domain, use cases and infrastructure.",
    "projects.iotTitle": "IoT Temperature, Humidity and Light Monitoring",
    "projects.iot": "Sensors with C++ firmware for Arduino and an ASP.NET Core MVC application integrated with FIWARE on AWS, with SQL Server and measurement dashboards.",
    "projects.iotWeb": "Web App",
    "projects.more": "See all on GitHub &rarr;",

    "skills.title": "Skills",
    "skills.main": "Core",
    "skills.fundamentals": "Fundamentals",
    "skills.oop": "OOP",
    "skills.clean": "Clean Architecture",
    "skills.ds": "Data Structures",
    "skills.algorithms": "Algorithms",
    "skills.databases": "Databases",
    "skills.modeling": "Relational modeling",
    "skills.tools": "Tools & Cloud",
    "skills.languages": "Other languages",
    "skills.frameworks": "Other frameworks",

    "cta.title": "Let's work together?",
    "cta.text": "I'm open to opportunities as a Java back-end developer.",

    "footer.made": "Made with",
    "footer.by": "by",
}

/* Textos usados pelo JavaScript (atributos, título da página, mensagens) */
const UI_STRINGS = {
    pt: {
        pageTitle: "Henrico Birochi | Desenvolvedor Back-end Java",
        description: "Portfólio de Henrico Birochi, desenvolvedor back-end Java com Spring Boot, APIs REST, SQL e Docker.",
        langButton: "EN",
        langLabel: "Switch to English",
        themeToLight: "Ativar tema claro",
        themeToDark: "Ativar tema escuro",
        openMenu: "Abrir menu",
        close: "Fechar",
        copied: "E-mail copiado!",
    },
    en: {
        pageTitle: "Henrico Birochi | Java Back-end Developer",
        description: "Portfolio of Henrico Birochi, Java back-end developer working with Spring Boot, REST APIs, SQL and Docker.",
        langButton: "PT",
        langLabel: "Mudar para português",
        themeToLight: "Switch to light theme",
        themeToDark: "Switch to dark theme",
        openMenu: "Open menu",
        close: "Close",
        copied: "E-mail copied!",
    },
}
