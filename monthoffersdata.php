<?php
session_start();
include 'dbconn.php';
$con = openDB();

$off = mysqli_query($con, "SELECT COUNT(*) AS tof,offer_date FROM offer GROUP BY offer_date ORDER BY offer_date ASC;");
$arr = array();
if (mysqli_num_rows($off) > 0) {
    while ($u = mysqli_fetch_assoc($off)) {
        $arr[]=$u;
    }
}

echo json_encode($arr, JSON_UNESCAPED_UNICODE);
closeDB($con);

?>
