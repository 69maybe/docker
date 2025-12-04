🚀 QR Order System

Node.js (Express) + React + MySQL + Docker

Hệ thống gọi món bằng QR Code dành cho nhà hàng, chạy hoàn toàn trong Docker để giúp các developer cài đặt nhanh chóng, đồng nhất môi trường và dễ dàng deploy.

📂 Cấu trúc thư mục
project/
│  README.md
│  docker-compose.yml
│
├── backend/              # Express API
│   ├── Dockerfile
│   ├── package.json
│   └── src/
│
├── frontend/             # React App
│   ├── Dockerfile
│   ├── package.json
│   └── src/
│
└── database/
    └── qr_order_system.sql

🧰 Yêu cầu hệ thống

Docker Desktop

WSL2 (Windows)

Không cần cài Node, MySQL, NPM → Docker sẽ lo tất cả.

🐳 Chạy bằng Docker
🔥 1. Build & start toàn bộ hệ thống

Trong thư mục project:

docker compose up --build


Docker sẽ khởi chạy 3 service:

Service	Port	Mô tả
frontend	http://localhost:3000
	React UI
backend	http://localhost:5000
	Express API
db (MySQL)	localhost:3306	Database