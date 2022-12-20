<?php

include 'dbconn.php';
$con=openDB();


$jsondata = file_get_contents('products_1670611007.json');
$data = json_decode($jsondata, true);

$product = $data['products'];
$category = $data['categories'];

foreach($category as $c)
{
    $catid = $c['id'];
    $catname = $c['name'];
    $catname = str_replace("'","\'",$catname);
    $catsubcat = $c['subcategories'];

    $sql1 = "INSERT INTO pcategory VALUES('$catid','$catname')";
    if(mysqli_query($con, $sql1)){
       echo "Records inserted successfully.";
    } 
    else{
    echo "ERROR: Could not able to execute $sql1. " . mysqli_error($con);
    }

    foreach($catsubcat as $sc)
    {
        $subname = $sc['name'];
        $subname = str_replace("'","\'",$subname);
        $subuuid = $sc['uuid'];
        
        $sql2 = "INSERT INTO subcategory VALUES('$subuuid','$subname','$catid')";
        if(mysqli_query($con, $sql2)){
           echo "Records inserted successfully.";
        } 
        else{
        echo "ERROR: Could not able to execute $sql2. " . mysqli_error($con);
        }
    }
}

foreach($product as $p)
{
    $pid = $p['id'];
    $name =$p['name'];
    $name = str_replace("'","\'",$name);
    $cat = $p['category'];
    $subcat = $p['subcategory'];

    $sql3 = "INSERT INTO product VALUES($pid,'$name','$subcat','$cat')";
    if(mysqli_query($con, $sql3)){
       echo "Records inserted successfully.";
    } 
    else{
    echo "ERROR: Could not able to execute $sql3. " . mysqli_error($con);
    }
}

closeDB($con);

?>