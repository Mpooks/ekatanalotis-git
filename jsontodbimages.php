<?php
session_start();
include 'dbconn.php';
function addImage($filename)
{
    $con = openDB();


    $jsondata = file_get_contents($filename);
    $data = json_decode($jsondata, true);

    $product = $data['images'];

    foreach ($product as $p) {
        $i = $p['id'];
        $pim = $p['image'];
            $thisprod = mysqli_query($con, "SELECT * FROM product WHERE pid=$i");
            if (mysqli_num_rows($thisprod) > 0) {
                $updateprod = mysqli_query($con, "UPDATE product SET pimage='$pim' WHERE pid=$i");
            }
    }
    unlink($filename);

    closeDB($con);
}
?>