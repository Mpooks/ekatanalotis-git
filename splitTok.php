<?php
session_start();
include 'dbconn.php';
$con = openDB();


$thismon = $_POST['thismonth'];
$findm=mysqli_query($con, "SELECT * FROM updatedMonth WHERE thism='$thismon'");
if (mysqli_num_rows($findm) > 0) {
    while ($fi = mysqli_fetch_assoc($findm)) {
        $check = $fi['idone'];
        if ($check == 'NO') {
            $tot = mysqli_query($con, "SELECT COUNT(*) AS total FROM users");
            if (mysqli_num_rows($tot) > 0) {
                while ($to = mysqli_fetch_assoc($tot)) {
                    $totusers = $to['total'];
                    $tokenstosplit = 100 * $totusers;
                    $tobrspl = 0.8 * $tokenstosplit;
                    $dd = mysqli_query($con, "SELECT SUM(monthly_score) AS msc from users");
                    while ($d = mysqli_fetch_assoc($dd)) {
                        $v = $d['msc'];
                        $ld = mysqli_query($con, "SELECT * FROM  users");
                        while ($ldd = mysqli_fetch_assoc($ld)) {
                            $uid = $ldd['id'];
                            $mscr = $ldd['monthly_score'];
                            $ltok = $tobrspl * $mscr / $v;
                            $upUS = mysqli_query($con, "UPDATE users SET total_score=total_score+monthly_score,last_tokens=$ltok,total_tokens=total_tokens+$ltok,monthly_score=0 WHERE id=$uid");
                        }
                    }
                }
            }
            $up = mysqli_query($con, "UPDATE updatedMonth SET idone='YES' WHERE thism='$thismon'");
        }
    }
}
else{
    $addm=mysqli_query($con, "INSERT INTO updatedMonth VALUES ('$thismon','YES')");
    $tot = mysqli_query($con, "SELECT COUNT(*) AS total FROM users");
            if (mysqli_num_rows($tot) > 0) {
                while ($to = mysqli_fetch_assoc($tot)) {
                    $totusers = $to['total'];
                    $tokenstosplit = 100 * $totusers;
                    $tobrspl = 0.8 * $tokenstosplit;
                    $dd = mysqli_query($con, "SELECT SUM(monthly_score) AS msc from users");
                    while ($d = mysqli_fetch_assoc($dd)) {
                        $v = $d['msc'];
                        $ld = mysqli_query($con, "SELECT * FROM  users");
                        while ($ldd = mysqli_fetch_assoc($ld)) {
                            $uid = $ldd['id'];
                            $mscr = $ldd['monthly_score'];
                            $ltok = $tobrspl * $mscr / $v;
                            $upUS = mysqli_query($con, "UPDATE users SET total_score=total_score+monthly_score,last_tokens=$ltok,total_tokens=total_tokens+$ltok,monthly_score=0 WHERE id=$uid");
                        }
                    }
                }
            }
}
closeDB($con);


?>