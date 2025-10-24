// Fetch previously chosen colors on page load
fetch('save_colors.php')
    .then(response => response.json())
    .then(data => {
        chosenColors = data;
        drawWheel();
    });

// After selecting a color
function stopWheel() {
    spinning = false;
    const winningColor = colors[Math.floor((currentAngle / (2 * Math.PI)) * colors.length)];

    if (!chosenColors.includes(winningColor)) {
        chosenColors.push(winningColor);
        // Send the selected color to PHP session
        fetch('save_colors.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ color: winningColor })
        })
        .then(response => response.json())
        .then(data => {
            chosenColors = data;
            drawWheel();
        });
    }
}
