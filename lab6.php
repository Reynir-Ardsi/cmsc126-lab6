<?php
$host = "localhost";
$dbname = "studentlist";
$username = "root";
$password = "";

// Connect to MySQL
$conn = new mysqli($host, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Handle POST request to insert student
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = $_POST['name'];
    $age = intval($_POST['age']);
    $email = $_POST['email'];
    $course = $_POST['course'];

    $stmt = $conn->prepare("INSERT INTO students (`Full Name`, Age, `UP-Mail`, Course) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("siss", $name, $age, $email, $course);
    $stmt->execute();
    echo "Student added successfully.";
    exit;
}

// Handle GET request to fetch all students
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $result = $conn->query("SELECT * FROM students");
    $students = array();
    while ($row = $result->fetch_assoc()) {
        $students[] = $row;
    }
    header('Content-Type: application/json');
    echo json_encode($students);
    exit;
}

$conn->close();
?>