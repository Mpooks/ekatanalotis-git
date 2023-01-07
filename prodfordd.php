<?php

include 'dbconn.php';
$con = openDB();

$sn= $_POST['sc'];
$scategories = mysqli_query($con, "SELECT pname FROM product WHERE psub_id='$sn'");
$arr = array();

if (mysqli_num_rows($scategories) > 0) {
    while ($scat = mysqli_fetch_assoc($scategories)) {
        $arr[]=$scat;
    }
}

echo json_encode($arr, JSON_UNESCAPED_UNICODE);
closeDB($con);


?>