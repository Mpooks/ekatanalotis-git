<?php

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

        $sql = "INSERT INTO shop VALUES($sid,'$name','$types',$slat,$slon)";
        if (mysqli_query($con, $sql)) {
            echo "Records inserted successfully.";
        } else {
            echo "ERROR: Could not able to execute $sql. " . mysqli_error($con);
        }
    }

    closeDB($con);
}

?>