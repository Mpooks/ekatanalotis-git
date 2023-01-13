<?php

include 'dbconn.php';
$con = openDB();

$name= $_POST['select'];
$categorieid = mysqli_query($con, "SELECT cid FROM pcategory where cname='$name'");
if (mysqli_num_rows($categorieid) > 0) {
    while ($catid = mysqli_fetch_assoc($categorieid)) {
        $c = $catid['cid'];
        $categoriess = mysqli_query($con, "SELECT sub_id,subname FROM subcategory INNER JOIN pcategory ON subcategory.cat_id=pcategory.cid where cat_id='$c'");
        $arr = array();

        if (mysqli_num_rows($categoriess) > 0) {
            while ($cats = mysqli_fetch_assoc($categoriess)) {
                $arr[] = $cats;
            }
        }
    }
}

echo json_encode($arr, JSON_UNESCAPED_UNICODE);
closeDB($con);


?>