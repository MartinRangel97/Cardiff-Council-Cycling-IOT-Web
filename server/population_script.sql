USE CleanAir;



INSERT INTO user (`id`, `email`,`password`,`shareReadings`) VALUES (4, "test@test.com", "hello123%", true);
INSERT INTO user (`id`, `email`,`password`,`shareReadings`) VALUES (3, "test@test.com", "hello123%", true);
INSERT INTO user (`id`, `email`,`password`,`shareReadings`) VALUES (8, "test@test.com", "hello123%", true);
INSERT INTO user (`id`, `email`,`password`,`shareReadings`) VALUES (6, "test@test.com", "hello123%", false);
INSERT INTO user (`id`, `email`,`password`,`shareReadings`) VALUES (5, "test@test.com", "hello123%", true);
INSERT INTO user (`id`, `email`,`password`,`shareReadings`)
 VALUES (7, "test@test.com", "hello123%", false);

INSERT INTO journey (`id`, `userId`,`startTime`, `endTime`) VALUES (1, 4, "2018-11-22 11:21:46", "2018-11-22 11:59:30");
INSERT INTO journey (`id`, `userId`,`startTime`, `endTime`) VALUES (2, 3, "2018-12-22 11:30:46", "2018-12-22 12:59:31");
INSERT INTO journey (`id`, `userId`,`startTime`, `endTime`) VALUES (3, 6, "2018-04-06 16:21:46", "2018-04-06 18:01:28");
INSERT INTO journey (`id`, `userId`,`startTime`, `endTime`) VALUES (4, 5, "2018-09-13 10:09:01", "2018-09-13 12:09:01");
INSERT INTO journey (`id`, `userId`,`startTime`, `endTime`) VALUES (5, 8, "2019-01-17 07:25:06", "2019-01-17 08:59:30");

INSERT INTO measurements (`userId`, `journeyId`, `dBReading`, `NO2Reading`, `PM10Reading`, `PM2.5Reading`, `timeTaken`, `longitude`, `latitude`) VALUES (4, 1, 60.9, 6, 3.5, 7, "2018-11-22 00:38:24",  107.80627000, -7.39755000);