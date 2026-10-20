<?php
session_start();

$conn = new mysqli("localhost", "root", "", "travel_vista");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {

    $email = trim($_POST['email']);
    $password = trim($_POST['password']);

    $stmt = $conn->prepare("SELECT id, name, password FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows === 1) {
        $stmt->bind_result($id, $name, $hashedPassword);
        $stmt->fetch();

        if (password_verify($password, $hashedPassword)) {
            $_SESSION['user_id'] = $id;
            $_SESSION['user_name'] = $name;

            echo "<script>alert('Login successful'); window.location='index.html';</script>";
        } else {
            echo "<script>alert('Wrong password'); window.location='login1.html';</script>";
        }
    } else {
        echo "<script>alert('User not found'); window.location='login1.html';</script>";
    }

    $stmt->close();
}

$conn->close();
?>