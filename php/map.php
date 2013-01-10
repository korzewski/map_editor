<?php
	$map = $_POST['map_object'];
	$map = json_decode(json_encode($map));

	if($map->action == 'load'){
		//$content = file_get_contents($file_url);
		echo 'load map';
	} else if($map->action == 'save'){
		$mapData = json_decode($map->mapData);
		$file_url = $mapData[0][0]->mapName.'.map';
		
		file_put_contents($file_url, json_encode($mapData));
		
		echo 'save | mapName: '.$mapData[0][0]->mapName;
	} else{
		echo 'error - unknow action';
	}
?>