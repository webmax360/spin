<?php
session_start();

// Initialize chosen colors if not already in session
if (!isset($_SESSION['chosenColors'])) {
    $_SESSION['chosenColors'] = [];
}

// Add color to session (on Stop button click)
if (isset($_POST['color'])) {
    $color = $_POST['color'];
    if (!in_array($color, $_SESSION['chosenColors'])) {
        $_SESSION['chosenColors'][] = $color;
    }
    echo json_encode($_SESSION['chosenColors']);
    exit;
}

// Return chosen colors on page load
echo json_encode($_SESSION['chosenColors']);
?>
