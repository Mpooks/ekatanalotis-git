<?php
session_start();
include 'dbconn.php';
$con = openDB();

$sh = $_POST['sh'];
$shop = mysqli_query($con, "DELETE FROM offer WHERE offer_id=$sh");


closeDB($con);


?>