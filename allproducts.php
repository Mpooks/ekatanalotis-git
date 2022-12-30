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
foreach ($par as $pidd) {
$prices = mysqli_query($con, "SELECT * from prices where prid=$pidd");
    if (mysqli_num_rows($prices) > 0) {       
            $all = mysqli_query($con, "SELECT pname,pimage,TRUNCATE(AVG(priceP),2) AS pp  FROM product INNER JOIN prices ON prices.prid=product.pid WHERE pid=$pidd GROUP BY prices.prid HAVING prices.prid=$pidd");
            
                        if (mysqli_num_rows($all) > 0) {
                            while ($a = mysqli_fetch_assoc($all)) {
                                $arr[] = $a;
                            }
                        }               
    }
    else{
            $all2 = mysqli_query($con, "SELECT pname,pimage, 0 as pp FROM product  WHERE pid=$pidd ");
            
                        if (mysqli_num_rows($all2) > 0) {
                            while ($a2 = mysqli_fetch_assoc($all2)) {
                                $arr[] = $a2;
                            }
                        }
            
                    }
}

echo json_encode($arr, JSON_UNESCAPED_UNICODE);
closeDB($con);


?>