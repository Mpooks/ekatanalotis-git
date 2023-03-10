SET GLOBAL sql_mode='NO_AUTO_VALUE_ON_ZERO';
DROP DATABASE IF EXISTS ekatanalotis;
CREATE DATABASE ekatanalotis;
USE ekatanalotis;

CREATE TABLE users(
id INT NOT NULL AUTO_INCREMENT,
email VARCHAR(255) NOT NULL,
username VARCHAR(25) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
passw VARCHAR(25) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
dateofsignup DATE NOT NULL,
total_score INT NOT NULL DEFAULT 0,
monthly_score INT NOT NULL DEFAULT 0,
total_tokens INT NOT NULL DEFAULT 0,
last_tokens INT NOT NULL DEFAULT 0,
isadmin ENUM('YES','NO') NOT NULL,
PRIMARY KEY(id),
UNIQUE(email),
UNIQUE(username),
INDEX(total_score)
);

CREATE TABLE shop (
  shopid BIGINT NOT NULL AUTO_INCREMENT,
  sname VARCHAR(255) NOT NULL,
  stype ENUM('supermarket','convenience') NOT NULL,
  latitude DOUBLE NOT NULL,
  longitude DOUBLE NOT NULL,
  PRIMARY KEY (shopid),
  INDEX (sname)
);

CREATE TABLE pcategory(
cid VARCHAR(50) NOT NULL,
cname VARCHAR(255) NOT NULL,
PRIMARY KEY(cid),
UNIQUE(cname)
);

CREATE TABLE subcategory(
sub_id VARCHAR(50) NOT NULL,
subname VARCHAR(255) NOT NULL,
cat_id VARCHAR(50) NOT NULL,
PRIMARY KEY(sub_id,cat_id),
CONSTRAINT CATID
FOREIGN KEY (cat_id) REFERENCES pcategory(cid) 
ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE product(
pid INT NOT NULL AUTO_INCREMENT,
pname VARCHAR(255) NOT NULL,
psub_id VARCHAR(50) NOT NULL,
pcat_id VARCHAR(50) NOT NULL,
pimage TEXT ,
PRIMARY KEY(pid),
INDEX(pname),
INDEX(pcat_id),
INDEX(psub_id),
CONSTRAINT PSUBID
FOREIGN KEY (psub_id) REFERENCES subcategory(sub_id)
ON DELETE CASCADE ON UPDATE CASCADE,
CONSTRAINT PCATID
FOREIGN KEY (pcat_id) REFERENCES subcategory(cat_id)
ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE prices(
prid INT NOT NULL,
dateofp DATE NOT NULL,
priceP FLOAT NOT NULL,
PRIMARY KEY(prid,dateofP),
CONSTRAINT PRODID
FOREIGN KEY (prid) REFERENCES product(pid)
ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE offer(
offer_id INT NOT NULL AUTO_INCREMENT,
sid BIGINT,
product_id INT,
price FLOAT NOT NULL,
lessthanlastday20 ENUM('YES','NO') NOT NULL DEFAULT 'NO',
lessthanlastweek20 ENUM('YES','NO') NOT NULL DEFAULT 'NO',
offer_date DATE NOT NULL,
likes INT NOT NULL DEFAULT 0,
dislikes INT NOT NULL DEFAULT 0,
stock ENUM('YES','NO') NOT NULL DEFAULT 'YES',
userid INT,
active_offer ENUM('ACTIVE','INACTIVE') NOT NULL DEFAULT 'ACTIVE',
last_day_of_offer DATE NOT NULL,
PRIMARY KEY(offer_id),
CONSTRAINT PROD
FOREIGN KEY (product_id) REFERENCES product(pid)
ON DELETE SET NULL ON UPDATE CASCADE,
CONSTRAINT SHOPID
FOREIGN KEY (sid) REFERENCES shop(shopid)
ON DELETE SET NULL ON UPDATE CASCADE,
CONSTRAINT OFFERUSER
FOREIGN KEY (userid) REFERENCES users(id)
ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE TABLE userlikes(
userid INT NOT NULL,
liked_offer INT,
actionl ENUM('LIKE','DISLIKE') NOT NULL,
PRIMARY KEY(userid,liked_offer),
INDEX(userid),
CONSTRAINT USERLIKED
FOREIGN KEY (userid) REFERENCES users(id)
ON DELETE CASCADE ON UPDATE CASCADE,
CONSTRAINT OFFERID
FOREIGN KEY (liked_offer) REFERENCES offer(offer_id)
ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE updatedMonth(
thism DATE NOT NULL,
idone ENUM('YES','NO') NOT NULL DEFAULT 'NO',
PRIMARY KEY(thism)
);



