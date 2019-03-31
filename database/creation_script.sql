DROP SCHEMA IF EXISTS CleanAir;

CREATE SCHEMA IF NOT EXISTS CleanAir;

USE CleanAir;

-- MySQL Workbench Forward Engineering

-- -----------------------------------------------------
-- Table user
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS user (
	`id` INT NOT NULL AUTO_INCREMENT,
	`email` VARCHAR(50) NOT NULL,
	`password` VARCHAR(300) NOT NULL,
    `shareReadings` BOOLEAN,
	PRIMARY KEY (`id`),
	UNIQUE INDEX `id_UNIQUE` (`id` ASC))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table journey user takes 
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS journey (
	`id` INT NOT NULL AUTO_INCREMENT,
    `userId` INT NOT NULL,
    `startTime` DATETIME NOT NULL,
    `endTime` DATETIME NOT NULL,
		PRIMARY KEY (`id`),
		FOREIGN KEY (`userId`)
        REFERENCES user (`id`)
			ON DELETE NO ACTION
			ON UPDATE NO ACTION )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table user readings
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS measurements (
	`id` INT NOT NULL AUTO_INCREMENT,
	`userId` INT NOT NULL,
	`journeyId` INT NOT NULL,
    `dBReading` FLOAT, 
    `NO2Reading` FLOAT, 
	`PM10Reading` FLOAT,
    `PM25Reading` FLOAT,
    `timeTaken` DATETIME NOT NULL,
    `longitude` FLOAT NOT NULL,
    `latitude` FLOAT NOT NULL,
		PRIMARY KEY (`id`),
		FOREIGN KEY (`userId`)
        REFERENCES user (`id`)
			ON DELETE NO ACTION
			ON UPDATE NO ACTION,
        FOREIGN KEY (`journeyId`)
        REFERENCES journey (`id`))
ENGINE = InnoDB;
 