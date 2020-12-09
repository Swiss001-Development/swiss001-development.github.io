<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
ini_set('max_execution_time', 300);
error_reporting(E_ALL);
define('OAUTH2_CLIENT_ID', '722770938609008672');
define('OAUTH2_CLIENT_SECRET', 'VTSnHJ7R3dUTUXKMYT1ezGWdiPXeGsb0');

$authorizeURL = 'https://discord.com/api/oauth2/authorize';
$tokenURL = 'https://discord.com/api/oauth2/token';
$apiURLBase = 'https://discord.com/api/oauth2/users/@me';

session_start(); 

if(get('action') == 'login') {
     $params = array(
          'client_id' => OAUTH2_CLIENT_ID,
          'redirect_uri' => 'https://swissdev.team/swissplus/curl.php',
          'response_type' => 'code',
          'scope' => 'identify guilds'
     );
     header('Location: https://discord.com/api/oauth2/authorize/'.'?'.http_build_query($params));

     var_dump($params);

     die();
}

if(get('code')){
     $token = apiRequest($tokenURL, array(
          "grant_type" => "authorization_code",
          'client_id' => OAUTH2_CLIENT_ID,
          'client_secret' => OAUTH2_CLIENT_SECRET,
          'redirect_uri' => 'https://swissdev.team/swissplus/curl.php',
          'code' => get('code')
     ));
     //$logout_token = $token->access_token;
     $$_SESSION['access_token'] = $token->access_token;
     var_dump($params);

     header('Location: '.$_SERVER['PHP_SELF']);
}
function apiRequest($url, $port=FALSE, $headers=array()){
     $ch = curl_init($url);
     curl_setotp($ch, CURLOPT_IPRESOLVE, CURL_IPRESOLVE_V4);
     curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);

     if($post)
     curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($post));

     $headers[] = 'Accept: application/json';

     if(session('access_token'))
     $headers[] = 'Authorization: Bearer ' . session('access_token');

     curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

     $response = curl_exec($ch);
     //if(curl_exec($ch) === false)
     //{
     //  echo 'Curl error: ' . curl_error($ch);
     // }
     // else
     //{
     // echo 'Operation completed without any errors';
     //}
     var_dump($response);
     return json_decode($response);
     }

     function get($key, $default=NULL) {
     return array_key_exists($key, $_GET) ? $_GET[$key] : $default;
     }

     function session($key, $default=NULL) {
     return array_key_exists($key, $_SESSION) ? $_SESSION[$key] : $default;
     }
?>
