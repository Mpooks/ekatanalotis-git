<?php      
    session_start();
    include('dbconn.php');

if (isset($_POST['user']) && isset($_POST['pass'])) {
    $con = openDB();
    $username = $_POST['user'];
    $password = $_POST['pass'];

    $username = stripcslashes($username);
    $password = stripcslashes($password);
    $username = mysqli_real_escape_string($con, $username);
    $password = mysqli_real_escape_string($con, $password);

    $users = mysqli_query($con, "select * from users where  username = '$username' and  passw = '$password'");
    $count = mysqli_num_rows($users);
    $arr = array();

    if ($count == 1) {

        while ($u = mysqli_fetch_assoc($users)) {
            $_SESSION['id'] = $u["id"];
            $arr[] = $u;
        }
    }
    echo json_encode($arr, JSON_UNESCAPED_UNICODE);
    closeDB($con);
}
?>  