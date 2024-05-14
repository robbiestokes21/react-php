<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Database credentials
$servername = "192.168.0.30";
$username = "esrobbie";
$password = "Pokemon@2023@?!";
$database = "games";

// Create connection
$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Endpoint for fetching all items
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $result = $conn->query("SELECT * FROM items");
    $items = [];
    while ($row = $result->fetch_assoc()) {
        $items[] = $row;
    }
    echo json_encode($items);
}

// Endpoint for adding an item
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    $name = $data['name'];
    $conn->query("INSERT INTO items (name) VALUES ('$name')");
}

// Endpoint for updating an item
if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    parse_str(file_get_contents("php://input"), $data);
    $id = $data['id'];
    $name = $data['name'];
    $conn->query("UPDATE items SET name='$name' WHERE id=$id");
}

// Handle DELETE request
if ($_SERVER["REQUEST_METHOD"] === "DELETE") {
    $data = $_GET['data'];
}


$conn->close();
?>
