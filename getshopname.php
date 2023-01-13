<?php
session_start();
include 'dbconn.php';
$con = openDB();
$arr = array();
$sh = $_SESSION['sid'];
$shop = mysqli_query($con, "SELECT sname FROM shop WHERE shopid=$sh");
$count = mysqli_num_rows($shop);
if ($count > 0) {

    while ($s = mysqli_fetch_assoc($shop)) {
        $arr[] = $s;
    }
}
echo json_encode($arr, JSON_UNESCAPED_UNICODE);

closeDB($con);


?>