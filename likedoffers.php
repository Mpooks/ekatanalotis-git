<?php
session_start();
include 'dbconn.php';
$con = openDB();

$user = mysqli_query($con, "SELECT offer.offer_id as oid,offer.sid as shid,offer.product_id as prid,userlikes.actionl as act FROM offer INNER JOIN userlikes ON userlikes.liked_offer=offer.offer_id WHERE userlikes.userid=".$_SESSION['id']);
$arr = array();
if (mysqli_num_rows($user) > 0) {
    while ($u = mysqli_fetch_assoc($user)) {
        $arr[]=$u;
    }
}

echo json_encode($arr, JSON_UNESCAPED_UNICODE);
closeDB($con);


?>