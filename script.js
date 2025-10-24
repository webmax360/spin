const canvas = document.getElementById('roulette-wheel');
const ctx = canvas.getContext('2d');

const colors = [
    '#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#0000FF', '#4B0082', '#9400D3',
    '#FF6347', '#8A2BE2', '#FFD700', '#ADFF2F', '#20B2AA', '#D2691E', '#8B0000'
];

// Store chosen colors in session storage
let chosenColors = JSON.parse(sessionStorage.getItem('chosenColors')) || [];

const spinButton = document.getElementById('spinButton');
const stopButton = document.getElementById('stopButton');

let spinning = false;
let currentAngle = 0;
let targetAngle = 0;

function drawWheel() {
    const sliceCount = colors.length;
    const sliceAngle = 2 * Math.PI / sliceCount;

    // Clear the previous drawing
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the color wheel
    for (let i = 0; i < sliceCount; i++) {
        const color = colors[i];
        if (chosenColors.includes(color)) continue;  // Skip chosen colors

        ctx.beginPath();
        ctx.moveTo(200, 200);  // Center of the wheel
        ctx.arc(200, 200, 150, i * sliceAngle, (i + 1) * sliceAngle);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.stroke();
    }
}

function spinWheel() {
    spinning = true;
    targetAngle = Math.random() * 2 * Math.PI + Math.PI * 2;
    animateSpin();
}

function animateSpin() {
    if (spinning) {
        currentAngle += (targetAngle - currentAngle) * 0.1;  // Gradual approach
        drawWheel();
        requestAnimationFrame(animateSpin);
    }
}

function stopWheel() {
    spinning = false;
    const winningColor = colors[Math.floor((currentAngle / (2 * Math.PI)) * colors.length)];

    // Mark the color as chosen and update session storage
    if (!chosenColors.includes(winningColor)) {
        chosenColors.push(winningColor);
        sessionStorage.setItem('chosenColors', JSON.stringify(chosenColors));
    }

    // Re-render the wheel without the chosen color
    drawWheel();
}

// Event Listeners
spinButton.addEventListener('click', () => {
    drawWheel();
    spinWheel();
});

stopButton.addEventListener('click', stopWheel);

// Initial drawing
drawWheel();
