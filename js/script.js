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

/* Galleries: a miniatura ativa define o print principal, a URL e a legenda */
const galleries = [...document.querySelectorAll(".gallery")].map((element) => {
    const shot = element.querySelector(".shot")
    return {
        element,
        image: shot.querySelector(".shot-img"),
        url: shot.querySelector(".shot-url"),
        caption: shot.querySelector(".shot-caption"),
        thumbs: [...element.querySelectorAll(".thumb")],
        fixedCaption: !element.querySelector(".thumb"),
    }
})

function activeIndex(gallery) {
    return Math.max(0, gallery.thumbs.findIndex((thumb) => thumb.classList.contains("is-active")))
}

function syncCaption(gallery) {
    if (gallery.fixedCaption) return
    const thumb = gallery.thumbs[activeIndex(gallery)]
    gallery.caption.innerHTML = thumb.querySelector(".thumb-caption").innerHTML
}

function showThumb(gallery, index) {
    const thumb = gallery.thumbs[index]
    gallery.thumbs.forEach((item) => item.classList.toggle("is-active", item === thumb))
    gallery.thumbs.forEach((item) => item.setAttribute("aria-pressed", String(item === thumb)))

    const { image } = gallery
    image.classList.add("is-loading")
    image.onload = () => image.classList.remove("is-loading")
    image.src = thumb.dataset.src
    image.width = Number(thumb.dataset.w)
    image.height = Number(thumb.dataset.h)
    image.alt = thumb.querySelector(".thumb-caption").textContent.trim()
    if (gallery.url && thumb.dataset.url) gallery.url.textContent = thumb.dataset.url
    syncCaption(gallery)
}

function galleryItems(gallery) {
    if (gallery.fixedCaption) {
        return [{ src: gallery.image.getAttribute("src"), caption: gallery.caption?.innerHTML ?? "", alt: gallery.image.alt }]
    }
    return gallery.thumbs.map((thumb) => {
        const caption = thumb.querySelector(".thumb-caption")
        return { src: thumb.dataset.src, caption: caption.innerHTML, alt: caption.textContent.trim() }
    })
}

galleries.forEach((gallery) => {
    gallery.thumbs.forEach((thumb, index) => {
        thumb.addEventListener("click", () => showThumb(gallery, index))
    })
    gallery.element.querySelector(".shot-open").addEventListener("click", () => {
        openLightbox(gallery, gallery.fixedCaption ? 0 : activeIndex(gallery))
    })
})

/* Lightbox */
const lightbox = document.getElementById("lightbox")
const lightboxImg = document.getElementById("lightbox-img")
const lightboxCaption = document.getElementById("lightbox-caption")
const lightboxPrev = lightbox.querySelector(".lightbox-prev")
const lightboxNext = lightbox.querySelector(".lightbox-next")
let lightboxState = null

function renderLightbox() {
    const { items, index } = lightboxState
    const item = items[index]
    lightboxImg.src = item.src
    lightboxImg.alt = item.alt
    lightboxCaption.innerHTML = item.caption
    lightboxPrev.hidden = items.length < 2
    lightboxNext.hidden = items.length < 2
}

function openLightbox(gallery, index) {
    lightboxState = { gallery, items: galleryItems(gallery), index }
    renderLightbox()
    document.body.classList.add("no-scroll")
    lightbox.showModal()
}

function stepLightbox(direction) {
    if (!lightboxState || lightboxState.items.length < 2) return
    const total = lightboxState.items.length
    lightboxState.index = (lightboxState.index + direction + total) % total
    renderLightbox()
    if (!lightboxState.gallery.fixedCaption) showThumb(lightboxState.gallery, lightboxState.index)
}

lightboxPrev.addEventListener("click", () => stepLightbox(-1))
lightboxNext.addEventListener("click", () => stepLightbox(1))
lightbox.querySelector(".lightbox-close").addEventListener("click", () => lightbox.close())
lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) lightbox.close()
})
lightbox.addEventListener("close", () => {
    document.body.classList.remove("no-scroll")
    lightboxState = null
})
document.addEventListener("keydown", (event) => {
    if (!lightbox.open) return
    if (event.key === "ArrowLeft") stepLightbox(-1)
    if (event.key === "ArrowRight") stepLightbox(1)
})

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
    galleries.forEach(syncCaption)

    document.title = ui("pageTitle")
    document.querySelector('meta[name="description"]').content = ui("description")
    document.getElementById("index-title").textContent = ui("indexTitle")
    langToggle.textContent = ui("langButton")
    langToggle.setAttribute("aria-label", ui("langLabel"))
    langToggle.title = ui("langLabel")
    menuButton.setAttribute("aria-label", ui("openMenu"))
    document.querySelectorAll(".shot-open").forEach((button) => button.setAttribute("aria-label", ui("zoom")))
    lightbox.querySelector(".lightbox-close").setAttribute("aria-label", ui("close"))
    lightboxPrev.setAttribute("aria-label", ui("prev"))
    lightboxNext.setAttribute("aria-label", ui("next"))
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
    themeColorMeta.content = theme === "light" ? "#f4f0e8" : "#1c2027"
    updateThemeLabel()
}

themeToggle.addEventListener("click", () => {
    const next = root.dataset.theme === "light" ? "dark" : "light"
    writeStorage("theme", next)
    setTheme(next)
})

/* Copy e-mail */
const copyEmailButton = document.getElementById("copy-email")

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

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu()
})

/* Active link while scrolling */
const navLinks = document.querySelectorAll(".nav-link")

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        navLinks.forEach((link) => {
            link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`)
        })
    })
}, { rootMargin: "-45% 0px -50% 0px" })

document.querySelectorAll("main section[id]").forEach((section) => sectionObserver.observe(section))

/* Reveal on scroll */
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible")
            revealObserver.unobserve(entry.target)
        }
    })
}, { threshold: 0.08 })

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element))

/* Init */
galleries.forEach((gallery) => {
    gallery.thumbs.forEach((thumb) => thumb.setAttribute("aria-pressed", String(thumb.classList.contains("is-active"))))
    syncCaption(gallery)
})
setTheme(root.dataset.theme === "light" ? "light" : "dark")
setLanguage(readStorage("lang") === "en" ? "en" : "pt")

document.getElementById("year").textContent = new Date().getFullYear()
