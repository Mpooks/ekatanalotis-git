<?php
session_start();
include 'dbconn.php';
$con = openDB();

$user = mysqli_query($con, "SELECT offer_id,product_id,sid,offer_date,likes,dislikes FROM offer WHERE userid=".$_SESSION['id']);
$arr = array();
if (mysqli_num_rows($user) > 0) {
    while ($u = mysqli_fetch_assoc($user)) {
        $arr[]=$u;
    }
}

echo json_encode($arr, JSON_UNESCAPED_UNICODE);
closeDB($con);


?>