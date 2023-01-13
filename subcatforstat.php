<?php

include 'dbconn.php';
$con = openDB();

$sum = 0;
$final = array();
$name= $_POST['select'];
$categorieid = mysqli_query($con, "SELECT sub_id FROM subcategory where subname='$name'");
if (mysqli_num_rows($categorieid) > 0) {
    while ($sub = mysqli_fetch_assoc($categorieid)) {
        $c = $sub['sub_id'];
        $off = mysqli_query($con, "SELECT COUNT(*) AS tof,offer_date FROM offer inner join product on product.pid=offer.product_id inner join subcategory on subcategory.sub_id=product.psub_id where sub_id='$c' GROUP BY offer_date ORDER BY offer_date ASC;");
if (mysqli_num_rows($off) > 0) {
            while ($u = mysqli_fetch_assoc($off)) {
                $sum = 0;
                $count = $u['tof'];
                $od = $u['offer_date'];
                $categoriess = mysqli_query($con, "SELECT product.pid AS prid, offer.price AS offpr FROM offer INNER JOIN product ON product.pid=offer.product_id inner join subcategory on subcategory.sub_id=product.psub_id where sub_id='$c' and offer_date='$od'");
                if (mysqli_num_rows($categoriess) > 0) {
                    while ($cats = mysqli_fetch_assoc($categoriess)) {
                        $op = $cats['offpr'];
                        $prod = $cats['prid'];
                        $ld = mysqli_query($con, "SELECT MAX(dateofp) AS ma FROM prices WHERE prid=$prod GROUP BY prid;");
                       while ($ldd = mysqli_fetch_assoc($ld)) {
                        $md = $ldd['ma'];
                        $lw = mysqli_query($con, "SELECT AVG(priceP) AS avgp FROM prices WHERE prid=$prod AND dateofp BETWEEN date_sub('$md' , INTERVAL 7 DAY) AND '$md'  GROUP BY prid;");
                        while ($lwd = mysqli_fetch_assoc($lw)) {
                                $avgp = $lwd['avgp'];
                                $diff = (($avgp-$op)/$avgp)*100;
                                if($diff>0)
                                {
                                    $sum = $sum + $diff;
                                }
                        }
                    }
                    }
                }
                $u['tof'] = $sum / $count;
                $final[] = $u;
            }
        }
    }
}
echo json_encode($final, JSON_UNESCAPED_UNICODE);
closeDB($con);


?>