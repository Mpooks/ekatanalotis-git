<?php
session_start();
include 'dbconn.php';
$con = openDB();

$user = mysqli_query($con, "SELECT username,total_score FROM users ORDER BY total_score DESC");
$arr = array();
if (mysqli_num_rows($user) > 0) {
    while ($u = mysqli_fetch_assoc($user)) {
        $arr[]=$u;
    }
}

echo json_encode($arr, JSON_UNESCAPED_UNICODE);
closeDB($con);


?>