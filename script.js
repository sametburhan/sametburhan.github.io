window.addEventListener('scroll', function() {
    let elements = document.querySelectorAll('.fade-in');
    let screenHeight = window.innerHeight;

    elements.forEach(function(element) {
        let elementPosition = element.getBoundingClientRect().top;

        if (elementPosition < screenHeight - 150) {
            element.classList.add('visible');
        }
    });
});

document.querySelector('.contact-btn').addEventListener('click', function() {
    this.classList.add('clicked');
});