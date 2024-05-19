<?php
include 'config.php';
session_start();

$loginMessage = $registerMessage = array();

if(isset($_POST['login'])){
   $email = mysqli_real_escape_string($conn, $_POST['email']);
   $pass = $_POST['password'];

   if(empty($email) || empty($pass)) {
      $loginMessage[] = 'Email dan kata sandi harus diisi!';
   } else {
      $select = mysqli_query($conn, "SELECT * FROM `user_form` WHERE email = '$email'") or die('query failed');

      if(mysqli_num_rows($select) > 0){
         $row = mysqli_fetch_assoc($select);

         // Verify the password using password_verify
           if (password_verify($pass, $row['password'])) {
            $_SESSION['user_id'] = $row['id'];
            header('location:default.html');
         } else {
            $loginMessage[] = 'Email atau kata sandi salah!';
         }
      } else {
         $loginMessage[] = 'Email atau kata sandi salah!';
      }
   }
}

if (isset($_POST['register'])) {
    $name = mysqli_real_escape_string($conn, $_POST['name']);
    $email = mysqli_real_escape_string($conn, $_POST['email']);
    $pass = $_POST['password'];

    if (empty($name) || empty($email) || empty($pass)) {
        $registerMessage[] = 'Semua kolom harus diisi!';
    } else {
        $select = mysqli_query($conn, "SELECT * FROM `user_form` WHERE email = '$email'") or die('query failed');

        if (mysqli_num_rows($select) > 0) {
            $registerMessage[] = 'User telah ada!';
        } else {
            // Hash the password using password_hash
            $hashed_password = password_hash($pass, PASSWORD_DEFAULT);

            $insert = mysqli_query($conn, "INSERT INTO `user_form`(name, email, password) VALUES('$name', '$email', '$hashed_password')") or die('query failed');

            if ($insert) {
                $registerMessage[] = 'Berhasil mendaftar!';
                // Comment out the redirection to login.php
                // header('location:login.php');
            } else {
                $registerMessage[] = 'Gagal mendaftar';
            }            
        }
    }
}
?>

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <link rel="stylesheet" href="CSS/login.css?v=<?php echo time(); ?>">
    <title>Login | Kidslamic</title>
  </head>
  <body>
    <div class="container" id="container">
        <!-- Form container for login -->
        <div class="form-container masuk">
            <form action="" method="post">
                <h1>Masuk</h1>
                <?php
                  if(isset($loginMessage) && !empty($loginMessage)){
                     foreach($loginMessage as $msg){
                        echo "<p class='error'>$msg</p>";
                     }
                  }
                ?>
                <span>Masuk menggunakan email dan kata sandi anda</span>
                <input type="email" name="email" placeholder="Email">
                <input type="password" name="password" placeholder="Password">
                <button type="submit" name="login">Masuk</button>
            </form>
        </div>

        <!-- Form container for registration -->
        <div class="form-container daftar">
            <form action="" method="post">
                <h1>Buat Akun</h1>
                <?php
                if (isset($registerMessage) && !empty($registerMessage)) {
                    foreach ($registerMessage as $msg) {
                        echo "<p class='error'>$msg</p>";
                    }
                }
                ?>
                <span>Mendaftar menggunakan email</span>
                <input type="text" name="name" placeholder="Name" required>
                <input type="email" name="email" placeholder="Email" required>
                <input type="password" name="password" placeholder="Password" required>
                <!-- Removed Confirm Password field -->
                <button type="submit" name="register">Daftar</button>
            </form>
        </div>


        <div class="toggle-container">
            <div class="toggle">
                <div class="toggle-panel toggle-left">
                    <h1>Selamat datang!</h1>
                    <p>Daftar menggunakan detail pribadi anda untuk menggunakan semua fitur Kidslamic</p>
                    <button class="hidden" id="login">Masuk</button>
                </div>
                <div class="toggle-panel toggle-right">
                    <h1>Halo, teman!</h1>
                    <p>Masukkan detail pribadi anda untuk menggunakan semua fitur Kidslamic</p>
                    <button class="hidden" id="register">Daftar</button>
                </div>
            </div>
        </div>
    </div>
        <script src="JS/login.js"></script>
  </body>
</html>