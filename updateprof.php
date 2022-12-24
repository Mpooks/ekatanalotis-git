<?php      
    session_start();
    include('dbconn.php');
    $con = openDB();
    $username = $_POST['user'];
    $password = $_POST['pass'];
    $email = $_POST['email'];

    $username = stripcslashes($username);
    $email = stripcslashes($email);
    $password = stripcslashes($password);
    $username = mysqli_real_escape_string($con, $username);
    $email = mysqli_real_escape_string($con, $email);
    $password = mysqli_real_escape_string($con, $password);

    $arr = array();

    $thisuser = mysqli_query($con, "SELECT email,passw,username FROM users WHERE id=".$_SESSION['id']);
if (mysqli_num_rows($thisuser) > 0) {
    while ($t = mysqli_fetch_assoc($thisuser)) {
        if (strcmp($t['email'], $email) === 0) {
            if (strcmp($t['username'], $username) === 0) {
                $user1 = mysqli_query($con, "UPDATE users SET username = '$username',passw = '$password',email = '$email' WHERE id=" . $_SESSION['id']);
                $arr[] = 0;
            } else {
                $checkusername1 = mysqli_query($con, "select * from users where username = '$username'");
                $count1 = mysqli_num_rows($checkusername1);
                if ($count1 == 0) {
                    $user2 = mysqli_query($con, "UPDATE users SET username = '$username',passw = '$password',email = '$email' WHERE id=" . $_SESSION['id']);
                    $arr[] = 0;
                } else {
                    $arr[] = 2;
                }
            }
        } else {
            $checkemail = mysqli_query($con, "select * from users where email = '$email'");
            $ncount = mysqli_num_rows($checkemail);
            if ($ncount == 0) {
                if (strcmp($t['username'], $username) === 0) {
                    $user3 = mysqli_query($con, "UPDATE users SET username = '$username',passw = '$password',email = '$email' WHERE id=" . $_SESSION['id']);
                    $arr[] = 0;
                } else {
                    $checkusername2 = mysqli_query($con, "select * from users where username = '$username'");
                    $count2 = mysqli_num_rows($checkusername2);
                    if ($count2 == 0) {
                        $user4 = mysqli_query($con, "UPDATE users SET username = '$username',passw = '$password',email = '$email' WHERE id=" . $_SESSION['id']);
                        $arr[] = 0;
                    } else {
                        $arr[] = 2;
                    }
                }
            } else {
                $arr[] = 1;
            }
        }
    }
}
echo json_encode($arr, JSON_UNESCAPED_UNICODE);
    closeDB($con);

?>  