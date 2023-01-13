<?php
session_start();
include 'dbconn.php';
$con = openDB();
$productn = $_POST['productn'];
$pricev = $_POST['pricev'];
$arr = array();
$u=$_SESSION['id'];
$si= $_SESSION['sid'];

$lwact = 0;
$ldact = 0;
$productn=str_replace("'","\'",$productn);
$fpr = mysqli_query($con, "SELECT pid FROM product WHERE pname='$productn'");
if (mysqli_num_rows($fpr) > 0) {
    while ($fpro = mysqli_fetch_assoc($fpr)) {
        $prod = $fpro['pid'];
        $ex = mysqli_query($con, "SELECT * FROM offer WHERE userid=$u AND product_id=$prod AND sid=$si AND active_offer='ACTIVE'");
        if (mysqli_num_rows($ex) > 0) {
            while ($expr = mysqli_fetch_assoc($ex)) {
                if ($pricev <= 0.8 * $expr['price']) {
                    $exiof = $expr['offer_id'];
                    $ld = mysqli_query($con, "SELECT MAX(dateofp) AS ma FROM prices WHERE prid=$prod GROUP BY prid;");
                    while ($ldd = mysqli_fetch_assoc($ld)) {
                        $md = $ldd['ma'];
                        $ldp = mysqli_query($con, "SELECT priceP FROM prices WHERE prid=$prod AND dateofp='$md';");
                        while ($ldpd = mysqli_fetch_assoc($ldp)) {
                            if ($pricev <= 0.8 * $ldpd['priceP']) {
                                $ldact = 1;
                            }
                        }


                        $lw = mysqli_query($con, "SELECT AVG(priceP) AS avgp FROM prices WHERE prid=$prod AND dateofp BETWEEN date_sub('$md' , INTERVAL 7 DAY) AND '$md'  GROUP BY prid;");
                        while ($lwd = mysqli_fetch_assoc($lw)) {
                            if ($pricev <= 0.8 * $lwd['avgp']) {
                                $lwact = 1;
                            }
                        }
                    }
                    if ($ldact == 1 && $lwact == 1) {
                        $products = mysqli_query($con, "INSERT INTO offer VALUES(NULL,$si,$prod,$pricev,'YES','YES',DATE(NOW()),0,0,'YES',$u,'ACTIVE',DATE_ADD(DATE(NOW()), INTERVAL 7 DAY))");
                        $setin = mysqli_query($con, "UPDATE offer SET active_offer='INACTIVE' WHERE offer_id=$exiof;");
                        $usup = mysqli_query($con, "UPDATE users SET monthly_score=monthly_score+50 WHERE id=$u;");
                        $arr[] = 1;
                    } else if ($ldact == 0 && $lwact == 1) {
                        $products = mysqli_query($con, "INSERT INTO offer VALUES(NULL,$si,$prod,$pricev,'NO','YES',DATE(NOW()),0,0,'YES',$u,'ACTIVE',DATE_ADD(DATE(NOW()), INTERVAL 7 DAY))");
                        $setin = mysqli_query($con, "UPDATE offer SET active_offer='INACTIVE' WHERE offer_id=$exiof;");
                        $usup = mysqli_query($con, "UPDATE users SET monthly_score=monthly_score+20 WHERE id=$u;");
                        $arr[] = 2;
                    } else if ($ldact == 1 && $lwact == 0) {
                        $products = mysqli_query($con, "INSERT INTO offer VALUES(NULL,$si,$prod,$pricev,'YES','NO',DATE(NOW()),0,0,'YES',$u,'ACTIVE',DATE_ADD(DATE(NOW()), INTERVAL 7 DAY))");
                        $setin = mysqli_query($con, "UPDATE offer SET active_offer='INACTIVE' WHERE offer_id=$exiof;");
                        $usup = mysqli_query($con, "UPDATE users SET monthly_score=monthly_score+50 WHERE id=$u;");
                        $arr[] = 3;
                    } else {
                        $products = mysqli_query($con, "INSERT INTO offer VALUES(NULL,$si,$prod,$pricev,'NO','NO',DATE(NOW()),0,0,'YES',$u,'ACTIVE',DATE_ADD(DATE(NOW()), INTERVAL 7 DAY))");
                        $setin = mysqli_query($con, "UPDATE offer SET active_offer='INACTIVE' WHERE offer_id=$exiof;");
                        $arr[] = 4;
                    }
                } else {
                    $arr[] = 5;
                }
            }
        } else {
            $ld = mysqli_query($con, "SELECT MAX(dateofp) AS ma FROM prices WHERE prid=$prod GROUP BY prid;");
            while ($ldd = mysqli_fetch_assoc($ld)) {
                $md = $ldd['ma'];
                $ldp = mysqli_query($con, "SELECT priceP FROM prices WHERE prid=$prod AND dateofp='$md';");
                while ($ldpd = mysqli_fetch_assoc($ldp)) {
                    if ($pricev <= 0.8 * $ldpd['priceP']) {
                        $ldact = 1;
                    }
                }
                $lw = mysqli_query($con, "SELECT AVG(priceP) AS avgp FROM prices WHERE prid=$prod AND dateofp BETWEEN date_sub('$md' , INTERVAL 7 DAY) AND '$md'  GROUP BY prid;");
                while ($lwd = mysqli_fetch_assoc($lw)) {
                    if ($pricev <= 0.8 * $lwd['avgp']) {
                        $lwact = 1;
                    }
                }
            }
            if ($ldact == 1 && $lwact == 1) {
                $products = mysqli_query($con, "INSERT INTO offer VALUES(NULL,$si,$prod,$pricev,'YES','YES',DATE(NOW()),0,0,'YES',$u,'ACTIVE',DATE_ADD(DATE(NOW()), INTERVAL 7 DAY))");
                $usup = mysqli_query($con, "UPDATE users SET monthly_score=monthly_score+50 WHERE id=$u;");
                $arr[] = 1;
            } else if ($ldact == 0 && $lwact == 1) {
                $products = mysqli_query($con, "INSERT INTO offer VALUES(NULL,$si,$prod,$pricev,'NO','YES',DATE(NOW()),0,0,'YES',$u,'ACTIVE',DATE_ADD(DATE(NOW()), INTERVAL 7 DAY))");
                $usup = mysqli_query($con, "UPDATE users SET monthly_score=monthly_score+20 WHERE id=$u;");
                $arr[] = 2;
            } else if ($ldact == 1 && $lwact == 0) {
                $products = mysqli_query($con, "INSERT INTO offer VALUES(NULL,$si,$prod,$pricev,'YES','NO',DATE(NOW()),0,0,'YES',$u,'ACTIVE',DATE_ADD(DATE(NOW()), INTERVAL 7 DAY))");
                $usup = mysqli_query($con, "UPDATE users SET monthly_score=monthly_score+50 WHERE id=$u;");
                $arr[] = 3;
            } else {
                $products = mysqli_query($con, "INSERT INTO offer VALUES(NULL,$si,$prod,$pricev,'NO','NO',DATE(NOW()),0,0,'YES',$u,'ACTIVE',DATE_ADD(DATE(NOW()), INTERVAL 7 DAY))");
                $arr[] = 4;
            }
        }
    }
}
echo json_encode($arr, JSON_UNESCAPED_UNICODE);
closeDB($con);


?>