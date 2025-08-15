# 1 단계: 빌드된 결과만 가져오는 경우는 생략 가능

# 2 단계: Nginx 이미지로 React 정적 파일 서비스
FROM nginx:alpine

# React 빌드 결과 복사
COPY dist /usr/share/nginx/html

# Nginx 설정 덮어쓰기 ( 상대경로 기준 )
COPY nginx.conf /etc/nginx/nginx.conf
