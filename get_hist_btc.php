<?php

function getRepo() {
    file_put_contents("/var/www/html/data.json", file_get_contents('https://api.coindesk.com/v1/bpi/historical/close.json'));
}

getRepo();

$btcVolFile = fopen("/var/www/html/btcVolFile.txt", "w") or die ("Unable to open file!");

$dataFile = file_get_contents("/var/www/html/data.json");

$jsonIterator = new RecursiveIteratorIterator(
    new RecursiveArrayIterator(json_decode($dataFile, TRUE)),
    RecursiveIteratorIterator::SELF_FIRST);

$sum = 0.0;
$count = 0.0;
$p1 = 0.0;

foreach ($jsonIterator as $key => $val) {
    if (is_float($val)) {
        if ($count == 0) {
            $p1 = $val;
            $count++;
        } else {
            $sum += log($val/$p1);
            fwrite($btcVolFile, log($val/$p1)."\n");
            $p1 = $val;
            $count++;
        }
    }
}

fclose($btcVolFile);

$avg = $sum/$count;
$dif = 0.0;
$sum2 = 0.0;

$btcVolFile = fopen("/var/www/html/btcVolFile.txt", "r") or die ("Unable to open file!");
$btcVol = fopen("/var/www/html/btcVol.txt", "w") or die ("Unable to open file!");

while (!feof($btcVolFile)) {
    $dif = pow(((float)fgets($btcVolFile)-$avg), 2);
    $sum2 += $dif;
}

fclose($btcVolFile);


fwrite($btcVol, 100*sqrt($sum2/($count-2)));
fclose($btcVol);

?>