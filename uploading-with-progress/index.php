<?php
	if(!isset($_FILES['file'])) die('Arquivo nao enviado');
	$file = $_FILES['file'];
	$response = [
		'message' => 'Uploaded',
		'file' => [
			'name' => $file['name'],
			'type' => $file['type']
		]
	];

	header('Content-type: application/json');
	echo json_encode($response);
