<?php

include 'dbconn.php';
$con = openDB();


$exofother=mysqli_query($con, "SELECT * FROM pcategory WHERE cid='Other'");
 if (mysqli_num_rows($exofother) > 0) {
 $exofothers=mysqli_query($con, "SELECT * FROM subcategory WHERE cat_id='Other'AND sub_id='Other'");
 if (!(mysqli_num_rows($exofother) > 0)) {
 $createotherssc=mysqli_query($con, "INSERT INTO subcategory VALUES('Other','Other','Other')");
 }
 } else {
  $createotherc=mysqli_query($con, "INSERT INTO pcategory VALUES('Other','Other')");
  $createothersc=mysqli_query($con, "INSERT INTO subcategory VALUES('Other','Other','Other')");
 }
$catsp = mysqli_query($con, "UPDATE product SET pcat_id='Other',psub_id='Other'");
$arr = array();
$cats = mysqli_query($con, "DELETE FROM pcategory");
$scats = mysqli_query($con, "DELETE FROM subcategory");
$cat = mysqli_query($con, "SELECT * FROM pcategory");

if (mysqli_num_rows($cat) > 0) {
        $arr[]=1;
}
else{
    $arr[]=0;

}

echo json_encode($arr, JSON_UNESCAPED_UNICODE);
closeDB($con);


?>