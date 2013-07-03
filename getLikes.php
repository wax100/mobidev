<?php
    
    $host='localhost'; 
    $database='mobidev'; 
    $user='root'; 
    $pswd='';
    
    $dbh = mysql_connect($host, $user, $pswd) or die("Can't connect MySQL.");
    mysql_select_db($database) or die("Can't connet database.");
    
    $db_users = array();
    $users = array();
    $us = $_GET['users'];
    foreach ($us as $u)
    {
        $users[$u]=$u;
    }
    
    $query = "SELECT `user_id`,`status` FROM `likes`";
    $res = mysql_query($query);
    while($row = mysql_fetch_array($res))
    {
        $db_users[$row['user_id']] = (int)$row['status'];
    }
    
    $difference = array_diff_key($users,$db_users); 
    $s='INSERT INTO `mobidev`.`likes` (`id` , `user_id` , `status` ) VALUES ';
    foreach ($difference as $d)
    {
        $s=$s."(NULL , '".$d."', '0' ),";
    }
    $s2 = substr($s, 0, strlen($s)-1);
    
    
    $res = mysql_query($s2);
    
    $query = "SELECT `user_id`,`status` FROM `likes`";
    $res3 = mysql_query($query);
    $result = array();
    while($row = mysql_fetch_array($res3))
    {
        $result[] = array('id'=>$row['user_id'], 'status'=>(int)$row['status']);
    }
    
    mysql_close($dbh);
    die(json_encode($result));