<?php

include 'dbconn.php';
$con = openDB();

$shops = mysqli_query($con, "DELETE FROM shop");
$arr = array();
$shop = mysqli_query($con, "SELECT * FROM shop");

if (mysqli_num_rows($shop) > 0) {
        $arr[]=1;
}
else{
    $arr[]=0;

}

echo json_encode($arr, JSON_UNESCAPED_UNICODE);
closeDB($con);


?>