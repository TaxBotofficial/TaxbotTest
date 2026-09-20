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

// 🎛️ 2. Vietējās JSON datubāzes pieslēgums (Async Fetch)
document.getElementById('taxbot-lead-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const emailInput = document.getElementById('client-email');
    const statusText = document.getElementById('form-status');
    
    statusText.innerText = "Connecting to TaxBot core...";
    statusText.style.color = "#a1a1aa";

    try {
        const response = await fetch('/save-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: emailInput.value })
        });

        if (response.ok) {
            statusText.innerText = "✓ Success. Your store account is prioritized.";
            statusText.style.color = "#4ade80"; // Premium gaiši zaļš
            emailInput.value = "";
        } else {
            throw new Error();
        }
    } catch (error) {
        statusText.innerText = "✕ Database connection error. Try again.";
        statusText.style.color = "#f87171"; // Premium maigi sarkans
    }
});
