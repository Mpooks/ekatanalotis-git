<?php

include 'dbconn.php';
$con = openDB();

$catn= $_POST['c'];
$categories = mysqli_query($con, "SELECT subname FROM subcategory INNER JOIN pcategory ON subcategory.cat_id=pcategory.cid WHERE pcategory.cname='$catn'");
$arr = array();

if (mysqli_num_rows($categories) > 0) {
    while ($cat = mysqli_fetch_assoc($categories)) {
        $arr[]=$cat;
    }
}

echo json_encode($arr, JSON_UNESCAPED_UNICODE);
closeDB($con);


?>