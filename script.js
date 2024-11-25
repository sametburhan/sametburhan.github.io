// Scroll eventi ile iframe'i yüklemek
window.addEventListener('scroll', function () {
    const iframe = document.querySelector('iframe');
    const rect = iframe.getBoundingClientRect();
    if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
        iframe.src = iframe.getAttribute('data-src');
    }
});

let lastTime = 0;
function animate(time) {
    const deltaTime = time - lastTime;
    if (deltaTime > 16) { // 60 FPS
        // Animasyon işlemleri
        lastTime = time;
    }
    requestAnimationFrame(animate);
}
requestAnimationFrame(animate);

document.addEventListener("DOMContentLoaded", function() {
    const iframe = document.querySelector('iframe');
    iframe.src = iframe.dataset.src; // data-src ile kaynak yüklensin
});
