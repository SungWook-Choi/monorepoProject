-- 가계부 기능용 LedgerEntry 테이블 생성
CREATE TABLE IF NOT EXISTS `LedgerEntry` (
  `LedgerEntryID` INT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'PK',
  `Title` VARCHAR(150) NOT NULL COMMENT '내역 제목',
  `Category` VARCHAR(80) NOT NULL DEFAULT '기타' COMMENT '분류',
  `Type` VARCHAR(10) NOT NULL DEFAULT 'expense' COMMENT 'income/expense',
  `Amount` DECIMAL(12,2) NOT NULL COMMENT '금액',
  `OccurredDate` DATE NOT NULL COMMENT '발생 일자',
  `Memo` TEXT NULL COMMENT '추가 메모',
  `CreateDate` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UpdateDate` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`LedgerEntryID`),
  KEY `idx_ledger_occurred_date` (`OccurredDate`),
  KEY `idx_ledger_type` (`Type`)
);

-- 신규 내역 입력 예시
INSERT INTO `LedgerEntry` (`Title`, `Category`, `Type`, `Amount`, `OccurredDate`, `Memo`)
VALUES ('점심 식사', '식비', 'expense', 12000, '2025-02-15', '팀 점심');

-- 금액/메모 수정 예시
UPDATE `LedgerEntry`
SET `Amount` = 13500, `Memo` = '참여 인원 3명'
WHERE `LedgerEntryID` = 1;

-- 내역 삭제 예시
DELETE FROM `LedgerEntry`
WHERE `LedgerEntryID` = 1;
