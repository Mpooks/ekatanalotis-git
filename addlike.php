<?php
session_start();
include 'dbconn.php';
$con = openDB();

$o = $_POST['o'];
$t=mysqli_query($con, "INSERT INTO userlikes VALUES(".$_SESSION['id'].",$o,'LIKE')");

closeDB($con);


?>