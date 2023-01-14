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
            if (strcmp($t['username'], $username) === 0) {
                $user1 = mysqli_query($con, "UPDATE users SET username = '$username' WHERE id=" . $_SESSION['id']);
                $arr[] = 0;
            } else if(strcmp($t['username'],$username)!==0) {
                $checkusername1 = mysqli_query($con, "select * from users where username = '$username'");
                $count1 = mysqli_num_rows($checkusername1);
                if ($count1 == 0) {
                    $user2 = mysqli_query($con, "UPDATE users SET username = '$username' WHERE id=" . $_SESSION['id']);
                    $arr[] = 0;
                } else {
                    $arr[] = 1;
                }
            }
            if (strcmp($t['passw'], $password) !== 0) {
                if(!preg_match_all('$\S*(?=\S{8,})(?=\S*[A-Z])(?=\S*[\d])(?=\S*[\W])\S*$', $password)){
                    $arr[] = 2;
            } else {
                $user1 = mysqli_query($con, "UPDATE users SET passw = '$password' WHERE id=" . $_SESSION['id']);
                $arr[] = 0;
            }
            }
            if((strcmp($t['username'], $username) === 0)&&(strcmp($t['passw'], $password) === 0)){
            $arr[] = 3;
            }
    }
}
echo json_encode($arr, JSON_UNESCAPED_UNICODE);
    closeDB($con);

?>  