// Set timestamp when page loads
document.addEventListener("DOMContentLoaded", () => {
    const timestampField = document.getElementById("timestamp");
    if (timestampField) {
        timestampField.value = new Date().toISOString();
    }
});


// Handle modals
const cards = document.querySelectorAll(".card");
const modals = document.querySelectorAll("dialog");
const closeButtons = document.querySelectorAll(".close-modal");

cards.forEach(card => {
    const link = card.querySelector("a");
    const modalId = card.dataset.modal;
    const modal = document.getElementById(modalId);

    // Open modal when clicking "Learn More"
    link.addEventListener("click", (e) => {
        e.preventDefault();
        modal.showModal();
    });

    // ALSO: clicking card selects membership
    card.addEventListener("click", () => {
        const level = modalId.replace("-modal", "");
        const radio = document.querySelector(`input[value="${level}"]`);
        if (radio) {
            radio.checked = true;
        }
    });
});


// Close modals
closeButtons.forEach(button => {
    button.addEventListener("click", () => {
        button.closest("dialog").close();
    });
});


// Optional: close modal when clicking outside content
modals.forEach(modal => {
    modal.addEventListener("click", (e) => {
        const rect = modal.getBoundingClientRect();
        if (
            e.clientX < rect.left ||
            e.clientX > rect.right ||
            e.clientY < rect.top ||
            e.clientY > rect.bottom
        ) {
            modal.close();
        }
    });
});