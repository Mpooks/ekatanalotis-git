<?php

    include 'jsontodbshops.php';
    $currentDir = getcwd();
    $uploadDirectory = "./";

    $errors = []; 

    $fileExtensions = ['json']; 

    $fileName = $_FILES['myfile']['name'];
    $fileTmpName  = $_FILES['myfile']['tmp_name'];
    $fileType = $_FILES['myfile']['type'];
    $fileExtension = pathinfo($fileName, PATHINFO_EXTENSION);

    $uploadPath = $currentDir . $uploadDirectory . basename($fileName); 

    echo $uploadPath;

    if (isset($fileName)) {

        if (! in_array($fileExtension,$fileExtensions)) {
            $errors[] = "This process does not support this file type. Upload a JSON file only.";
        }
        if (empty($errors)) {
            $didUpload = move_uploaded_file($fileTmpName, $uploadPath);
            addshopD($currentDir . $uploadDirectory . basename($fileName));

            if ($didUpload) {
                echo "The file " . basename($fileName) . " has been uploaded.";
            } else {
                echo "An error occurred. Try again or contact your system administrator.";
            }
        } else {
            foreach ($errors as $error) {
                echo $error . "These are the errors" . "\n";
            }
        }
    }
    
?>
