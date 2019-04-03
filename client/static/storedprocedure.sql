delete FROM measurements where id >= 1;

INSERT INTO `cleanair`.`journey` (`userId`, `startTime`, `endTime`) VALUES ('1', NOW(), NOW());

DELIMITER $$
CREATE PROCEDURE insert_test_data()
BEGIN
  DECLARE i INT DEFAULT 1;

  WHILE i < 1000 DO
	INSERT INTO `measurements` (`userId`, `journeyId`, `dBReading`, `NO2Reading`, `PM10Reading`, `PM25Reading`, `timetaken`, `longitude`, `latitude`)
    VALUES (1,1,rand()*20,rand()*20,1,1,NOW(), -3.21+0.08*rand(), 51.445+rand()*0.05);
    SET i = i + 1;
  END WHILE;
END$$
DELIMITER ;
CALL insert_test_data();
DROP PROCEDURE `cleanair`.`insert_test_data`;