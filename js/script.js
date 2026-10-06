const root = document.documentElement

function readStorage(key) {
    try {
        return localStorage.getItem(key)
    } catch {
        return null
    }
}

function writeStorage(key, value) {
    try {
        localStorage.setItem(key, value)
    } catch {}
}

/* Language */
const langToggle = document.getElementById("lang-toggle")
const i18nElements = document.querySelectorAll("[data-i18n]")
const TRANSLATIONS_PT = {}
let currentLang = "pt"

// O HTML já vem em português: guardamos esse conteúdo para poder voltar a ele
i18nElements.forEach((element) => {
    TRANSLATIONS_PT[element.dataset.i18n] = element.innerHTML
})

function t(key) {
    const dictionary = currentLang === "en" ? TRANSLATIONS_EN : TRANSLATIONS_PT
    return dictionary[key] ?? TRANSLATIONS_PT[key]
}

function ui(key) {
    return UI_STRINGS[currentLang][key]
}

function setLanguage(lang) {
    currentLang = lang
    root.lang = lang === "en" ? "en" : "pt-BR"

    i18nElements.forEach((element) => {
        element.innerHTML = t(element.dataset.i18n)
    })

    document.title = ui("pageTitle")
    document.querySelector('meta[name="description"]').content = ui("description")
    langToggle.textContent = ui("langButton")
    langToggle.setAttribute("aria-label", ui("langLabel"))
    langToggle.title = ui("langLabel")
    menuButton.setAttribute("aria-label", ui("openMenu"))
    contactClose.setAttribute("aria-label", ui("close"))
    updateThemeLabel()
}

langToggle.addEventListener("click", () => {
    const next = currentLang === "pt" ? "en" : "pt"
    writeStorage("lang", next)
    setLanguage(next)
})

/* Theme (escuro é o padrão) */
const themeToggle = document.getElementById("theme-toggle")
const themeColorMeta = document.querySelector('meta[name="theme-color"]')

function updateThemeLabel() {
    const label = root.dataset.theme === "light" ? ui("themeToDark") : ui("themeToLight")
    themeToggle.setAttribute("aria-label", label)
    themeToggle.title = label
}

function setTheme(theme) {
    root.dataset.theme = theme
    themeColorMeta.content = theme === "light" ? "#F4F0E8" : "#222831"
    updateThemeLabel()
}

themeToggle.addEventListener("click", () => {
    const next = root.dataset.theme === "light" ? "dark" : "light"
    writeStorage("theme", next)
    setTheme(next)
})

/* Contact modal */
const contactContainer = document.getElementById("contact-container")
const contactClose = document.getElementById("contact-close")
const copyEmailButton = document.getElementById("copy-email")
let lastFocused = null

function openContact() {
    lastFocused = document.activeElement
    contactContainer.hidden = false
    document.body.classList.add("no-scroll")
    contactClose.focus()
}

function closeContact() {
    contactContainer.hidden = true
    document.body.classList.remove("no-scroll")
    lastFocused?.focus()
}

document.querySelectorAll("#contact-button, .open-contact").forEach((button) => {
    button.addEventListener("click", () => {
        closeMenu()
        openContact()
    })
})

contactClose.addEventListener("click", closeContact)

contactContainer.addEventListener("click", (event) => {
    if (event.target === contactContainer) closeContact()
})

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !contactContainer.hidden) closeContact()
})

copyEmailButton.addEventListener("click", async () => {
    try {
        await navigator.clipboard.writeText(copyEmailButton.dataset.email)
        copyEmailButton.textContent = ui("copied")
    } catch {
        copyEmailButton.textContent = copyEmailButton.dataset.email
    }
    setTimeout(() => (copyEmailButton.innerHTML = t("contact.copy")), 2000)
})

/* Mobile menu */
const menuButton = document.getElementById("menu-button")
const mainNav = document.getElementById("main-nav")

function closeMenu() {
    mainNav.classList.remove("open")
    menuButton.setAttribute("aria-expanded", "false")
}

menuButton.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open")
    menuButton.setAttribute("aria-expanded", String(isOpen))
})

document.querySelectorAll(".nav-link").forEach((link) => link.addEventListener("click", closeMenu))

/* Active link while scrolling */
const navLinks = document.querySelectorAll(".nav-link")

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        navLinks.forEach((link) => {
            link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`)
        })
    })
}, { rootMargin: "-50% 0px -50% 0px" })

document.querySelectorAll("main section").forEach((section) => sectionObserver.observe(section))

/* Reveal sections on scroll */
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible")
            revealObserver.unobserve(entry.target)
        }
    })
}, { threshold: 0.1 })

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element))

/* Init */
setTheme(root.dataset.theme === "light" ? "light" : "dark")
setLanguage(readStorage("lang") === "en" ? "en" : "pt")

document.getElementById("year").textContent = new Date().getFullYear()
