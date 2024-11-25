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

/* Open when someone clicks on the span element */
function openNav() {
  document.getElementById("myNav").style.width = "100%";
}

/* Close when someone clicks on the "x" symbol inside the overlay */
function closeNav() {
  document.getElementById("myNav").style.width = "0%";
}