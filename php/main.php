<?php

// Проверка, что имя содержит только буквы, от 2 до 60 символов, может содержать только одно тире
function validateName($name) {
	return preg_match('/^[a-zA-Zа-яА-ЯёЁ\-]{2,60}$/', $name);
}

// Проверка, что номер телефона содержит от 11 до 18 символов
function validatePhone($phone) {
	return preg_match('/^[0-9\s\+\-\(\)]{11,18}$/', $phone);
}

$dbc = mysqli_connect('ruzindzt.beget.tech', 'ruzindzt_lh', 'ruzindzt_LH', 'ruzindzt_lh');

$data = json_decode(file_get_contents('php://input'), true);
$name = $data['name'];
$phone = $data['phone'];
$likeApartments = $data['likeApartments'];

// Проверка данных формы
if (!validateName($name) || !validatePhone($phone)) {
	http_response_code(202);
	print json_encode(array('message' => strval($name)));
	mysqli_close($dbc);
	die();
}

$query = "INSERT INTO `feedback` (`name`, `phone`, `likeApartments`) 
					VALUES ('$name', '$phone', '$likeApartments')";

$resultInsert = mysqli_query($dbc, $query);

if ($resultInsert) {
	$queryCount = "SELECT COUNT(*) AS count FROM `feedback`";
	$resultCount = mysqli_query($dbc, $queryCount);

	if ($resultCount) {
			$row = mysqli_fetch_assoc($resultCount);
			$usersCount = $row['count'];

			http_response_code(201);
			header('Content-type: application/json');
			print json_encode(array('message' => strval($usersCount)));
	} else {
			http_response_code(203); // Внутренняя ошибка сервера
			print json_encode(array('message' => 'Ошибка при получении количества строк'));
	}
} else {
	http_response_code(203); // Внутренняя ошибка сервера
	print json_encode(array('message' => 'Ошибка при выполнении SQL-запроса'));
}

mysqli_close($dbc);