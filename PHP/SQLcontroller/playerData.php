<?php
	//alustetaan tiedot
	$servername = "mysql.labranet.jamk.fi";
	$user = "H3492";
	$pass = "cMcChhJ9jrWcjw3ajX4D3bDUrHBSn7gT";//vaihdetaan my�hemmin hakemaan toisesta tiedostosta
	$returnObject = "";
	if(strlen($_POST['playerName']) > 0){
		$playerName = $_POST['playerName'];
		$playerName = $_POST['playerName'];
	} else {
		$playerName = "testi1";
	}
	//avataan yhteys
	$DBcon = new mysqli($servername,$user,$pass, "H3492_3");
	if ($DBcon->connect_error) {
		die("Connection failed: " . $DBcon->connect_error);
	}
	//query
	$select =
	"select * from playerData
	inner join shipStates
	on shipStates.shipID = playerData.shipID
	inner join loginAttempts
	on loginAttempts.loginFollowID = playerData.loginFollowID
	WHERE playerData.playerID = '$playerName'";

	$query = $DBcon->query($select);//tulokset ovat $query muuttujassa
	$row = $query->fetch_assoc();

	//rakennetaan returnObject muuttuja
	//pelaajan tiedot
	$returnObject ='{"playerData":{"playerName":"'.$row['playerID'].
		'","email":"'.$row['email'] .
		'","money":'.$row['money'].
		',"points":'.$row['points'].'},';
	//pelaajan aluksen tiedot
	$returnObject .= '"shipData":['.$row['wep1'].','.$row['wep2'].','.$row['wep3'].','.$row['wep4'].','.
		$row['pwer1'].','.$row['pwer2'].','.$row['pwer3'].'],';
	$scoreID = $row['scoreID'];
	$select = "select * from highScores where scoreID = $scoreID";
	$query = $DBcon->query($select);
	$lenght = $query->field_count;
	$row = $query->fetch_array();
	$k = 0;
	$returnObject .= '"playerScores":[';
	while($k < $lenght){
		if($k != 0) {
			if($row[$k] != null && $k != 1) {
				$returnObject .= ',' . $row[$k];
			} else if($row[$k] != null && $k == 1){
				$returnObject .= $row[$k];
			}else if($row[$k] == null && $k == 1){
				$returnObject .= '0';
			} else{
				$returnObject .= ',0';
			}
		}
		$k++;
	}
	$returnObject .= ']}';
	//suljetaan yhteys
	$query->close();
	$DBcon->close();
	echo $returnObject;
?>