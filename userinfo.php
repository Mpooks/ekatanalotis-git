<?php
session_start();
include 'dbconn.php';
$con = openDB();

$user = mysqli_query($con, "SELECT email,passw,username,total_score,monthly_score,total_tokens,last_tokens FROM users WHERE id=".$_SESSION['id']);
$arr = array();
if (mysqli_num_rows($user) > 0) {
    while ($u = mysqli_fetch_assoc($user)) {
        $arr[]=$u;
    }
}

echo json_encode($arr, JSON_UNESCAPED_UNICODE);
closeDB($con);


?>