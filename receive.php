<?php
$requestPayload = file_get_contents("php://input");
$object = json_decode($requestPayload, true);

$myfile = fopen("data/scoreboard.json", "w") or die("Unable to open     file!");
fwrite($myfile, $object);
fclose($myfile);

var_dump($object);
?>