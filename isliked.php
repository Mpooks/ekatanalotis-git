<?php
session_start();
include 'dbconn.php';
$con = openDB();

$shop = mysqli_query($con, "SELECT actionl,liked_offer FROM userlikes WHERE userid=".$_SESSION['id']);
$arr = array();
if (mysqli_num_rows($shop) > 0) {
    while ($s = mysqli_fetch_assoc($shop)) {
        $arr[] = $s;
    }
}

echo json_encode($arr, JSON_UNESCAPED_UNICODE);
closeDB($con);


?>