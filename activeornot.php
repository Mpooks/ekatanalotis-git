<?php
session_start();
include 'dbconn.php';
$con = openDB();

$of=mysqli_query($con, "SELECT * FROM offer");
if (mysqli_num_rows($of) > 0) {
    while ($o = mysqli_fetch_assoc($of)) {  
        $lwact = 0;
        $ldact = 0;  
        $oid = $o['offer_id'];
        $p=$o['product_id'];
        $pr=$o['price'];
        $dd = mysqli_query($con, "SELECT DATEDIFF(date(now()),last_day_of_offer) AS date_difference,price from offer WHERE offer_id=$oid");
        while ($d = mysqli_fetch_assoc($dd)) {
            if($d['date_difference']==0){
                $ld = mysqli_query($con, "SELECT MAX(dateofp) AS ma FROM prices WHERE prid=$p GROUP BY prid;");
                while ($ldd = mysqli_fetch_assoc($ld)) {
                    $md = $ldd['ma'];
                    $ldp = mysqli_query($con, "SELECT priceP FROM prices WHERE prid=$p AND dateofp='$md';");
                    while ($ldpd = mysqli_fetch_assoc($ldp)) {
                        if ($pr <= 0.8 * $ldpd['priceP']) {
                            $uoff = mysqli_query($con, "UPDATE offer SET last_day_of_offer=DATE_ADD(last_day_of_offer, INTERVAL 7 DAY) WHERE offer_id=$oid;");
                            $ldact = 1;
                        }
                    }

                    if ($ldact == 0) {
                        $lw = mysqli_query($con, "SELECT AVG(priceP) AS avgp FROM prices WHERE prid=$p AND dateofp BETWEEN date_sub($md , INTERVAL 7 DAY) AND $md  GROUP BY prid;");
                        while ($lwd = mysqli_fetch_assoc($lw)) {
                            if ($pr <= 0.8 * $lwd['avgp']) {
                                $uoff = mysqli_query($con, "UPDATE offer SET last_day_of_offer=DATE_ADD(last_day_of_offer, INTERVAL 7 DAY) WHERE offer_id=$oid;");
                                $lwact = 1;
                            }
                        }
                        if ($lwact == 0) {
                            $na = mysqli_query($con, "UPDATE offer SET active_offer='INACTIVE' WHERE offer_id=$oid;");
                        }
                    }
                }
            }
        }
    }
}
closeDB($con);


?>