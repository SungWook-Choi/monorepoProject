# 회원가입 API 요청 규격 (프론트 기대치)

- `POST /auth/signup`
- Headers: `Content-Type: application/json`
- Body:
  ```json
  {
    "name": "홍길동",
    "email": "user@example.com",
    "password": "P@ssw0rd1"
  }
  ```
- Response (성공):
  ```json
  {
    "ok": true,
    "message": "signup created"
  }
  ```
- Response (실패 예시):
  ```json
  {
    "ok": false,
    "message": "email already exists"
  }
  ```

현재 백엔드에 `/auth/signup` 라우트가 없으면 404가 납니다. 프론트는 위 규격으로 요청을 전송하며, 실패 시 메시지를 표시합니다. (약관 동의 여부는 프론트에서만 검증)
