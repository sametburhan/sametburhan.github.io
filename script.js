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

// Fare hareketi dinleyicisi
document.body.addEventListener('mousemove', (e) => {
  const x = e.clientX; // Fare X konumu
  const y = e.clientY; // Fare Y konumu
  const width = window.innerWidth;
  const height = window.innerHeight;

  // Yüzdelik pozisyonlar
  const xPercent = (x / width) * 100;
  const yPercent = (y / height) * 100;

  // Dinamik gradient arka plan
  document.body.style.background = `
      radial-gradient(circle at ${xPercent}% ${yPercent}%, 
      black, #000000)
  `;
});

document.querySelectorAll("*").forEach((el) => {
  const computedStyle = window.getComputedStyle(el);
  for (let prop of ["width", "height", "fontSize", "margin", "padding"]) {
    if (computedStyle[prop].includes("px")) {
      let pxValue = parseFloat(computedStyle[prop]);
      let remValue = pxValue / 16; // 16px = 1rem varsayımıyla
      el.style[prop] = remValue + "rem";
    }
  }
});
