<?php

include 'dbconn.php';
$con = openDB();

$shops = mysqli_query($con, "SELECT shopid,sname,latitude,longitude FROM shop");
$arr = array();

if (mysqli_num_rows($shops) > 0) {
    while ($s = mysqli_fetch_assoc($shops)) {
        $arr[]=$s;
    }
}

echo json_encode($arr, JSON_UNESCAPED_UNICODE);
closeDB($con);


?>