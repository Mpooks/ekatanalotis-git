<?php
session_start();
include 'dbconn.php';
$con = openDB();

$o = $_POST['o'];
$shop = mysqli_query($con, "UPDATE offer SET likes=likes-1 WHERE offer_id=$o");
$t=mysqli_query($con, "DELETE FROM userlikes WHERE liked_offer=$o AND userid=".$_SESSION['id']);
$user=mysqli_query($con, "SELECT monthly_score,id from users INNER JOIN offer ON offer.userid=users.id WHERE offer_id=$o");
if (mysqli_num_rows($user) > 0) {
    while ($u = mysqli_fetch_assoc($user)) {
        if($u['monthly_score']>0){
            $t=$u['id'];
            $user = mysqli_query($con, "UPDATE users SET monthly_score=monthly_score-5 WHERE id=$t");
        }
    }
}


closeDB($con);


?>