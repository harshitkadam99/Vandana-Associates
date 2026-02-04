let slides = document.querySelectorAll('.slide');
let current = 0;

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    slides[index].classList.add('active');
}

function nextSlide() {
    current = (current + 1) % slides.length;
    showSlide(current);
}

function prevSlide() {
    current = (current - 1 + slides.length) % slides.length;
    showSlide(current);
}

// Smooth auto-slide every 5 seconds
setInterval(nextSlide, 3000);

// TEAM ACCORDION
document.querySelectorAll(".accordion-header").forEach(header => {
    header.addEventListener("click", () => {
        const item = header.parentElement;
        const icon = header.querySelector(".icon");

        // toggle current
        item.classList.toggle("active");

        icon.textContent = item.classList.contains("active") ? "×" : "+";
    });
});
