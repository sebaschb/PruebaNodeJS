
CREATE TABLE `asterisk_voicemail_general` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL DEFAULT '',
  `type` enum('TEXT','NUMBER','SELECT') NOT NULL DEFAULT 'TEXT',
  `value` text DEFAULT NULL,
  `defaultvalue` varchar(100) DEFAULT NULL,
  `defaultcontent` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8;

CREATE TABLE `category` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `context_extensions` enum('TRUE','FALSE') DEFAULT 'FALSE',
  `context_services` enum('TRUE','FALSE') DEFAULT 'FALSE',
  `description` text DEFAULT NULL,
  `status` enum('ACTIVE','INACTIVE') DEFAULT 'ACTIVE',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `routes_out` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(32) NOT NULL DEFAULT '',
  `description` varchar(255) DEFAULT NULL,
  `pattern` varchar(200) DEFAULT NULL,
  `prefix` varchar(10) DEFAULT NULL,
  `out_pin` enum('TRUE','FALSE') DEFAULT 'FALSE',
  `emergency` enum('TRUE','FALSE') DEFAULT 'FALSE',
  `out_cid` varchar(20) DEFAULT NULL,
  `status` enum('ACTIVE','INACTIVE') DEFAULT 'ACTIVE',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `category_route_out` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `category_id` int(11) unsigned NOT NULL,
  `route_out_id` int(11) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_category_ca_route_ut_id` (`category_id`),
  KEY `fk_route_out_route_ca_id` (`route_out_id`),
  CONSTRAINT `fk_category_ca_route_ut_id` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_route_out_route_ca_id` FOREIGN KEY (`route_out_id`) REFERENCES `routes_out` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `currencies` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(32) NOT NULL DEFAULT '',
  `currency` varchar(3) DEFAULT NULL,
  `symbol` varchar(5) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8;

CREATE TABLE `rates` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(40) NOT NULL DEFAULT '',
  `prefix` varchar(10) NOT NULL DEFAULT '',
  `number_of_digits` int(2) NOT NULL DEFAULT 0,
  `min_rate` double NOT NULL,
  `sec_rate` double NOT NULL,
  `currency_id` int(11) unsigned NOT NULL DEFAULT 1,
  `status` enum('ACTIVE','INACTIVE') NOT NULL DEFAULT 'ACTIVE',
  PRIMARY KEY (`id`),
  KEY `fk_currencies_rate_id` (`currency_id`),
  CONSTRAINT `fk_currencies_rate_id` FOREIGN KEY (`currency_id`) REFERENCES `currencies` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `voicemail_general` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `format` varchar(10) NOT NULL DEFAULT 'WAV',
  `servermail` varchar(45) DEFAULT '',
  `attach` enum('YES','NO') NOT NULL DEFAULT 'YES',
  `maxmsg` int(11) NOT NULL DEFAULT 100,
  `maxsecs` int(11) NOT NULL DEFAULT 180,
  `minsecs` int(11) NOT NULL DEFAULT 3,
  `maxgreet` int(11) NOT NULL DEFAULT 60,
  `skipms` int(11) NOT NULL DEFAULT 3000,
  `maxsilence` int(11) NOT NULL DEFAULT 9,
  `silencethreshold` int(11) NOT NULL DEFAULT 128,
  `maxlogins` int(11) DEFAULT NULL,
  `fromstring` varchar(45) NOT NULL DEFAULT '%A, %B %d, %Y at %r',
  `emaildateformat` varchar(45) DEFAULT '',
  `emailsubject` text NOT NULL,
  `emailbody` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `asterisk_voicemail_general` (`id`, `name`, `type`, `value`, `defaultvalue`, `defaultcontent`) VALUES
('1', 'format', 'TEXT', 'GSM,WAV,WAV49', 'WAV', ''),
('2', 'servermail', 'TEXT', '', '', ''),
('3', 'attach', 'SELECT', 'YES,NO', 'YES', ''),
('4', 'maxmsg', 'NUMBER', '100', '', '100'),
('5', 'maxsecs', 'NUMBER', '180', '', '180'),
('6', 'minsecs', 'NUMBER', '4', '', '4'),
('7', 'maxgreet', 'NUMBER', '60', '', '60'),
('8', 'skipms', 'NUMBER', '3000', '', '3000'),
('9', 'maxsilence', 'NUMBER', '3', '', '3'),
('10', 'silencethreshold', 'NUMBER', '128', '', '128'),
('11', 'maxlogins', 'NUMBER', '3', '', '3'),
('12', 'fromstring', 'TEXT', '%A, %B %d, %Y at %r', '', '%A, %B %d, %Y at %r'),
('13', 'emaildateformat', 'TEXT', '', '', ''),
('14', 'emailsubject', 'TEXT', '', '', 'Nuevo Mensaje de Voz (${VM_MSGNUM}) - ${VM_DUR} duracion en buzon ${VM_MAILBOX} de ${VM_CALLERID}'),
('15', 'emailbody', 'TEXT', '', '', 'Apreciado(a) ${VM_NAME}: Deseo informarle que tiene un mensaje de voz (numero ${VM_MSGNUM}) con una ');

INSERT INTO `category` (`id`, `name`, `context_extensions`, `context_services`, `description`, `status`) VALUES
('1', 'Category_1', 'TRUE', 'TRUE', NULL, 'ACTIVE'),
('2', 'Transferencias', 'TRUE', 'FALSE', NULL, 'ACTIVE');

INSERT INTO `routes_out` (`id`, `name`, `description`, `pattern`, `prefix`, `out_pin`, `emergency`, `out_cid`, `status`) VALUES
('1', 'Route_Out_1', NULL, 'NXXXXXX', '9', 'FALSE', 'FALSE', '20203030', 'ACTIVE'),
('2', 'OUTCelular', NULL, '3XXXXXXXXX', '05', 'FALSE', 'FALSE', NULL, 'ACTIVE'),
('3', 'OUTRetorno', NULL, 'XXXXX', '06', 'FALSE', 'FALSE', NULL, 'ACTIVE');

INSERT INTO `category_route_out` (`id`, `category_id`, `route_out_id`) VALUES
('4', '1', '2'),
('5', '1', '1'),
('6', '1', '3'),
('7', '2', '2');

INSERT INTO `currencies` (`id`, `name`, `currency`, `symbol`) VALUES
('1', 'American Dollar', 'USD', '$'),
('2', 'Colombian Peso', 'COP', '$'),
('3', 'East Caribbean Dollar', 'XCD', '$'),
('4', 'Argentine Peso', 'ARS', '$'),
('5', 'Bahamian Dollar', 'BSD', '$'),
('6', 'Barbados Dollar', 'BBD', '$'),
('7', 'Belize Dollar', 'BZD', '$'),
('8', 'Boliviano', 'BOB', 'Bs.'),
('9', 'Brazilian Real', 'BRL', 'R$'),
('10', 'Canadian Dollar', 'CAD', '$'),
('11', 'Chilean Peso', 'CLP', '$'),
('12', 'Costa Rican Colon', 'CRC', '₡'),
('13', 'Cuban Peso', 'CUP', '$'),
('14', 'Dominican Peso', 'DOP', '$'),
('15', 'Mexican Peso', 'MXN', '$'),
('16', 'Nuevo Sol', 'PEN', 'S/.');

INSERT INTO `rates` (`id`, `name`, `prefix`, `number_of_digits`, `min_rate`, `sec_rate`, `currency_id`, `status`) VALUES
('1', 'Out_Calls', '9', '7', '1.25', '0.045', '1', 'ACTIVE'),
('2', 'DEV_Celular', '05', '12', '1', '0.1', '1', 'ACTIVE');

INSERT INTO `voicemail_general` (`id`, `format`, `servermail`, `attach`, `maxmsg`, `maxsecs`, `minsecs`, `maxgreet`, `skipms`, `maxsilence`, `silencethreshold`, `maxlogins`, `fromstring`, `emaildateformat`, `emailsubject`, `emailbody`) VALUES
('1', 'WAV', NULL, 'YES', '100', '180', '4', '60', '3000', '3', '128', '3', '%A, %B %d, %Y at %r', NULL, 'Nuevo Mensaje de Voz (${VM_MSGNUM}) - ${VM_DUR} duracion en buzon ${VM_MAILBOX} de ${VM_CALLERID}', 'Apreciado(a) ${VM_NAME}: Deseo informarle que tiene un mensaje de voz (numero ${VM_MSGNUM}) con una ');
