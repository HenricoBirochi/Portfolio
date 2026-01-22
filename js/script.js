const contactButton = document.getElementById("contact-button")
const contactContainer = document.getElementById("contact-container")

contactButton.addEventListener("click", (event) => {
    event.preventDefault()

    contactContainer.style.display = "block"
})