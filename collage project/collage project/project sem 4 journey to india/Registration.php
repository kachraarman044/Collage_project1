<?php
// Show all errors (development time)
// Production में आप इन 2 lines को comment कर सकते हो
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Database config
$server_name   = "localhost";
$username      = "root";
$password      = "";
$database_name = "travel_vista";

// Database connect
$conn = new mysqli($server_name, $username, $password, $database_name);
if ($conn->connect_error) {
    die("<p style='color:red;'>❌ Connection failed: " . $conn->connect_error . "</p>");
}

// Handle form submit
if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    $name             = trim($_POST['name'] ?? '');
    $email            = trim($_POST['email'] ?? '');
    $password_plain   = $_POST['password'] ?? '';
    $confirm_password = $_POST['confirm_password'] ?? '';

    // Check empty fields
    if (empty($name) || empty($email) || empty($password_plain) || empty($confirm_password)) {
        die("<p style='color:red;'>❌ Please fill all fields.</p>");
    }

    // Check confirm password
    if ($password_plain !== $confirm_password) {
        die("<p style='color:red;'>❌ Passwords do not match.</p>");
    }

    // Hash password
    $password_hashed = password_hash($password_plain, PASSWORD_DEFAULT);

    // Check duplicate email
    $check = $conn->prepare("SELECT email FROM users WHERE email = ?");
    $check->bind_param("s", $email);
    $check->execute();
    $check->store_result();

    if ($check->num_rows > 0) {
        $check->close();
        die("<p style='color:red;'>❌ Email already registered.</p>");
    }
    $check->close();

    // Insert user
    $stmt = $conn->prepare("INSERT INTO users (name, email, password) VALUES (?, ?, ?)");
    if (!$stmt) {
        die("<p style='color:red;'>❌ Prepare failed: " . $conn->error . "</p>");
    }

    $stmt->bind_param("sss", $name, $email, $password_hashed);

    if ($stmt->execute()) {
        echo "<p style='color:green;'>✅ Registration successful! You can now login.</p>";
        // 👉 अगर आप चाहो तो यहाँ redirect भी कर सकते हो
        // header("Location: login.html?success=1");
        // exit;
    } else {
        die("<p style='color:red;'>❌ Insert failed: " . $stmt->error . "</p>");
    }

    $stmt->close(); 
}

$conn->close();
?>
