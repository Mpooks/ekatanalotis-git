<?php
session_start();
include 'dbconn.php';
$con = openDB();

$o = $_POST['o'];
$shop = mysqli_query($con, "UPDATE offer SET dislikes=dislikes-1 WHERE offer_id=$o");
$t=mysqli_query($con, "DELETE FROM userlikes WHERE liked_offer=$o AND userid=".$_SESSION['id']);

closeDB($con);


?>