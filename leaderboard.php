<?php
session_start();
include 'dbconn.php';
$con = openDB();

$user = mysqli_query($con, "SELECT @rn:=@rn+1 AS rank1,username,total_score,last_tokens,total_tokens FROM ( SELECT username,total_score,last_tokens,total_tokens FROM users ORDER BY total_score DESC) t1, (SELECT @rn:=0) t2;");
$arr = array();
if (mysqli_num_rows($user) > 0) {
    while ($u = mysqli_fetch_assoc($user)) {
        $arr[]=$u;
    }
}

echo json_encode($arr, JSON_UNESCAPED_UNICODE);
closeDB($con);

?>
