// 🚀 1. Gludas skrollēšanas animācijas dzinējs
function revealElements() {
    const reveals = document.querySelectorAll(".reveal");
    for (let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight;
        const elementTop = reveals[i].getBoundingClientRect().top;
        const elementVisible = 100;
        
        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        }
    }
}

window.addEventListener("scroll", revealElements);
window.addEventListener("load", revealElements);

// 🎛️ 2. ZIBENSĀTRA INTEGRĀCIJA AR TAVU GOOGLE SHEETS TABULU
document.getElementById('taxbot-lead-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const emailInput = document.getElementById('client-email');
    const statusText = document.getElementById('form-status');
    
    statusText.innerText = "Connecting to TaxBot core...";
    statusText.style.color = "#a1a1aa";

    // Oficiālās Google formas tehniskās konfigurācijas
    const GOOGLE_FORM_URL = "https://google.com"; 
    const GOOGLE_ENTRY_ID = "entry.1838576156";

    const formData = new FormData();
    formData.append(GOOGLE_ENTRY_ID, emailInput.value);

    // Nosūta e-pastu pa taisno uz tavu Google izklājlapu
    fetch(GOOGLE_FORM_URL, {
        method: "POST",
        mode: "no-cors",
        body: formData
    }).then(() => {
        statusText.innerText = "✓ Success. Your store account is prioritized.";
        statusText.style.color = "#4ade80"; // Premium maigi zaļš panākumu signāls
        emailInput.value = ""; // Notīra ievades lauku
    }).catch(() => {
        statusText.innerText = "✕ Connection error. Try again.";
        statusText.style.color = "#f87171";
    });
});
