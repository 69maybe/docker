# Docker Laravel + MySQL + React

## Yêu cầu
- Docker Desktop
- WSL2

## Cách chạy:
docker compose up -d

## Truy cập:
Laravel: http://localhost:8000  
React: http://localhost:3000  
MySQL: localhost:3307 (root/root)

## Chạy lệnh Laravel:
docker exec -it laravel_app bash
composer install
php artisan migrate
