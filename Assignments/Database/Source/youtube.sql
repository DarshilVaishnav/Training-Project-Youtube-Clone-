-- SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
-- SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
-- SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

create database youtube;
use youtube;
-- drop database youtube; 

create table users(
	userid bigint primary key auto_increment,
	firstname varchar(20),
	lastname varchar(20),
    username varchar(20),
    password nvarchar(50) NOT NULL,
	email varchar(30) NOT NULL UNIQUE,
	gender char(1),
	country varchar(40),
	createtime datetime,
	modifiedtime datetime
);
ALTER TABLE users MODIFY createtime datetime default current_timestamp;
ALTER TABLE users
MODIFY COLUMN password nvarchar(100) NOT NULL;
insert into users(firstname, lastname, username, password, email, gender, country, createtime, modifiedtime) values
('Rohit','Sharma','rohit.sharma','123','r@gmail.com','M','India','2022-07-20 10:30:22','2022-07-20 10:30:22'),
('Virat','Kohli','virat.kohli','456','v@gmail.com','M','India','2022-07-20 10:30:22','2022-07-20 10:30:22'),
('Sikhar','Dhawan','sikhar.dhawan','789','s@gmail.com','M','India','2022-07-20 10:30:22','2022-07-20 10:30:22');

-- select u.firstname, u.lastname, userid from video v join users u using(userid); 

create table channel(
	channelid bigint primary key,
    channelname varchar(45),
    userid bigint,
    createtime datetime,
    modifiedtime datetime,
    constraint fk_useridchannel foreign key (userid)
		references users(userid)
);

insert into channel values
(1,'Tech',3,'2022-07-20 10:30:22','2022-07-20 10:30:22'),
(2,'Food',1,'2022-07-20 10:30:22','2022-07-20 10:30:22');

CREATE INDEX idx_channelname
ON channel (channelname);

create table video(
	videoid bigint primary key,
    title varchar(60) not null,
    description varchar(200),
    videourl varchar(100),
    videosize int,
    createtime datetime,
    modifiedtime datetime,
    channelid bigint,
    thumbnailid bigint,
    thumbnailurl varchar(100),
    constraint fk_channelidvideo foreign key (channelid)	
		references channel(channelid) 
);
ALTER TABLE video
ADD COLUMN catid bigint not null;
ALTER TABLE video
ADD CONSTRAINT fk_catidvideo
FOREIGN KEY (catid) REFERENCES categories(catid);
-- ADD constraint fk_catidvideo FOREIGN KEY (catid) references categories(catid);
select * from video;
select * from users;
set foreign_key_checks = 0;
ALTER TABLE video MODIFY COLUMN videoid bigint auto_increment;
ALTER TABLE video MODIFY COLUMN thumbnailid bigint auto_increment;
set foreign_key_checks = 1;
ALTER TABLE video MODIFY modifiedtime datetime default current_timestamp;
/*ALTER TABLE video
    DROP FOREIGN KEY fk_channelidvideo,
    MODIFY videoid bigint auto_increment;*/
delete from video;
ALTER TABLE video    
MODIFY title varchar(200) not null;  
insert into video values
(1,'Amazing !! Korean toast making masters known for being delicious. TOP 7 / Korean street food','Amazing !! Korean toast making masters known for being delicious. TOP 7 / Korean street food','https://res.cloudinary.com/ds2x9ewvw/video/upload/v1660716077/video/file_wnb2jf.mp4',222,'2022-07-20 10:30:22','2022-07-20 10:30:22',2,1,'https://res.cloudinary.com/ds2x9ewvw/image/upload/v1660716299/thumbnail/1_fu70d0.webp',1),
(2,'INDIAN PEOPLE AUR INDEPENDENCE DAY || Rachit Rojha','Managed by-: Sociopool (Sociopool India Private Limited)','https://res.cloudinary.com/ds2x9ewvw/video/upload/v1660716478/video/freestock_4827086_fus39k.mp4',250,'2022-07-20 10:30:22','2022-07-20 10:30:22',2,2,'https://res.cloudinary.com/ds2x9ewvw/image/upload/v1660716418/thumbnail/2_x7ympl.webp',5);

CREATE INDEX idx_title
ON video (title);

show index from video;

create table comment(
	commentid bigint primary key,
    videoid bigint,
    userid bigint,
    comment varchar(100),
    createtime datetime,
    modifiedtime datetime,
    constraint fk_useridcomment foreign key (userid)
		references users(userid),
	constraint fk_videoidcomment foreign key (videoid)
		references video(videoid)
);
insert into comment values(1,1,1,'comment1',now(),now());
ALTER TABLE comment MODIFY modifiedtime datetime default current_timestamp;

create table entitylike(
	entitylikeid bigint primary key,
	isdislike bool,
	userid bigint,
	createtime datetime,
	modifiedtime datetime,
	videoid bigint,
	commentid bigint,
    constraint fk_useridentitylike foreign key (userid)
		references users(userid),
	constraint fk_videoidentitylike foreign key (videoid)
		references video(videoid),
	constraint fk_commentidentitylike foreign key (commentid)
		references comment(commentid)
);
ALTER TABLE entitylike MODIFY createtime datetime default current_timestamp;
insert into entitylike(entitylikeid,isdislike,userid,videoid,commentid) values(1,true,1,2,1);

-- create table download(
-- 	downloadid bigint primary key,
--     userid bigint,
--     videoid bigint,
--     createtime datetime,
--     modifiedtime datetime,
--     constraint fk_useriddownload foreign key (userid)
-- 		references user(userid),
-- 	constraint fk_videoiddownload foreign key (videoid)
-- 		references video(videoid)
-- );

create table notification(
	notificationid bigint primary key,
    userid bigint,
    videoid bigint,
    createtime datetime,
    modifiedtime datetime,
    constraint fk_useridnotification foreign key (userid)
		references users(userid),
	constraint fk_videoidnotification foreign key (videoid)
		references video(videoid)
);
ALTER TABLE notification MODIFY modifiedtime datetime default current_timestamp;
insert into notification(notificationid,userid,videoid) values(1,2,2);

create table subscriber(
	subscriberid bigint primary key,
    userid bigint,
	channelid bigint,
    createtime datetime,
    modifiedtime datetime,
    constraint fk_useridsubscriber foreign key (userid)
		references users(userid),
	constraint fk_channelidsubscriber foreign key (channelid)
		references channel(channelid)
);
ALTER TABLE subscriber MODIFY createtime datetime default current_timestamp;
insert into subscriber(subscriberid,userid,channelid) values(1,2,2);

create table videoview(
	videoviewid bigint primary key,
	userid bigint,
    videoid bigint,
    createtime datetime,
    modifiedtime datetime,
    constraint fk_useridvideoview foreign key (userid)
		references users(userid),
	constraint fk_videoidvideoview foreign key (videoid)
		references video(videoid)
);
ALTER TABLE videoview MODIFY modifiedtime datetime default current_timestamp;
insert into videoview(videoviewid,userid,videoid) values(1,2,1);

create table searchhistory(
	searchhistoryid bigint primary key,
    searchcontent varchar(200),
    createtime datetime,
    userid bigint,
    constraint fk_useridsearchhistory foreign key (userid)
		references users(userid)
);
ALTER TABLE searchhistory MODIFY createtime datetime default current_timestamp;
insert into searchhistory(searchhistoryid, searchcontent, userid) values(1,'content1',2);

create table watchlatervideo(
	watchLatervideoid bigint primary key,
	userid bigint,
	videoid bigint,
    constraint fk_useridwatchlatervideo foreign key (userid)
		references users(userid),
	constraint fk_videoidwatchlatervideo foreign key (videoid)
		references video(videoid)
);

insert into watchlatervideo values
(1,2,1),
(2,3,2);

create table watchhistory(
	watchhistoryid bigint primary key,
	userid bigint,
	videoid bigint,
	createtime datetime,
    constraint fk_useridwatchhistory foreign key (userid)
		references users(userid),
	constraint fk_videoidwatchhistory foreign key (videoid)
		references video(videoid)
);
ALTER TABLE watchhistory MODIFY createtime datetime default current_timestamp;
insert into watchhistory values(1,2,3);

create table channelvideo(
	channelvideoid bigint primary key,
	videoid bigint,
	channelid bigint,
    constraint fk_videoidchannelvideo foreign key (videoid)
		references video(videoid),
	constraint fk_channelidchannelvideo foreign key (channelid)
		references channel(channelid)
);

insert into channelvideo values
(1,2,1),
(2,1,1);

-- create table offlinevideo(
-- 	offlinevideoid bigint primary key,
-- 	userid bigint,
-- 	videoid bigint,
--     constraint fk_useridofflinevideo foreign key (userid)
-- 		references user(userid),
-- 	constraint fk_videoidofflinevideo foreign key (videoid)
-- 		references video(videoid)
-- );

-- create table videospeccount(
-- 	videospeccountid bigint primary key,
-- 	videoid bigint,
-- 	videoviewcount bigint,
-- 	videolikecount bigint,
-- 	videodislikecount bigint,
-- 	videodownloadcount bigint,
-- 	videocommentcount bigint,
--     constraint fk_videoidvideospeccount foreign key (videoid)
-- 		references video(videoid)
-- );

create table playlist(
	playlistid bigint primary key,
	playlistname varchar(40),
    channelid bigint,
	userid bigint,
    constraint fk_useridplaylist foreign key (userid)
		references users(userid),
	constraint fk_channelidplaylist foreign key (channelid)
		references channel(channelid)
);
-- ALTER TABLE playlist ADD CONSTRAINT fk_channelidplaylist 
-- FOREIGN KEY (channelid) REFERENCES channel(channelid);

insert into playlist values
(1,'playlist1',2,1),
(2,'playlist2',1,1);

create table playlistvideo(
	playlistvideoid bigint primary key,
	videoid bigint,
	playlistid bigint,
    constraint fk_videoidplaylistvideo foreign key (videoid)
		references video(videoid),
	constraint fk_playlistidplaylistvideo foreign key (playlistid)
		references playlist(playlistid)
);
insert into playlistvideo values(1,1,2);

create table accountsettings(
	accountsettingsid bigint primary key,
	Language varchar(40),
	location varchar(40),
	isrestricted boolean,
	userid bigint,
    constraint fk_useridaccountsettings foreign key (userid)
		references users(userid)
);

insert into accountsettings values(1,'Hindi','India',true,1);

create table categories(
	catid bigint primary key auto_increment,
    catname varchar(30) not null,
    parentid bigint not null default '0'
);

insert into categories(catname) values
('Music'),
('Gaming'),
('Sports'),
('News');

select * from categories;