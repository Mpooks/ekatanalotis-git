<?php

include 'dbconn.php';
$con = openDB();

$pr = mysqli_query($con, "DELETE FROM prices");
$arr = array();
$p = mysqli_query($con, "SELECT * FROM prices");

if (mysqli_num_rows($p) > 0) {
        $arr[]=1;
}
else{
    $arr[]=0;

}

echo json_encode($arr, JSON_UNESCAPED_UNICODE);
closeDB($con);


?>