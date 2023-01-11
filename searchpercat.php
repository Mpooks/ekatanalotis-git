<?php      
    session_start();
    include('dbconn.php');

if (isset($_POST['select'])) {
    $con = openDB();
    $s = $_POST['select'];

    $off = mysqli_query($con, "SELECT offer.sid as shopid,shop.sname as sname,shop.latitude as latitude,shop.longitude as longitude FROM offer INNER JOIN shop ON shop.shopid=offer.sid INNER JOIN product ON product.pid=offer.product_id INNER JOIN pcategory ON pcategory.cid=product.pcat_id WHERE pcategory.cname='$s' AND offer.active_offer='ACTIVE'");
    $count = mysqli_num_rows($off);
    $arr = array();

    if ($count > 0) {

        while ($o = mysqli_fetch_assoc($off)) {
            $arr[] = $o;
        }
    }
    echo json_encode($arr, JSON_UNESCAPED_UNICODE);
    closeDB($con);
}
?>  