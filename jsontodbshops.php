<?php
session_start();
include 'dbconn.php';

function addShopD($filename)
{
    $con = openDB();

    $jsondata = file_get_contents($filename);
    $data = json_decode($jsondata, true);

    $element = $data['elements'];

    foreach ($element as $e) {
        $sid = $e['id'];
        $slat = $e['lat'];
        $slon = $e['lon'];
        
        $types = $e['tags']['shop'];

        if (array_key_exists('name', $e['tags'])) {
            $name = $e['tags']['name'];
        }else{
        $name = "Unknown";
        }
        $thisshop = mysqli_query($con, "SELECT * FROM shop WHERE shopid=$sid");
        if (mysqli_num_rows($thisshop) > 0) {
            $updateshop = mysqli_query($con, "UPDATE shop SET sname='$name',stype='$types',latitude=$slat,longitude=$slon WHERE shopid=$sid");
        } else {
            $sql = mysqli_query($con, "INSERT INTO shop VALUES($sid,'$name','$types',$slat,$slon)");
        }
    }
    unlink($filename);

    closeDB($con);
}



?>