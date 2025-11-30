-- 로그인 이벤트 적재용 LoginHistory 테이블 생성
CREATE TABLE IF NOT EXISTS `LoginHistory` (
  `LoginHistoryID` INT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'PK',
  `UserID` INT UNSIGNED NOT NULL COMMENT 'Login 테이블과 매핑',
  `ProviderType` VARCHAR(50) NOT NULL COMMENT 'google/local 등 로그인 공급자',
  `Email` VARCHAR(200) NULL DEFAULT NULL COMMENT '로그인에 사용된 이메일',
  `UserAgent` VARCHAR(255) NULL DEFAULT NULL COMMENT '접속 브라우저 정보',
  `LoginAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '로그인 시각',
  PRIMARY KEY (`LoginHistoryID`),
  KEY `idx_login_history_user` (`UserID`, `LoginAt`)
);

-- OAuth 로그인 성공 시 기록 예시
INSERT INTO `LoginHistory` (`UserID`, `ProviderType`, `Email`, `UserAgent`)
VALUES (1, 'google', 'sample@company.com', 'Chrome on macOS');

-- 접속 로그 확인 쿼리 예시
SELECT `UserID`, `ProviderType`, `Email`, `LoginAt`
FROM `LoginHistory`
ORDER BY `LoginAt` DESC
LIMIT 20;
