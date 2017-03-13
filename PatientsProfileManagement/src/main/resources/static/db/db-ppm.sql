-- MySQL Script generated by MySQL Workbench
-- 03/07/17 16:26:19
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema db_ppm
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema db_ppm
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `db_ppm` DEFAULT CHARACTER SET utf8 ;
USE `db_ppm` ;



-- -----------------------------------------------------
-- Table `db_ppm`.`roles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_ppm`.`roles` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `roles` VARCHAR(255) CHARACTER SET 'utf8' NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_unicode_ci;


-- -----------------------------------------------------
-- Table `db_ppm`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_ppm`.`user` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `active` int(11) DEFAULT NULL,
  `name` VARCHAR(255) CHARACTER SET 'utf8' NOT NULL,
  `username` VARCHAR(255) CHARACTER SET 'utf8' NOT NULL,
  `password` VARCHAR(255) CHARACTER SET 'utf8' NOT NULL,
  `specialist` VARCHAR(255) CHARACTER SET 'utf8' NOT NULL,
  `address` VARCHAR(255) CHARACTER SET 'utf8' NOT NULL,
  `sex` VARCHAR(7) CHARACTER SET 'utf8' NOT NULL,  
   PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- -----------------------------------------------------
-- Table `db_ppm`.`user_role`
-- -----------------------------------------------------
CREATE TABLE `user_role` (
  `user_id` int(11) NOT NULL,
  `role_id` int(11) NOT NULL,
  PRIMARY KEY (`user_id`,`role_id`),
  KEY `FKa68196081fvovjhkek5m97n3y` (`role_id`),
  CONSTRAINT `FK859n2jvi8ivhui0rl0esws6o` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `FKa68196081fvovjhkek5m97n3y` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- -----------------------------------------------------
-- Table `db_ppm`.`patient`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_ppm`.`patient` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) CHARACTER SET 'utf8' NOT NULL,
  `address` VARCHAR(45) CHARACTER SET 'utf8' NOT NULL,
  `sex` VARCHAR(7) CHARACTER SET 'utf8' NOT NULL,
  `dob` DATE NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_unicode_ci;


-- -----------------------------------------------------
-- Table `db_ppm`.`treatment`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_ppm`.`treatment` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `idPatient` INT(11) NOT NULL,
  `idDoctor` INT(11) NOT NULL,
  `date` DATE NOT NULL,
  `file` VARCHAR(100) CHARACTER SET 'utf8' NOT NULL,
  `prescription` VARCHAR(100) CHARACTER SET 'utf8' NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_treat_doc_idx` (`idDoctor` ASC),
  INDEX `fk_treat_patient_idx` (`idPatient` ASC),
  CONSTRAINT `fk_treat_doc`
    FOREIGN KEY (`idDoctor`)
    REFERENCES `db_ppm`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_treat_patient`
    FOREIGN KEY (`idPatient`)
    REFERENCES `db_ppm`.`patient` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_unicode_ci;


-- -----------------------------------------------------
-- Table `db_ppm`.`history`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_ppm`.`history` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `idTreatment` INT(11) NOT NULL,
  `dateTime` DATETIME NOT NULL,
  `contentChange` VARCHAR(45) CHARACTER SET 'utf8' NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_his_treat_idx` (`idTreatment` ASC),
  CONSTRAINT `fk_his_treat`
    FOREIGN KEY (`idTreatment`)
    REFERENCES `db_ppm`.`treatment` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_unicode_ci;


-- -----------------------------------------------------
-- Table `db_ppm`.`type-of-medicine`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_ppm`.`type_of_medicine` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `typeName` VARCHAR(45) CHARACTER SET 'utf8' NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 11
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_unicode_ci;


-- -----------------------------------------------------
-- Table `db_ppm`.`medicine`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_ppm`.`medicine` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `idType` INT(11) NOT NULL,
  `name` VARCHAR(45) CHARACTER SET 'utf8' NOT NULL,
  `mfg` DATE NOT NULL,
  `producer` VARCHAR(45) CHARACTER SET 'utf8' NOT NULL,
  `dosage` VARCHAR(100) CHARACTER SET 'utf8' NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_type_idx` (`idType` ASC),
  CONSTRAINT `fk_type`
    FOREIGN KEY (`idType`)
    REFERENCES `db_ppm`.`type_of_medicine` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 10
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_unicode_ci;

-- -----------------------------------------------------
-- Table `db_ppm`.`allergic-detail`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_ppm`.`allergic_detail` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `idPatient` INT(11) NOT NULL,
  `idMedicine` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_aller_patient_idx` (`idPatient` ASC),
  CONSTRAINT `fk_aller_patient`
    FOREIGN KEY (`idPatient`)
    REFERENCES `db_ppm`.`patient` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_unicode_ci;

-- -----------------------------------------------------
-- Table `db_ppm`.`treatment-detail`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_ppm`.`treatment_detail` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `idTreatment` INT(11) NOT NULL,
  `idMedicine` INT(11) NOT NULL,
  `diseases` VARCHAR(70) CHARACTER SET 'utf8' NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_detail_treat_idx` (`idTreatment` ASC),
  INDEX `fk_detail_medicine_idx` (`idMedicine` ASC),
  CONSTRAINT `fk_datail_treat`
    FOREIGN KEY (`idTreatment`)
    REFERENCES `db_ppm`.`treatment` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_detail_medicine`
    FOREIGN KEY (`idMedicine`)
    REFERENCES `db_ppm`.`medicine` (`idMedicine`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 6
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_unicode_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;



/*
-- Query: SELECT * FROM db_ppm.roles
LIMIT 0, 1000
-- Date: 2017-03-07 16:30
*/
INSERT INTO `roles` (`id`,`roles`) VALUES (1,'admin');
INSERT INTO `roles` (`id`,`roles`) VALUES (2,'doctor');
INSERT INTO `roles` (`id`,`roles`) VALUES (3,'nurse');

/*
-- Query: SELECT * FROM db_ppm.user
LIMIT 0, 1000
-- Date: 2017-03-07 16:31
*/
INSERT INTO `user` (`id`,`name`,`username`,`password`,`specialist`,`address`,`sex`) VALUES (1,'Phan Van Hanh','hanhpv','hanhpv','than kinh','123 Nguyen Trai, Q1, Tp.HCM','male');
INSERT INTO `user` (`id`,`name`,`username`,`password`,`specialist`,`address`,`sex`) VALUES (2,'Tran Thi Lai','laitt','laitt','tai-mui-hong','234 Hong Bang, Q.Binh Tan, Tp.HCM','female');
INSERT INTO `user` (`id`,`name`,`username`,`password`,`specialist`,`address`,`sex`) VALUES (3,'Nguyen Van An','annv','annv','tim mach','23/2/8 Nguyen Thien Thuat, Q.4, Tp.HCM','male');
INSERT INTO `user` (`id`,`name`,`username`,`password`,`specialist`,`address`,`sex`	) VALUES (4,'Nguyen Thi Lanh','lanhnt','lanhnt','tim','567/12/13 Hoang Hoa Tham, Q.8, Tp.HCM','female');
INSERT INTO `user` (`id`,`name`,`username`,`password`,`specialist`,`address`,`sex`) VALUES (5,'Pham Van Khoa','khoapv','khoapv','mat','34 Nguyen Van Cu, Q.5, Tp.HCM','male');

/*
-- Query: SELECT * FROM db_ppm.patient
LIMIT 0, 1000
-- Date: 2017-03-07 16:31
*/
INSERT INTO `patient` (`id`,`name`,`address`,`sex`,`dob`) VALUES (1,'Nguyen Thi Lanh','43 Nguyen Thai Son, Q.Go Vap, Tp.HCM','female','1978-03-12');
INSERT INTO `patient` (`id`,`name`,`address`,`sex`,`dob`) VALUES (2,'Tran Van Binh','213 Vo Thi Sau, Q.3, Tp.HCM','male','1984-12-12');
INSERT INTO `patient` (`id`,`name`,`address`,`sex`,`dob`) VALUES (3,'Lai Thi Hoa','23/4 Vo Thi Sau, Q.3, Tp.HCM','female','1984-12-12');

/*
-- Query: SELECT * FROM db_ppm.treatment
LIMIT 0, 1000
-- Date: 2017-03-07 16:32
*/
INSERT INTO `treatment` (`id`,`idPatient`,`idDoctor`,`date`,`file`,`prescription`) VALUES (1,1,2,'2017-02-10','','nhiem trung mat');
INSERT INTO `treatment` (`id`,`idPatient`,`idDoctor`,`date`,`file`,`prescription`) VALUES (2,3,3,'2017-02-10','','tim mach');
INSERT INTO `treatment` (`id`,`idPatient`,`idDoctor`,`date`,`file`,`prescription`) VALUES (3,2,1,'2017-02-10','','tram cam');

/*
-- Query: SELECT * FROM db_ppm.history
LIMIT 0, 1000
-- Date: 2017-03-07 16:32
*/
INSERT INTO `history` (`id`,`idTreatment`,`dateTime`,`contentChange`) VALUES (1,1,'2017-02-10 00:00:00','doi thuoc');


/*
-- Query: SELECT * FROM db_ppm.`type-of-medicine`
LIMIT 0, 1000
-- Date: 2017-03-07 16:33
*/
INSERT INTO `type_of_medicine` (`idType`,`typeName`) VALUES (1,'thuoc khang sinh');
INSERT INTO `type_of_medicine` (`idType`,`typeName`) VALUES (2,'thuoc gay te, gay me, phuc hoi');
INSERT INTO `type_of_medicine` (`idType`,`typeName`) VALUES (3,'thuoc ha sot, giam dau, chong co giat');
INSERT INTO `type_of_medicine` (`idType`,`typeName`) VALUES (4,'thuoc chong di ung');
INSERT INTO `type_of_medicine` (`idType`,`typeName`) VALUES (5,'thuoc tai mui hong');
INSERT INTO `type_of_medicine` (`idType`,`typeName`) VALUES (6,'thuoc dieu tri da day');
INSERT INTO `type_of_medicine` (`idType`,`typeName`) VALUES (7,'thuoc dieu tri xuong khop');
INSERT INTO `type_of_medicine` (`idType`,`typeName`) VALUES (8,'thuoc dieu tri tim mach');
INSERT INTO `type_of_medicine` (`idType`,`typeName`) VALUES (9,'vitamin');
INSERT INTO `type_of_medicine` (`idType`,`typeName`) VALUES (10,'thuoc than kinh');

/*
-- Query: SELECT * FROM db_ppm.medicine
LIMIT 0, 1000
-- Date: 2017-03-07 16:33
*/
INSERT INTO `medicine` (`idMedicine`,`idType`,`name`,`mfg`,`producer`,`dosage`) VALUES (1,4,'Abenin Tab','2016-12-31','	Kyung Dong Pharm Co., Ltd','Viên nén bao phim-10mg');
INSERT INTO `medicine` (`idMedicine`,`idType`,`name`,`mfg`,`producer`,`dosage`) VALUES (2,3,'Tryox','2017-01-31','Suzhou Xinbao Pharmaceuticals Co., Ltd.','Bột đông khô để pha tiêm');
INSERT INTO `medicine` (`idMedicine`,`idType`,`name`,`mfg`,`producer`,`dosage`) VALUES (3,8,'Accupril','2016-12-31','	Godecke GmbH','Viên nén bao phim');
INSERT INTO `medicine` (`idMedicine`,`idType`,`name`,`mfg`,`producer`,`dosage`) VALUES (4,5,'Accutob','2016-10-12','Accure Labs Pvt., Ltd','Thuốc nhỏ mắt 0,3%');
INSERT INTO `medicine` (`idMedicine`,`idType`,`name`,`mfg`,`producer`,`dosage`) VALUES (5,5,'Accutob-D','2016-10-12','Accure Labs Pvt., Ltd','Thuốc nhỏ mắt Tobramycin 15mg/5ml');
INSERT INTO `medicine` (`idMedicine`,`idType`,`name`,`mfg`,`producer`,`dosage`) VALUES (6,10,'Aeyerop injection','2016-10-12','Huons Co., Ltd','Thuốc tiêm-1g/5ml');
INSERT INTO `medicine` (`idMedicine`,`idType`,`name`,`mfg`,`producer`,`dosage`) VALUES (7,10,'Alepsal','2016-10-12','Laboratoires Genevrier','Viên nén');
INSERT INTO `medicine` (`idMedicine`,`idType`,`name`,`mfg`,`producer`,`dosage`) VALUES (8,9,'4B with ginseng','2017-01-31','Robinson Pharma Inc USA ','Viên nang mềm');
INSERT INTO `medicine` (`idMedicine`,`idType`,`name`,`mfg`,`producer`,`dosage`) VALUES (9,7,'Alenta 70mg','2016-10-23','	Getz Pharma Pakistan (Pvt) Ltd','	Viên nén');

/*
-- Query: SELECT * FROM db_ppm.`treatment-detail`
LIMIT 0, 1000
-- Date: 2017-03-07 16:33
*/
INSERT INTO `treatment_detail` (`id`,`idTreatment`,`idMedicine`,`diseases`) VALUES (1,1,4,'nhiem trung mat');
INSERT INTO `treatment_detail` (`id`,`idTreatment`,`idMedicine`,`diseases`) VALUES (2,1,5,'nhiem trung mat');
INSERT INTO `treatment_detail` (`id`,`idTreatment`,`idMedicine`,`diseases`) VALUES (3,2,7,'tim mach');
INSERT INTO `treatment_detail` (`id`,`idTreatment`,`idMedicine`,`diseases`) VALUES (4,2,8,'thieu vitamin');


/*
-- Query: SELECT * FROM db_ppm.`allergic-detail`
LIMIT 0, 1000
-- Date: 2017-03-07 16:28
*/
INSERT INTO `allergic_detail` (`id`,`idPatient`,`idMedicine`) VALUES (1,3,3);
INSERT INTO `allergic_detail` (`id`,`idPatient`,`idMedicine`) VALUES (2,3,1);
INSERT INTO `allergic_detail` (`id`,`idPatient`,`idMedicine`) VALUES (3,1,9);
