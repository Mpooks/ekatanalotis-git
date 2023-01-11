<?php

include 'dbconn.php';
$con = openDB();

$arr = array();

$products = mysqli_query($con, "SELECT pname FROM product ORDER BY pname");
if (mysqli_num_rows($products) > 0) {
    while ($p = mysqli_fetch_assoc($products)) {
        $arr[] = $p;
    }
}

echo json_encode($arr, JSON_UNESCAPED_UNICODE);
closeDB($con);


?>