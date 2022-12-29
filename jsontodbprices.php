<?php
session_start();
include 'dbconn.php';
function addPrice($filename)
{
    $con = openDB();


    $jsondata = file_get_contents($filename);
    $data = json_decode($jsondata, true);

    $product = $data['data'];

    foreach ($product as $p) {
        $i = $p['id'];
        $pricep = $p['prices'];

        foreach ($pricep as $pr) {
            $d = $pr['date'];
            $pri = $pr['price'];
            if(strpos($d, '/') !== false){
                $thisprod = mysqli_query($con, "SELECT * FROM prices WHERE prid=$i AND dateofp=STR_TO_DATE('$d','%d/%m/%Y')");
                if (mysqli_num_rows($thisprod) > 0) {
                    $updateprod = mysqli_query($con, "UPDATE prices SET priceP=$pri WHERE prid=$i AND dateofp=STR_TO_DATE('$d','%d/%m/%Y')");
                } else {
                    $ex = mysqli_query($con, "SELECT * FROM product WHERE pid=$i");
                    if (mysqli_num_rows($ex) > 0) {
                        $sql = mysqli_query($con, "INSERT INTO prices VALUES($i,STR_TO_DATE('$d','%d/%m/%Y'),$pri)");
                    }
                }
            } else{
                $thisprod = mysqli_query($con, "SELECT * FROM prices WHERE prid=$i AND dateofp='$d'");
            if (mysqli_num_rows($thisprod) > 0) {
                $updateprod = mysqli_query($con, "UPDATE prices SET priceP=$pri WHERE prid=$i AND dateofp='$d'");
            } else {
                $ex = mysqli_query($con, "SELECT * FROM product WHERE pid=$i");
                if (mysqli_num_rows($ex) > 0) {
                    $sql = mysqli_query($con, "INSERT INTO prices VALUES($i,'$d',$pri)");
                }
            }
            }
        }
    }
    unlink($filename);

    closeDB($con);
}
?>