<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>上传</title>
</head>
<body>
	<?php 
	echo "正在添加数据...<br/>";
	$xmlpatch="content.xml";

	$doc=new DOMDocument('1.0','utf-8');
	$doc->formatOutput=true;
	$doc->load($xmlpatch);
	$insert=$doc->createElement("example");
	$insert->setAttribute("type",$_POST['type']);

	$title=$doc->createElement("title");
	$txt=$doc->createTextNode($_POST['title']);
	$title->appendChild($txt);

	$date=$doc->createElement('time');
	$time=time();
	$date1=$doc->createTextNode("20".date("y.m.d",$time));
	$date->appendChild($date1);

	$content=$doc->createElement("content");
	$txt=$doc->createTextNode($_POST['content']);
	$content->appendChild($txt);

	$href=$doc->createElement("href");
	$txt=$doc->createTextNode($_POST['type']."/".$_FILES['myfile']['name']);
	$href->appendChild($txt);

	$btntxt=$doc->createElement("btntxt");
	$txt=$doc->createTextNode($_POST['btntxt']);
	$btntxt->appendChild($txt);
	$insert->appendChild($title);
	$insert->appendChild($date);
	$insert->appendChild($content);
	$insert->appendChild($href);
	$insert->appendChild($btntxt);
	$doc->getElementsByTagName('article')->item(0)->appendChild($insert);
    $doc->save($xmlpatch);

    echo "数据添加成功！<br/>";
	echo "正在上传文件...<br/>";
  	if (file_exists("upload/" . $_FILES["myfile"]["name"])){
      	echo $_FILES["myfile"]["name"] . " already exists. ";
    }else{
      	move_uploaded_file($_FILES['myfile']['tmp_name'], $href->nodeValue);
      	echo "文件上传完成！<br/>";
      	echo "<button onclick='javascript:history.back(-1)'>点击返回</button>";
    }
?>
</body>
</html>