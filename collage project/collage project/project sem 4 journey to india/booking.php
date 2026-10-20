<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
?>

<?php
$server_name = "localhost";
$username = "root";
$password = "";
$database_name = "travel_vista";

$conn = mysqli_connect($server_name, $username, $password, $database_name);

// Check the connection
if (!$conn) {
    die("Connection Failed: " . mysqli_connect_error());
}


if ($_SERVER['REQUEST_METHOD'] === 'POST') 
{    
    // Fetch form values safely using isset() or default to empty values
    $destination = isset($_POST['destination']) ? $_POST['destination'] : '';
    $departure_date = isset($_POST['departure-date']) ? $_POST['departure-date'] : '';
    $return_date = isset($_POST['return-date']) ? $_POST['return-date'] : '';
    $adults = isset($_POST['adults']) ? intval($_POST['adults']) : 1;
    $children = isset($_POST['children']) ? intval($_POST['children']) : 0;
    $special_requests = isset($_POST['special-requests']) ? $_POST['special-requests'] : '';
    $package_type = isset($_POST['package-type']) ? $_POST['package-type'] : '';  // Make sure this is being set

    // Check if required fields like 'destination' are not empty
    if (empty($destination)) {
        die("Error: Destination is required."); 
    }

    // Prepare the SQL query with placeholders to avoid SQL injection
    $sql_query = "INSERT INTO bookings (adults, children, departure_date, destination, package_type, return_date, special_requests) 
              VALUES (?, ?, ?, ?, ?, ?, ?)";

if ($stmt = mysqli_prepare($conn, $sql_query)) {
    // Corrected order and types
    mysqli_stmt_bind_param($stmt, "iisssss", 
        $adults, 
        $children, 
        $departure_date, 
        $destination, 
        $package_type, 
        $return_date, 
        $special_requests
    );

    if (mysqli_stmt_execute($stmt)) {
        echo "New details entry inserted successfully!";
    } else {
        echo "Error executing statement: " . mysqli_stmt_error($stmt);
    }

    mysqli_stmt_close($stmt);
} else {
    echo "Error preparing statement: " . mysqli_error($conn);
}

    // Close the database connection
 //   mysqli_close($conn);
}
?>
