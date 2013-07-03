<?php
    
    //require_once 'lib'.DIRECTORY_SEPARATOR.'curl.php';
    //require_once 'lib'.DIRECTORY_SEPARATOR.'curl_response.php';
    
    //$curl = new Curl;
    //$response = $curl->get('https://api.github.com/users/yiisoft/repos');
    
    //header('Content-Type: text/html; charset=utf-8;');
    
    
    
    $curl = curl_init();
    
    curl_setopt($curl, CURLOPT_URL, "https://api.github.com/users/yiisoft/repos");
    curl_setopt($curl, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:10.0.1) Gecko/20100101'); 
    curl_setopt($curl, CURLOPT_HEADER, 0);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);  
    curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, 0);
    $cont = curl_exec($curl);
    
    curl_close($curl);
    
    var_dump($cont);
    
    //php_openssl.dll
    //allow_url_include on
    //var_dump(file_get_contents("https://api.github.com/users/yiisoft/repos"));
    
    //Accept:*/*
    /*Accept-Encoding:gzip,deflate,sdch
        Accept-Language:ru-RU,ru;q=0.8,en-US;q=0.6,en;q=0.4
        Cache-Control:max-age=0
        Connection:keep-alive
        Host:api.github.com
        If-Modified-Since:Wed, 03 Jul 2013 10:37:09 GMT
        If-None-Match:"20131bf493212d72c364cce5b2501ee0"
        Origin:http://mobidev.ru
    Referer:http://mobidev.ru/hello.html*/
