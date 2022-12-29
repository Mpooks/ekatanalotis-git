<?php

include 'dbconn.php';
$con = openDB();

$prs = mysqli_query($con, "UPDATE product SET pimage='https://warply.s3.amazonaws.com/applications/ed840ad545884deeb6c6b699176797ed/products/default_product_image.jpg'");
$arr = array();
$arr[]=0;

echo json_encode($arr, JSON_UNESCAPED_UNICODE);
closeDB($con);


?>