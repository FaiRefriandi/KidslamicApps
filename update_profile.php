<?php
include 'config.php';
session_start();
$user_id = $_SESSION['user_id'];

if (isset($_POST['update_profile'])) {
    $update_name = mysqli_real_escape_string($conn, $_POST['update_name']);
    $update_email = mysqli_real_escape_string($conn, $_POST['update_email']);

    mysqli_query($conn, "UPDATE `user_form` SET name = '$update_name', email = '$update_email' WHERE id = '$user_id'") or die('query failed');

    $old_pass = $_POST['old_pass'];
    $new_pass = $_POST['new_pass'];

    if (!empty($new_pass)) {
        $select_pass = mysqli_query($conn, "SELECT password FROM `user_form` WHERE id = '$user_id'") or die('query failed');
        $row = mysqli_fetch_assoc($select_pass);

        // Verify the old password using password_verify
        if (password_verify($old_pass, $row['password'])) {
            // Hash the new password using password_hash
            $new_pass_hashed = password_hash($new_pass, PASSWORD_DEFAULT);

            // Update the password
            mysqli_query($conn, "UPDATE `user_form` SET password = '$new_pass_hashed' WHERE id = '$user_id'") or die('query failed');
            $message[] = 'Kata sandi berhasil diubah!';
        } else {
            $message[] = 'Kata sandi sebelumnya tidak sesuai!';
        }
    }

    $update_image = $_FILES['update_image']['name'];
    $update_image_size = $_FILES['update_image']['size'];
    $update_image_tmp_name = $_FILES['update_image']['tmp_name'];
    $update_image_folder = 'uploaded_img/' . $update_image;

    if (!empty($update_image)) {
        if ($update_image_size > 2000000) {
            $message[] = 'Image is too large';
        } else {
            $image_update_query = mysqli_query($conn, "UPDATE `user_form` SET image = '$update_image' WHERE id = '$user_id'") or die('query failed');
            if ($image_update_query) {
                move_uploaded_file($update_image_tmp_name, $update_image_folder);
            }
            $message[] = 'Foto berhasil diunggah!';
        }
    }
}
?>


<!DOCTYPE html>
<html lang="en">
<head>
   <meta charset="UTF-8">
   <meta http-equiv="X-UA-Compatible" content="IE=edge">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <title>Edit Profil</title>

   <!-- custom css file link  -->
   <link rel="stylesheet" href="CSS/form.css?v=<?php echo time(); ?>">

</head>
<body>
   
<div class="update-profile">

   <?php
      $select = mysqli_query($conn, "SELECT * FROM `user_form` WHERE id = '$user_id'") or die('query failed');
      if(mysqli_num_rows($select) > 0){
         $fetch = mysqli_fetch_assoc($select);
      }
   ?>

   <form action="" method="post" enctype="multipart/form-data">
      <?php
         if($fetch['image'] == ''){
            echo '<img src="image/default-avatar.png">';
         } else {
            echo '<img src="uploaded_image/'.$fetch['image'].'">';
         }
         if(isset($message)){
            foreach($message as $message){
               echo '<div class="message">'.$message.'</div>';
            }
         }
      ?>
      <div class="flex">
         <div class="inputBox">
            <span>Username :</span>
            <input type="text" name="update_name" value="<?php echo $fetch['name']; ?>" class="box">
            <span>Email :</span>
            <input type="email" name="update_email" value="<?php echo $fetch['email']; ?>" class="box">
            <span>Unggah Foto :</span>
            <input type="file" name="update_image" accept="image/jpg, image/jpeg, image/png" class="box">
         </div>
         <div class="inputBox">
            <input type="hidden" name="old_pass" value="<?php echo $fetch['password']; ?>">
            <span>Kata sandi lama :</span>
            <input type="password" name="old_pass" placeholder="Masukkan kata sandi lama" class="box">
            <span>Kata sandi baru :</span>
            <input type="password" name="new_pass" placeholder="Masukkan kata sandi baru" class="box">
         </div>
      </div>
      <input type="submit" value="Perbarui Profil" name="update_profile" class="update-btn">
      <a href="home.php" class="delete-btn">Kembali</a>
   </form>

</div>

</body>
</html>
