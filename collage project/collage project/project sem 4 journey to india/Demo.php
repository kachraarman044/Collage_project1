<?php
// Database config
$server_name   = "localhost";
$username      = "root";
$password      = "";
$database_name = "travel_vista";

// Connect DB
$conn = new mysqli($server_name, $username, $password, $database_name);
if ($conn->connect_error) {
    $message = "<p style='color:red;'>❌ Connection failed: " . $conn->connect_error . "</p>";
} else {
    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
        $name             = trim($_POST['name'] ?? '');
        $email            = trim($_POST['email'] ?? '');
        $password_plain   = $_POST['password'] ?? '';
        $confirm_password = $_POST['confirm_password'] ?? '';

        // Validation
        if (empty($name) || empty($email) || empty($password_plain) || empty($confirm_password)) {
            $message = "<p style='color:red;'>❌ Please fill all fields.</p>";
        } elseif ($password_plain !== $confirm_password) {
            $message = "<p style='color:red;'>❌ Passwords do not match.</p>";
        } else {
            // Hash password
            $password_hashed = password_hash($password_plain, PASSWORD_DEFAULT);

            // Duplicate check
            $check = $conn->prepare("SELECT email FROM users WHERE email = ?");
            $check->bind_param("s", $email);
            $check->execute();
            $check->store_result();

            if ($check->num_rows > 0) {
                $message = "<p style='color:red;'>❌ Email already registered.</p>";
            } else {
                $stmt = $conn->prepare("INSERT INTO users (name, email, password) VALUES (?, ?, ?)");
                if ($stmt) {
                    $stmt->bind_param("sss", $name, $email, $password_hashed);
                    if ($stmt->execute()) {
                        $message = "<p style='color:green;'>✅ Registration successful! You can now login.</p>";
                    } else {
                        $message = "<p style='color:red;'>❌ Insert failed: " . $stmt->error . "</p>";
                    }
                    $stmt->close();
                } else {
                    $message = "<p style='color:red;'>❌ Prepare failed: " . $conn->error . "</p>";
                }
            }
            $check->close();
        }
    } else {
        $message = "<p style='color:red;'>❌ Invalid request.</p>";
    }
}
$conn->close();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Registration Status</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background: #f4f4f9;
            display: flex;
            height: 100vh;
            align-items: center;
            justify-content: center;
        }
        .container {
            background: #fff;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0px 0px 10px rgba(0,0,0,0.2);
            text-align: center;
        }
        p {
            font-size: 18px;
            font-weight: bold;
        }
        a {
            display: inline-block;
            margin-top: 15px;
            padding: 10px 20px;
            background: #007bff;
            color: #fff;
            border-radius: 5px;
            text-decoration: none;
        }
        a:hover {
            background: #0056b3;
        }
    </style>
</head>
<body>
    <div class="container">
        <?= $message; ?>
        <a href="login1.html">Go to Login</a> 
    </div>
</body>
</html>
