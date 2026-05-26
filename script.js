const emailsData = [
    {
        subject: "Your Account Has Been Locked!",
        sender: "support@secure-bank.com",
        body: "Dear Customer, your account has been locked due to suspicious activity. Please <a href='#'>click here</a> to verify your information.",
        type: "phishing",
        explanation: "Phishing: Urgent language, suspicious link, generic greeting."
    },
    {
        subject: "August Invoice Attached",
        sender: "billing@legitcompany.com",
        body: "Hello John, please find your invoice for August attached. Let us know if you have any questions.<br>Thanks,<br>Billing Team",
        type: "real",
        explanation: "Real: Personalized, no urgent action, correct sender."
    },
    {
        subject: "Update Your Password Immediately",
        sender: "it-support@company-security.com",
        body: "We've noticed unusual activity on your account. <a href='#'>Reset your password</a> to secure your account.",
        type: "phishing",
        explanation: "Phishing: Unusual sender, urgent action, suspicious link."
    },
    {
        subject: "Company Picnic This Friday!",
        sender: "hr@company.com",
        body: "Hi Team! Don’t forget about our annual company picnic this Friday. RSVP if you haven’t already.",
        type: "real",
        explanation: "Real: Internal sender, friendly language, no links."
    },
    {
        subject: "Important: Tax Refund Notification",
        sender: "irs-taxoffice@refunds-gov.com",
        body: "You are eligible for a tax refund. <a href='#'>Claim your refund</a> by submitting your bank information.",
        type: "phishing",
        explanation: "Phishing: Suspicious sender, asks for sensitive info, fake authority."
    },
    {
        subject: "Receipt for Your Purchase",
        sender: "orders@onlinestore.com",
        body: "Thank you for your purchase! Your order #12345 will be shipped soon.",
        type: "real",
        explanation: "Real: Transactional, no unusual requests, correct sender."
    }
];

let shuffledEmails = [];
let score = 0;
let answered = 0;

function shuffle(array) {
    // Fisher–Yates shuffle
    let arr = array.slice();
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function renderEmails() {
    const emailsDiv = document.getElementById('emails');
    emailsDiv.innerHTML = '';
    shuffledEmails.forEach((email, idx) => {
        const card = document.createElement('div');
        card.className = 'email-card';
        card.innerHTML = `
            <strong>Subject:</strong> ${email.subject}<br>
            <strong>From:</strong> ${email.sender}<br>
            <div>${email.body}</div>
            <div class="result" id="result-${idx}"></div>
            <div style="margin-top:8px;">
                <button class="btn-phishing" data-idx="${idx}">Phishing</button>
                <button class="btn-real" data-idx="${idx}">Real</button>
            </div>
        `;
        emailsDiv.appendChild(card);
    });
    document.querySelectorAll('.btn-phishing').forEach(btn => {
        btn.addEventListener('click', e => handleGuess(e, 'phishing'));
    });
    document.querySelectorAll('.btn-real').forEach(btn => {
        btn.addEventListener('click', e => handleGuess(e, 'real'));
    });
}

function handleGuess(event, guessType) {
    const idx = parseInt(event.target.dataset.idx);
    const card = document.getElementsByClassName('email-card')[idx];
    const email = shuffledEmails[idx];
    const resultDiv = document.getElementById(`result-${idx}`);
    if(card.classList.contains('clicked')) return;

    card.classList.add('clicked');
    card.classList.add(email.type);

    if (guessType === email.type) {
        resultDiv.textContent = "Correct! " + email.explanation;
        resultDiv.style.color = email.type === "phishing" ? "#e53935" : "#43a047";
        score++;
    } else {
        resultDiv.textContent = "Incorrect. " + email.explanation;
        resultDiv.style.color = "#e53935";
    }
    answered++;
    updateScore();
    // Disable further clicks
    card.querySelectorAll('button').forEach(btn => btn.disabled = true);
}

function updateScore() {
    document.getElementById('score').textContent =
        `Score: ${score} / ${shuffledEmails.length}`;
    if(answered === shuffledEmails.length) {
        document.getElementById('score').textContent +=
            ` — Game Over!`;
    }
}

function restartGame() {
    score = 0;
    answered = 0;
    shuffledEmails = shuffle(emailsData);
    renderEmails();
    updateScore();
}

document.getElementById('restart').addEventListener('click', restartGame);

window.onload = () => {
    restartGame();
};