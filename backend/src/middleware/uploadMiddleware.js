const multer = require('multer')
const path = require('path')
const fs = require('fs')

// Đảm bảo thư mục uploads tồn tại
const uploadsDir = path.join(__dirname, '../../uploads')
const menuDir = path.join(uploadsDir, 'menu')
const qrcodeDir = path.join(uploadsDir, 'qrcodes')

try {
  ;[uploadsDir, menuDir, qrcodeDir].forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
  })
} catch (error) {
  console.error('Error creating upload directories:', error)
  // Không throw error để server vẫn có thể khởi động
}

// Cấu hình storage cho menu images
const menuStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, menuDir)
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    const ext = path.extname(file.originalname)
    cb(null, 'menu-' + uniqueSuffix + ext)
  }
})

// Cấu hình storage cho QR codes
const qrcodeStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, qrcodeDir)
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, 'qrcode-' + uniqueSuffix + '.png')
  }
})

// File filter - chỉ cho phép hình ảnh
const imageFilter = (req, file, cb) => {
  const allowedMimes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true)
  } else {
    cb(new Error('Chỉ chấp nhận file hình ảnh (JPEG, PNG, GIF, WEBP)'), false)
  }
}

// Upload middleware cho menu images
const uploadMenuImage = multer({
  storage: menuStorage,
  fileFilter: imageFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB
  }
})

// Upload middleware cho QR codes (nếu cần upload QR code files)
const uploadQRCode = multer({
  storage: qrcodeStorage,
  fileFilter: imageFilter,
  limits: {
    fileSize: 2 * 1024 * 1024 // 2MB
  }
})

module.exports = {
  uploadMenuImage,
  uploadQRCode
}

