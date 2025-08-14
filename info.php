<?php
$osname = $_POST["os"];
$osvertion = $_POST["ver"];
$coreCpu = $_POST["core"];
$browername = $_POST["getbrow"];
$browver = $_POST["getbrowVer"];
$vpname = $_POST["currentResolution"];
$time = $_POST["timeZone"];
$lang = $_POST["language"];
$ip = $_POST["ip"];
$date = date('h-i-s');
$data = array(
    'Os-name' => $osname,
    'Os-Vertion' => $osvertion,
    'CPU-core' => $coreCpu,
    'Browser-Name' => $browername,
    'Browser-Vertion' => $browver,
    'Cpu-Archi' => $vpname,
    'Timr-Zone' => $time,
    'Language' => $lang,
    'OS-ip' => $ip,
    'date' => $date
);
$jdata = json_encode($data);
$file = fopen("./info/". $date . '.json', "wb");
fwrite($file, $jdata);
fclose($file);
?>
