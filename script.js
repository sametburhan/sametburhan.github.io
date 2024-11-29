// Popup ekranını göster
window.onload = function() {
  setTimeout(() => {
    document.getElementById("popup").classList.add("show");
  }, 100);
};

// Popup ekranını kapat
function closePopup() {
  document.getElementById("popup").classList.remove("show");
}