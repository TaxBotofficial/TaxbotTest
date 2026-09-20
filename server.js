const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json());

// Norādām ceļu uz tavas lokālās datubāzes mapi Render mākonī
const DATA_DIR = process.env.RENDER_DATA_DIR || __dirname;
const LEADS_FILE = path.join(DATA_DIR, 'leads.json');

// POST Endpoint: Saņem e-pastu un ieraksta leads.json tabulā
app.post('/save-email', (req, res) => {
    const { email } = req.body;

    if (!email || !email.includes('@')) {
        return res.status(400).json({ error: 'Nederīgs e-pasts' });
    }

    let leads = [];
    if (fs.existsSync(LEADS_FILE)) {
        try {
            leads = JSON.parse(fs.readFileSync(LEADS_FILE, 'utf8'));
        } catch (e) {
            leads = [];
        }
    }

    const exists = leads.some(lead => lead.email.toLowerCase() === email.toLowerCase());
    
    if (!exists) {
        leads.push({ email: email, registeredAt: new Date().toISOString() });
        fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2), 'utf8');
        console.log(`[Database] Jauns leads reģistrēts: ${email}`);
    }

    return res.status(200).json({ success: true });
});

// GET Endpoint: Atver tavu jauno, skaisto pelēk-balto landing lapu no pareizās mapes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'taxbot', 'templates', 'landing.html'));
});

// 🔗 JAUNAIS GET ENDPOINT: Nosūta skripta failu (animācijas un formas dzinēju) uz mājaslapu
app.get('/script.js', (req, res) => {
    res.sendFile(path.join(__dirname, 'taxbot', 'templates', 'script.js'));
});

// GET Endpoint: Ja nākotnē vajadzēs atvērt dashboard
app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'taxbot', 'templates', 'dashboard.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`TaxBot dzinējs veiksmīgi strādā uz porta ${PORT}`);
});
