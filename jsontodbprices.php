<?php

include 'dbconn.php';
$con=openDB();


$jsondata = file_get_contents('products_prices.json');
$data = json_decode($jsondata, true);

$product = $data['data'];

foreach($product as $p)
{
    $i = $p['id'];
    $pricep = $p['prices'];

    foreach($pricep as $pr)
    {
        $d = $pr['date'];
        $pri = $pr['price'];

        $sql = "INSERT INTO prices VALUES($i,'$d',$pri)";
        if(mysqli_query($con, $sql)){
           echo "Records inserted successfully.";
        } 
        else{
        echo "ERROR: Could not able to execute $sql. " . mysqli_error($con);
        }
    }
}

closeDB($con);

?>