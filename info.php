<?php

// Check if the form has been submitted
if (isset($_POST['name']) && isset($_POST['email'])) {
  // Check if the username and password are correct
  $name = $_POST['name'];
  $email = $_POST['email'];

  // Connect to the database
  $db = new PDO('mysql:host=localhost;dbname=mydb', 'username', 'password');

  // Get the user from the database
  $sql = "SELECT * FROM users WHERE name = :name AND email = :email";
  $statement = $db->prepare($sql);
  $statement->bindParam(':name', $name);
  $statement->bindParam(':email', $email);
  $statement->execute();

  // Check if the user was found
  $user = $statement->fetch();

  // If the user was found, log them in
  if ($user) {
    // Set the session variables
    $_SESSION['name'] = $user['name'];
    $_SESSION['email'] = $user['email'];

    // Redirect the user to the home page
    header('Location: index.php');
  } else {
    // The user was not found, show an error message
    echo 'Invalid name or email address.';
  }
}

?>
