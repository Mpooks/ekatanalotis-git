<?php
session_start();
include 'dbconn.php';
$con = openDB();

$st = $_POST['p'];
$shop = mysqli_query($con, "SELECT stock FROM offer WHERE offer_id=$st");
$arr = array();
if (mysqli_num_rows($shop) > 0) {
    while ($s = mysqli_fetch_assoc($shop)) {
        if($s["stock"]=='YES')
        {
            $ch = mysqli_query($con, "UPDATE offer SET stock='NO' WHERE offer_id=$st");
        }
        else{
            $ch = mysqli_query($con, "UPDATE offer SET stock='YES' WHERE offer_id=$st");
        }
    }
}

closeDB($con);


?>