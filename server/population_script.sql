USE clean_air;
-- The password is Test!234 for user 1

INSERT INTO user (`id`, `email`, `password`,`shareReadings`) VALUES (1, "test@test.com", "$2b$08$FMuuWmg06wmwwvHxRkwXzOis0VhdbkGO2P6BFXmmaXyGSTSONfeni", 1);

INSERT INTO journey (`id`, `userId`) VALUES (1, 1);
INSERT INTO journey (`id`, `userId`) VALUES (2, 1);
INSERT INTO journey (`id`, `userId`) VALUES (3, 1);
INSERT INTO journey (`id`, `userId`) VALUES (4, 1);
INSERT INTO journey (`id`, `userId`) VALUES (5, 1);

INSERT INTO measurements (`userId`, `journeyId`, `dBReading`, `NO2Reading`, `PM10Reading`, `PM25Reading`, `timeTaken`, `longitude`, `latitude`) VALUES (1, 1, 60.9, 6, 3.5, 7, "2018-11-22 00:38:24",  107.80627000, -7.39755000);
INSERT INTO measurements (`userId`, `journeyId`, `dBReading`, `NO2Reading`, `PM10Reading`, `PM25Reading`, `timeTaken`, `longitude`, `latitude`) VALUES (1, 3, 6.2, 60, 13.5, 70, "2018-04-06 01:39:42",  51.4866, -3.1789);