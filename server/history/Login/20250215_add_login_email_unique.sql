-- 로컬 회원가입 시 이메일 중복을 막기 위해 (Email, ProviderType) 유니크 제약 추가
ALTER TABLE Common.Login
  ADD UNIQUE KEY `ux_login_email_provider` (`Email`, `ProviderType`);
