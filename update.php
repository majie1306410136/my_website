<?php 
	$xmlpatch="content.xml";

	$doc=new DOMDocument('1.0','utf-8');
	$doc->formatOutput=true;
	$doc->load($xmlpatch);
	$update;
	$example=$doc->getElementsByTagName("example");
	for($i=0;$i<$example->length;$i++){
		if($example->item($i)->getElementsByTagName('title')->item(0)->nodeValue==$_POST['s']){
			$update=$example->item($i);
		}
	}
	$update->getElementsByTagName("title")->item(0)->nodeValue=$_POST['title'];
	$update->getElementsByTagName("time")->item(0)->nodeValue=$_POST['time'];
	$update->getElementsByTagName("content")->item(0)->nodeValue=$_POST['content'];
	$update->getElementsByTagName("href")->item(0)->nodeValue=$_POST['address'];
	$doc->save($xmlpatch);
?>