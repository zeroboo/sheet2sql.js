/***************************************************
- [EXPORT-QUERY-START]
- Import queries from ./mission.xlsx
- Created time: Wed Jul 10 2019 13:50:46 GMT+0700 (Indochina Time)
****************************************************/

----- Insert into table poker_mission, data get from sheet Mission
INSERT INTO `poker_mission` (`id`, `name`, `description`, `type`, `category`, `frequency`, `requirement_type`, `parameters`, `active`) VALUES (1, 'Win x time any game', 'Win in any game', 1, 0, 30, 1, NULL, true);
INSERT INTO `poker_mission` (`id`, `name`, `description`, `type`, `category`, `frequency`, `requirement_type`, `parameters`, `active`) VALUES (2, 'Play x time with any game', 'Play in any game', 1, 0, 35, 2, NULL, true);
INSERT INTO `poker_mission` (`id`, `name`, `description`, `type`, `category`, `frequency`, `requirement_type`, `parameters`, `active`) VALUES (3, 'Exchange gold', 'Exchange Gold from oncase x times with any game - any value accepted', 1, 0, 35, 3, NULL, true);
INSERT INTO `poker_mission` (`id`, `name`, `description`, `type`, `category`, `frequency`, `requirement_type`, `parameters`, `active`) VALUES (4, 'Watch video ads', 'Watch videos ads x times with any game (Bixa, Holla, Xito, TienLen)', 1, 0, 900, 4, NULL, true);
INSERT INTO `poker_mission` (`id`, `name`, `description`, `type`, `category`, `frequency`, `requirement_type`, `parameters`, `active`) VALUES (5, 'Level up', 'Reach to x level (10, 20, 30, 40, 50...)', 2, 0, 0, 5, NULL, true);
INSERT INTO `poker_mission` (`id`, `name`, `description`, `type`, `category`, `frequency`, `requirement_type`, `parameters`, `active`) VALUES (6, 'Own gold', 'Own x amount of gold (1 mil, 5mil, 10 mil)', 2, 0, 0, 6, NULL, true);
INSERT INTO `poker_mission` (`id`, `name`, `description`, `type`, `category`, `frequency`, `requirement_type`, `parameters`, `active`) VALUES (7, 'Channel STREET win', 'Win at channel STREET', 2, 0, 0, 7, NULL, true);
INSERT INTO `poker_mission` (`id`, `name`, `description`, `type`, `category`, `frequency`, `requirement_type`, `parameters`, `active`) VALUES (8, 'Channel FREE win', 'Win at channel FREE', 2, 0, 0, 8, NULL, true);
INSERT INTO `poker_mission` (`id`, `name`, `description`, `type`, `category`, `frequency`, `requirement_type`, `parameters`, `active`) VALUES (9, 'Channel AMATUER win', 'Win at channel AMATUER', 2, 0, 0, 9, NULL, true);
INSERT INTO `poker_mission` (`id`, `name`, `description`, `type`, `category`, `frequency`, `requirement_type`, `parameters`, `active`) VALUES (10, 'Channel PRO win', 'Win at channel PRO', 2, 0, 0, 10, NULL, true);
INSERT INTO `poker_mission` (`id`, `name`, `description`, `type`, `category`, `frequency`, `requirement_type`, `parameters`, `active`) VALUES (11, 'Channel OPEN win', 'Win at channel OPEN', 2, 0, 0, 11, NULL, true);
INSERT INTO `poker_mission` (`id`, `name`, `description`, `type`, `category`, `frequency`, `requirement_type`, `parameters`, `active`) VALUES (12, 'Any channel win', 'Win at any channel', 2, 0, 0, 12, NULL, true);
INSERT INTO `poker_mission` (`id`, `name`, `description`, `type`, `category`, `frequency`, `requirement_type`, `parameters`, `active`) VALUES (13, 'Sending gift', 'Sending gift to x friends (5, 10, 15, 20...)', 2, 0, 0, 13, NULL, true);
INSERT INTO `poker_mission` (`id`, `name`, `description`, `type`, `category`, `frequency`, `requirement_type`, `parameters`, `active`) VALUES (14, 'Receiveing gift', 'Receiving gift from x friend (5, 10, 15, 20...)', 2, 0, 0, 14, NULL, true);
INSERT INTO `poker_mission` (`id`, `name`, `description`, `type`, `category`, `frequency`, `requirement_type`, `parameters`, `active`) VALUES (15, 'Making friend', 'Making x friends (50, 100...)', 2, 0, 0, 15, NULL, true);
INSERT INTO `poker_mission` (`id`, `name`, `description`, `type`, `category`, `frequency`, `requirement_type`, `parameters`, `active`) VALUES (16, 'Win 3 chi', 'Win 3 chi x competitor (5, 10, 15...)', 3, 1, 1000, 16, NULL, true);
INSERT INTO `poker_mission` (`id`, `name`, `description`, `type`, `category`, `frequency`, `requirement_type`, `parameters`, `active`) VALUES (17, 'Have Ace', 'Have Ace in x games', 3, 1, 1000, 17, NULL, true);
INSERT INTO `poker_mission` (`id`, `name`, `description`, `type`, `category`, `frequency`, `requirement_type`, `parameters`, `active`) VALUES (18, 'Win 3 chi', 'Mau Binh at x times (5, 10, 15...)', 3, 1, 1000, 18, NULL, true);
INSERT INTO `poker_mission` (`id`, `name`, `description`, `type`, `category`, `frequency`, `requirement_type`, `parameters`, `active`) VALUES (19, 'Holla Win 1st place', 'Win 1st place x times', 3, 2, 1000, 19, NULL, true);
INSERT INTO `poker_mission` (`id`, `name`, `description`, `type`, `category`, `frequency`, `requirement_type`, `parameters`, `active`) VALUES (20, 'Stolen card', 'Stolen card x times', 3, 2, 1000, 20, NULL, true);
INSERT INTO `poker_mission` (`id`, `name`, `description`, `type`, `category`, `frequency`, `requirement_type`, `parameters`, `active`) VALUES (21, 'Less than 10 pts', 'End the game with less than 10 points', 3, 2, 1000, 21, NULL, true);
INSERT INTO `poker_mission` (`id`, `name`, `description`, `type`, `category`, `frequency`, `requirement_type`, `parameters`, `active`) VALUES (22, 'Win 5 cards mode', 'Win x times in 5 cards mode', 3, 3, 1000, 22, NULL, true);
INSERT INTO `poker_mission` (`id`, `name`, `description`, `type`, `category`, `frequency`, `requirement_type`, `parameters`, `active`) VALUES (23, 'Win 7 cards mode', 'Win x times in 7 cards mode', 3, 3, 1000, 23, NULL, true);
INSERT INTO `poker_mission` (`id`, `name`, `description`, `type`, `category`, `frequency`, `requirement_type`, `parameters`, `active`) VALUES (24, 'All-in', 'All-in x time', 3, 3, 1000, 24, NULL, true);
INSERT INTO `poker_mission` (`id`, `name`, `description`, `type`, `category`, `frequency`, `requirement_type`, `parameters`, `active`) VALUES (25, 'Win game with 3 spade', 'Win the game with 3 spade (any game mode)', 3, 4, 1000, 25, NULL, true);
INSERT INTO `poker_mission` (`id`, `name`, `description`, `type`, `category`, `frequency`, `requirement_type`, `parameters`, `active`) VALUES (26, 'Booming', 'Booming x times (any game mode) - No need care about the game result', 3, 4, 1000, 26, NULL, true);
INSERT INTO `poker_mission` (`id`, `name`, `description`, `type`, `category`, `frequency`, `requirement_type`, `parameters`, `active`) VALUES (27, 'Win 1st place', 'Win 1st place x times', 3, 4, 1000, 27, NULL, true);
----- Insert into table poker_mission_level, data get from sheet MissionLevel
INSERT INTO `poker_mission_level` (`mission_id`, `level`, `params`, `requirement_value`, `reward_gold`) VALUES (1, 1, NULL, 5, 500);
INSERT INTO `poker_mission_level` (`mission_id`, `level`, `params`, `requirement_value`, `reward_gold`) VALUES (2, 1, NULL, 5, 500);
INSERT INTO `poker_mission_level` (`mission_id`, `level`, `params`, `requirement_value`, `reward_gold`) VALUES (3, 1, NULL, 5, 500);
INSERT INTO `poker_mission_level` (`mission_id`, `level`, `params`, `requirement_value`, `reward_gold`) VALUES (4, 1, NULL, 5, 500);
INSERT INTO `poker_mission_level` (`mission_id`, `level`, `params`, `requirement_value`, `reward_gold`) VALUES (5, 1, NULL, 1, 500);
INSERT INTO `poker_mission_level` (`mission_id`, `level`, `params`, `requirement_value`, `reward_gold`) VALUES (5, 2, NULL, 2, 1000);
INSERT INTO `poker_mission_level` (`mission_id`, `level`, `params`, `requirement_value`, `reward_gold`) VALUES (5, 3, NULL, 3, 1500);
INSERT INTO `poker_mission_level` (`mission_id`, `level`, `params`, `requirement_value`, `reward_gold`) VALUES (5, 4, NULL, 4, 2000);
INSERT INTO `poker_mission_level` (`mission_id`, `level`, `params`, `requirement_value`, `reward_gold`) VALUES (5, 5, NULL, 5, 2500);
INSERT INTO `poker_mission_level` (`mission_id`, `level`, `params`, `requirement_value`, `reward_gold`) VALUES (6, 1, NULL, 1000, 500);
INSERT INTO `poker_mission_level` (`mission_id`, `level`, `params`, `requirement_value`, `reward_gold`) VALUES (6, 2, NULL, 1500, 1000);
INSERT INTO `poker_mission_level` (`mission_id`, `level`, `params`, `requirement_value`, `reward_gold`) VALUES (6, 3, NULL, 2000, 1500);
INSERT INTO `poker_mission_level` (`mission_id`, `level`, `params`, `requirement_value`, `reward_gold`) VALUES (6, 4, NULL, 2500, 2000);
INSERT INTO `poker_mission_level` (`mission_id`, `level`, `params`, `requirement_value`, `reward_gold`) VALUES (6, 5, NULL, 3000, 2500);
INSERT INTO `poker_mission_level` (`mission_id`, `level`, `params`, `requirement_value`, `reward_gold`) VALUES (7, 1, NULL, 1, 500);
INSERT INTO `poker_mission_level` (`mission_id`, `level`, `params`, `requirement_value`, `reward_gold`) VALUES (7, 2, NULL, 2, 1000);
INSERT INTO `poker_mission_level` (`mission_id`, `level`, `params`, `requirement_value`, `reward_gold`) VALUES (7, 3, NULL, 3, 1500);
INSERT INTO `poker_mission_level` (`mission_id`, `level`, `params`, `requirement_value`, `reward_gold`) VALUES (7, 4, NULL, 4, 2000);
INSERT INTO `poker_mission_level` (`mission_id`, `level`, `params`, `requirement_value`, `reward_gold`) VALUES (7, 5, NULL, 5, 2500);
INSERT INTO `poker_mission_level` (`mission_id`, `level`, `params`, `requirement_value`, `reward_gold`) VALUES (8, 1, NULL, 1, 500);
INSERT INTO `poker_mission_level` (`mission_id`, `level`, `params`, `requirement_value`, `reward_gold`) VALUES (8, 2, NULL, 2, 1000);
INSERT INTO `poker_mission_level` (`mission_id`, `level`, `params`, `requirement_value`, `reward_gold`) VALUES (8, 3, NULL, 3, 1500);
INSERT INTO `poker_mission_level` (`mission_id`, `level`, `params`, `requirement_value`, `reward_gold`) VALUES (8, 4, NULL, 4, 2000);
INSERT INTO `poker_mission_level` (`mission_id`, `level`, `params`, `requirement_value`, `reward_gold`) VALUES (8, 5, NULL, 5, 2500);
INSERT INTO `poker_mission_level` (`mission_id`, `level`, `params`, `requirement_value`, `reward_gold`) VALUES (9, 1, NULL, 1, 500);
INSERT INTO `poker_mission_level` (`mission_id`, `level`, `params`, `requirement_value`, `reward_gold`) VALUES (9, 2, NULL, 2, 1000);
INSERT INTO `poker_mission_level` (`mission_id`, `level`, `params`, `requirement_value`, `reward_gold`) VALUES (9, 3, NULL, 3, 1500);
INSERT INTO `poker_mission_level` (`mission_id`, `level`, `params`, `requirement_value`, `reward_gold`) VALUES (9, 4, NULL, 4, 2000);
INSERT INTO `poker_mission_level` (`mission_id`, `level`, `params`, `requirement_value`, `reward_gold`) VALUES (9, 5, NULL, 5, 2500);
INSERT INTO `poker_mission_level` (`mission_id`, `level`, `params`, `requirement_value`, `reward_gold`) VALUES (10, 1, NULL, 1, 500);
INSERT INTO `poker_mission_level` (`mission_id`, `level`, `params`, `requirement_value`, `reward_gold`) VALUES (10, 2, NULL, 2, 1000);
INSERT INTO `poker_mission_level` (`mission_id`, `level`, `params`, `requirement_value`, `reward_gold`) VALUES (10, 3, NULL, 3, 1500);
INSERT INTO `poker_mission_level` (`mission_id`, `level`, `params`, `requirement_value`, `reward_gold`) VALUES (10, 4, NULL, 4, 2000);
INSERT INTO `poker_mission_level` (`mission_id`, `level`, `params`, `requirement_value`, `reward_gold`) VALUES (10, 5, NULL, 5, 2500);
INSERT INTO `poker_mission_level` (`mission_id`, `level`, `params`, `requirement_value`, `reward_gold`) VALUES (11, 1, NULL, 1, 500);
INSERT INTO `poker_mission_level` (`mission_id`, `level`, `params`, `requirement_value`, `reward_gold`) VALUES (11, 2, NULL, 2, 1000);
INSERT INTO `poker_mission_level` (`mission_id`, `level`, `params`, `requirement_value`, `reward_gold`) VALUES (11, 3, NULL, 3, 1500);
INSERT INTO `poker_mission_level` (`mission_id`, `level`, `params`, `requirement_value`, `reward_gold`) VALUES (11, 4, NULL, 4, 2000);
INSERT INTO `poker_mission_level` (`mission_id`, `level`, `params`, `requirement_value`, `reward_gold`) VALUES (11, 5, NULL, 5, 2500);
INSERT INTO `poker_mission_level` (`mission_id`, `level`, `params`, `requirement_value`, `reward_gold`) VALUES (12, 1, NULL, 1, 500);
INSERT INTO `poker_mission_level` (`mission_id`, `level`, `params`, `requirement_value`, `reward_gold`) VALUES (12, 2, NULL, 2, 1000);
INSERT INTO `poker_mission_level` (`mission_id`, `level`, `params`, `requirement_value`, `reward_gold`) VALUES (12, 3, NULL, 3, 1500);
INSERT INTO `poker_mission_level` (`mission_id`, `level`, `params`, `requirement_value`, `reward_gold`) VALUES (12, 4, NULL, 4, 2000);
INSERT INTO `poker_mission_level` (`mission_id`, `level`, `params`, `requirement_value`, `reward_gold`) VALUES (12, 5, NULL, 5, 2500);
INSERT INTO `poker_mission_level` (`mission_id`, `level`, `params`, `requirement_value`, `reward_gold`) VALUES (13, 1, NULL, 1, 500);
INSERT INTO `poker_mission_level` (`mission_id`, `level`, `params`, `requirement_value`, `reward_gold`) VALUES (13, 2, NULL, 2, 1000);
INSERT INTO `poker_mission_level` (`mission_id`, `level`, `params`, `requirement_value`, `reward_gold`) VALUES (13, 3, NULL, 3, 1500);
INSERT INTO `poker_mission_level` (`mission_id`, `level`, `params`, `requirement_value`, `reward_gold`) VALUES (13, 4, NULL, 4, 2000);
INSERT INTO `poker_mission_level` (`mission_id`, `level`, `params`, `requirement_value`, `reward_gold`) VALUES (13, 5, NULL, 5, 2500);
INSERT INTO `poker_mission_level` (`mission_id`, `level`, `params`, `requirement_value`, `reward_gold`) VALUES (14, 1, NULL, 1, 500);
INSERT INTO `poker_mission_level` (`mission_id`, `level`, `params`, `requirement_value`, `reward_gold`) VALUES (14, 2, NULL, 2, 1000);
INSERT INTO `poker_mission_level` (`mission_id`, `level`, `params`, `requirement_value`, `reward_gold`) VALUES (14, 3, NULL, 3, 1500);
INSERT INTO `poker_mission_level` (`mission_id`, `level`, `params`, `requirement_value`, `reward_gold`) VALUES (14, 4, NULL, 4, 2000);
INSERT INTO `poker_mission_level` (`mission_id`, `level`, `params`, `requirement_value`, `reward_gold`) VALUES (14, 5, NULL, 5, 2500);
INSERT INTO `poker_mission_level` (`mission_id`, `level`, `params`, `requirement_value`, `reward_gold`) VALUES (15, 1, NULL, 1, 500);
INSERT INTO `poker_mission_level` (`mission_id`, `level`, `params`, `requirement_value`, `reward_gold`) VALUES (15, 2, NULL, 2, 1000);
INSERT INTO `poker_mission_level` (`mission_id`, `level`, `params`, `requirement_value`, `reward_gold`) VALUES (15, 3, NULL, 3, 1500);
INSERT INTO `poker_mission_level` (`mission_id`, `level`, `params`, `requirement_value`, `reward_gold`) VALUES (15, 4, NULL, 4, 2000);
INSERT INTO `poker_mission_level` (`mission_id`, `level`, `params`, `requirement_value`, `reward_gold`) VALUES (15, 5, NULL, 5, 2500);
INSERT INTO `poker_mission_level` (`mission_id`, `level`, `params`, `requirement_value`, `reward_gold`) VALUES (16, 1, NULL, 3, 500);
INSERT INTO `poker_mission_level` (`mission_id`, `level`, `params`, `requirement_value`, `reward_gold`) VALUES (17, 1, NULL, 3, 500);
INSERT INTO `poker_mission_level` (`mission_id`, `level`, `params`, `requirement_value`, `reward_gold`) VALUES (18, 1, NULL, 3, 500);
INSERT INTO `poker_mission_level` (`mission_id`, `level`, `params`, `requirement_value`, `reward_gold`) VALUES (19, 1, NULL, 3, 500);
INSERT INTO `poker_mission_level` (`mission_id`, `level`, `params`, `requirement_value`, `reward_gold`) VALUES (20, 1, NULL, 3, 500);
INSERT INTO `poker_mission_level` (`mission_id`, `level`, `params`, `requirement_value`, `reward_gold`) VALUES (21, 1, NULL, 3, 500);
INSERT INTO `poker_mission_level` (`mission_id`, `level`, `params`, `requirement_value`, `reward_gold`) VALUES (22, 1, NULL, 3, 500);
INSERT INTO `poker_mission_level` (`mission_id`, `level`, `params`, `requirement_value`, `reward_gold`) VALUES (23, 1, NULL, 3, 500);
INSERT INTO `poker_mission_level` (`mission_id`, `level`, `params`, `requirement_value`, `reward_gold`) VALUES (24, 1, NULL, 3, 500);
INSERT INTO `poker_mission_level` (`mission_id`, `level`, `params`, `requirement_value`, `reward_gold`) VALUES (25, 1, NULL, 3, 500);
INSERT INTO `poker_mission_level` (`mission_id`, `level`, `params`, `requirement_value`, `reward_gold`) VALUES (26, 1, NULL, 3, 500);
INSERT INTO `poker_mission_level` (`mission_id`, `level`, `params`, `requirement_value`, `reward_gold`) VALUES (27, 1, NULL, 3, 500);
/***************************************************
- [EXPORT-QUERY-END] 
****************************************************/
