<?php
session_start();
include 'dbconn.php';
$con = openDB();


$sid = $_SESSION['sid'];
$shop = mysqli_query($con, "SELECT offer.offer_id AS ofID,product.pname AS pname,offer.price AS pr,offer.lessthanlastday20 AS ld,offer.lessthanlastweek20 AS lw,offer.offer_date AS d,offer.likes AS lik,offer.dislikes AS disl,offer.stock AS st FROM offer INNER JOIN product ON product.pid=offer.product_id WHERE offer.sid=$sid AND offer.active_offer='ACTIVE'");
$arr = array();
if (mysqli_num_rows($shop) > 0) {
    while ($s = mysqli_fetch_assoc($shop)) {
        $arr[]=$s;
    }
}

echo json_encode($arr, JSON_UNESCAPED_UNICODE);
closeDB($con);


?>