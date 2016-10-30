<?php 
if($_GET['name']=="lz"){
	$xmlpatch="content.xml";
	$doc=new DOMDocument('1.0','utf-8');
	$doc->formatOutput=true;
	$doc->load($xmlpatch);
	$del;
	$example=$doc->getElementsByTagName("example");
	for($i=0;$i<$example->length;$i++){
		if($example->item($i)->getElementsByTagName('title')->item(0)->nodeValue==$_GET['s']){
			$del=$example->item($i);
		}
	}
	$doc->getElementsByTagName('article')->item(0)->removeChild($del);
	$doc->save($xmlpatch);
}else if($_GET['name']=="ly"){
	echo $_GET['id'];
	$xmlpatch="reply.xml";
	$doc=new DOMDocument('1.0','utf-8');
	$doc->formatOutput=true;
	$doc->load($xmlpatch);
	$del;
	$comment=$doc->getElementsByTagName("comment");
	for($i=0;$i<$comment->length;$i++){
		if($comment->item($i)->getElementsByTagName('id')->item(0)->nodeValue==$_GET['id']){
			$del=$comment->item($i);
		}
	}
	echo $del->nodeValue;
	$doc->getElementsByTagName('reply')->item(0)->removeChild($del);
	$doc->save($xmlpatch);
}
?>