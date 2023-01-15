<?php
session_start();
include 'dbconn.php';
$con = openDB();
$arr = array();
if (isset($_SESSION['id'])){
    $arr[] = 0;
}else{
    $arr[] = 1;
}

echo json_encode($arr, JSON_UNESCAPED_UNICODE);

closeDB($con);


?>