<?php

require_once 'lib'.DIRECTORY_SEPARATOR.'curl.php';
require_once 'lib'.DIRECTORY_SEPARATOR.'curl_response.php';

$curl = new Curl;
$response = $curl->get('https://api.github.com/users/yiisoft/repos');

$tuCurl = curl_init(); 
curl_setopt($tuCurl, CURLOPT_URL, "https://api.github.com/users/yiisoft/repos");
$tuData = curl_exec($tuCurl);
curl_close($tuCurl);
var_dump($response);
var_dump($tuData);
