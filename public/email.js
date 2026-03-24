// Initialize EmailJS
(function () {
    emailjs.init("nuUqMa3EGNOqNLkPz");
})();

// Handle Contact Form
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contactForm");

    if (!form) return;

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        // Send email to Admin
        emailjs.sendForm(
            "service_w3oub04",
            "template_up6wn9j",
            this
        );

        // Send auto-reply to User
        emailjs.sendForm(
            "service_w3oub04",
            "template_eljfqp6",
            this
        );

        alert("Thank you! Your message has been sent successfully.");
        this.reset();
    });
});
