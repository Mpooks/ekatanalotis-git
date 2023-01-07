<?php

include 'dbconn.php';
$con = openDB();

$categories = mysqli_query($con, "SELECT cid,cname FROM pcategory");
$arr = array();

if (mysqli_num_rows($categories) > 0) {
    while ($cat = mysqli_fetch_assoc($categories)) {
        $arr[]=$cat;
    }
}

echo json_encode($arr, JSON_UNESCAPED_UNICODE);
closeDB($con);


?>