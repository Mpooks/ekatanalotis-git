<?php
session_start();
include 'dbconn.php';

function addCat($filename)
{
    $con = openDB();


    $jsondata = file_get_contents($filename);
    $data = json_decode($jsondata, true);

    if (array_key_exists('categories', $data)) {
        $category = $data['categories'];

        foreach ($category as $c) {
            $catid = $c['id'];
            $catname = $c['name'];
            $catname = str_replace("'", "\'", $catname);
            $catsubcat = $c['subcategories'];
            $thiscat = mysqli_query($con, "SELECT * FROM pcategory WHERE cid='$catid'");
           if (mysqli_num_rows($thiscat) > 0) {
            $updatcat = mysqli_query($con, "UPDATE pcategory SET cname='$catname' WHERE cid='$catid'");
            } else {
                $sql1 = mysqli_query($con, "INSERT INTO pcategory VALUES('$catid','$catname')");
            }

            foreach ($catsubcat as $sc) {
                $subname = $sc['name'];
                $subname = str_replace("'", "\'", $subname);
                $subuuid = $sc['uuid'];
                $thissubcat = mysqli_query($con, "SELECT * FROM subcategory WHERE cat_id='$catid' AND sub_id='$subuuid'");
            if (mysqli_num_rows($thissubcat) > 0) {
             $updatesubcat = mysqli_query($con, "UPDATE subcategory SET subname='$subname' WHERE cat_id='$catid' AND sub_id='$subuuid'");
                } else {
                    $sql2 = mysqli_query($con, "INSERT INTO subcategory VALUES('$subuuid','$subname','$catid')");
                }
            }
        }
    }
    if (array_key_exists('products', $data)) {
        $product = $data['products'];

        foreach ($product as $p) {
            $pid = $p['id'];
            $name = $p['name'];
            $name = str_replace("'", "\'", $name);
            $cat = $p['category'];
            $subcat = $p['subcategory'];
            $ex=mysqli_query($con, "SELECT * FROM pcategory WHERE cid='$cat'");
            if (mysqli_num_rows($ex) > 0) {
                $cat = $p['category'];
                $subcat = $p['subcategory'];
            }
            else{
                $exofother=mysqli_query($con, "SELECT * FROM pcategory WHERE cid='Other'");
                if (mysqli_num_rows($exofother) > 0) {
                    $cat = 'Other';
                    $exofothers=mysqli_query($con, "SELECT * FROM subcategory WHERE cat_id='Other'AND sub_id='Other'");
                    if (mysqli_num_rows($exofother) > 0) {
                        $subcat = 'Other';
                    } else {
                        $createotherssc=mysqli_query($con, "INSERT INTO subcategory VALUES('Other','Other','Other')");
                    }
                } else {
                    $createotherc=mysqli_query($con, "INSERT INTO pcategory VALUES('Other','Other')");
                    $createothersc=mysqli_query($con, "INSERT INTO subcategory VALUES('Other','Other','Other')");
                }
            }
            $thisprod = mysqli_query($con, "SELECT * FROM product WHERE pid=$pid");
            if (mysqli_num_rows($thisprod) > 0) {
             $updateprod = mysqli_query($con, "UPDATE product SET pname='$name',psub_id='$subcat',pcat_id='$cat' WHERE pid=$pid");
            } else {
                $sql3 = mysqli_query($con, "INSERT INTO product VALUES($pid,'$name','$subcat','$cat','https://warply.s3.amazonaws.com/applications/ed840ad545884deeb6c6b699176797ed/products/default_product_image.jpg')");
            }
        }
    }
    unlink($filename);

    closeDB($con);
}

?>