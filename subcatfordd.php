<?php

include 'dbconn.php';
$con = openDB();

$cd= $_POST['cs'];
$categoriess = mysqli_query($con, "SELECT sub_id,cat_id,subname,cname FROM subcategory INNER JOIN pcategory ON subcategory.cat_id=pcategory.cid where cat_id='$cd'");
$arr = array();

if (mysqli_num_rows($categoriess) > 0) {
    while ($cats = mysqli_fetch_assoc($categoriess)) {
        $arr[]=$cats;
    }
}

echo json_encode($arr, JSON_UNESCAPED_UNICODE);
closeDB($con);


?>