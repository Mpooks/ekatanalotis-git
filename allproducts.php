<?php

include 'dbconn.php';
$con = openDB();

$arr = array();
$par = array();

$products = mysqli_query($con, "SELECT pid FROM product ORDER BY pid");
if (mysqli_num_rows($products) > 0) {
    while ($p = mysqli_fetch_assoc($products)) {
        $pid = (int) $p['pid'];
        $par[] = $pid;
    }
}
$prices = mysqli_query($con, "SELECT * from prices");
    if (mysqli_num_rows($prices) > 0) {
        foreach ($par as $pidd) {

            $all = mysqli_query($con, "SELECT pname,pimage,TRUNCATE(AVG(priceP),2) AS pp  FROM product INNER JOIN prices ON prices.prid=product.pid WHERE pid=$pidd GROUP BY prices.prid HAVING prices.prid=$pidd");
            
                        if (mysqli_num_rows($all) > 0) {
                            while ($a = mysqli_fetch_assoc($all)) {
                                $arr[] = $a;
                            }
                        }
            
                    }
    }
    else{
        foreach ($par as $pidd) {

            $all = mysqli_query($con, "SELECT pname,pimage, 0 as pp FROM product  WHERE pid=$pidd ");
            
                        if (mysqli_num_rows($all) > 0) {
                            while ($a = mysqli_fetch_assoc($all)) {
                                $arr[] = $a;
                            }
                        }
            
                    }
    }

echo json_encode($arr, JSON_UNESCAPED_UNICODE);
closeDB($con);


?>