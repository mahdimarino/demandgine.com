<?php

$whmcs_url = 'https://hostingtheme.net/whmcs'; // url where your whmcs installed

$domain_name = $_REQUEST['domain_name'];
if (isset($_POST['domain_name'])) {
	header('Location:'.$whmcs_url.'/cart.php?a=add&domain=register&query='.$domain_name);
}

?>