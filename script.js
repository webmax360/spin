document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('roulette-wheel');
    const ctx = canvas.getContext('2d');

    // Define an array of colors and their names
    const colorNames = [
        { color: '#FF0000', name: 'Red' },
        { color: '#FF7F00', name: 'Orange' },
        { color: '#FFFF00', name: 'Yellow' },
        { color: '#00FF00', name: 'Green' },
        { color: '#0000FF', name: 'Blue' },
        { color: '#4B0082', name: 'Indigo' },
        { color: '#9400D3', name: 'Violet' },
        { color: '#FF6347', name: 'Tomato' },
        { color: '#8A2BE2', name: 'BlueViolet' },
        { color: '#FFD700', name: 'Gold' },
        { color: '#ADFF2F', name: 'GreenYellow' },
        { color: '#20B2AA', name: 'LightSeaGreen' },
        { color: '#D2691E', name: 'Chocolate' },
        { color: '#8B0000', name: 'DarkRed' }
    ];

    // Store chosen colors in session storage
    let chosenColors = JSON.parse(sessionStorage.getItem('chosenColors')) || [];

    const spinButton = document.getElementById('spinButton');
    const stopButton = document.getElementById('stopButton');

    let spinning = false;
    let currentAngle = 0;
    let targetAngle = 0;
    let anglePerColor = 0;

    // Function to draw the color wheel
    function drawWheel() {
        const sliceCount = colorNames.length;
        anglePerColor = 2 * Math.PI / sliceCount;

        // Clear the canvas before drawing
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw each color segment
        for (let i = 0; i < sliceCount; i++) {
            const { color, name } = colorNames[i];
            if (chosenColors.includes(color)) continue;  // Skip chosen colors

            ctx.beginPath();
            ctx.moveTo(200, 200);  // Center of the wheel
            ctx.arc(200, 200, 150, i * anglePerColor, (i + 1) * anglePerColor);
            ctx.fillStyle = color;
            ctx.fill();
            ctx.lineWidth = 2;
            ctx.stroke();

            // Draw the name of the color in the middle of each slice
            const textAngle = (i * anglePerColor) + (anglePerColor / 2);
            ctx.save();
            ctx.translate(200, 200);
            ctx.rotate(textAngle);
            ctx.fillStyle = 'black';  // Set text color to black
            ctx.font = '14px Arial';
            ctx.fillText(name, 100, 0); // Adjust position as necessary
            ctx.restore();
        }
    }

    // Function to spin the wheel
    function spinWheel() {
        spinning = true;
        targetAngle = Math.random() * 2 * Math.PI + Math.PI * 2;
        animateSpin();
    }

    // Function to animate the spin
    function animateSpin() {
        if (spinning) {
            currentAngle += (targetAngle - currentAngle) * 0.1;  // Gradual approach
            drawWheel();
            requestAnimationFrame(animateSpin);
        }
    }

    // Function to stop the wheel
    function stopWheel() {
        spinning = false;
        const winningColorIndex = Math.floor((currentAngle / (2 * Math.PI)) * colorNames.length);
        const winningColor = colorNames[winningColorIndex].color;

        // Mark the color as chosen and update session storage
        if (!chosenColors.includes(winningColor)) {
            chosenColors.push(winningColor);
            sessionStorage.setItem('chosenColors', JSON.stringify(chosenColors));
        }

        // Draw a pin at the winning color location
        const pinAngle = winningColorIndex * anglePerColor + anglePerColor / 2;
        drawPin(pinAngle);

        // Re-render the wheel without the chosen color
        drawWheel();
    }

    // Function to draw a pin at the stop location
    function drawPin(angle) {
        const pinLength = 20;
        const pinWidth = 5;

        ctx.save();
        ctx.translate(200, 200);
        ctx.rotate(angle);
        ctx.beginPath();
        ctx.moveTo(0, -150);
        ctx.lineTo(pinWidth, -150 - pinLength);
        ctx.lineTo(-pinWidth, -150 - pinLength);
        ctx.closePath();
        ctx.fillStyle = 'black';
        ctx.fill();
        ctx.restore();
    }

    // Event Listeners
    spinButton.addEventListener('click', () => {
        drawWheel();  // Initial drawing of the wheel
        spinWheel();
    });

    stopButton.addEventListener('click', stopWheel);

    // Initial drawing of the wheel
    drawWheel();
});
