<?php
$host = "localhost";
$user = "root";
$pass = "";
$db = "adventurerdb";

$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Handle POST (insert)
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $id = $_POST["Adventurer_ID"];
    $name = $_POST["Name"];
    $level = $_POST["Level"];
    $class = $_POST["Class"];
    $guild = $_POST["Guild_Affiliation"];

    $stmt = $conn->prepare("INSERT INTO adventurerinfo (Adventurer_ID, Name, Level, Class, Guild_Affiliation) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("isiss", $id, $name, $level, $class, $guild);

    if ($stmt->execute()) {
        echo "Adventurer registered! ID: $id";
    } else {
        echo "Error: " . $stmt->error;
    }
    $stmt->close();
    exit;
}

// Handle GET (retrieve)
$result = $conn->query("SELECT * FROM adventurerinfo");
$adventurers = [];

while ($row = $result->fetch_assoc()) {
    $adventurers[] = $row;
}

header("Content-Type: application/json");
echo json_encode($adventurers);

$conn->close();
?>
