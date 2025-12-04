require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const path = require('path')

const authRoutes = require('./routes/authRoutes')
const menuRoutes = require('./routes/menuRoutes')
const tableRoutes = require('./routes/tableRoutes')
const orderRoutes = require('./routes/orderRoutes')
const { notFound, errorHandler } = require('./middleware/errorMiddleware')

const app = express()

const corsOrigin = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(',').map(origin => origin.trim())
  : ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:5173', 'http://localhost:5174']

app.use(cors({ origin: corsOrigin, credentials: true }))

// Parse JSON và URL-encoded bodies - đặt trước routes
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, '../uploads')))

if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'))
}

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

app.use('/api/auth', authRoutes)
app.use('/api/menu', menuRoutes)
app.use('/api/tables', tableRoutes)
app.use('/api/orders', orderRoutes)

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 QR Order API đang chạy tại http://localhost:${PORT}`) // eslint-disable-line no-console
  console.log(`📡 CORS cho phép: ${corsOrigin.join(', ')}`) // eslint-disable-line no-console
}).on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`❌ Port ${PORT} đã được sử dụng. Vui lòng đổi port hoặc dừng ứng dụng khác.`) // eslint-disable-line no-console
  } else {
    console.error('❌ Lỗi khởi động server:', err) // eslint-disable-line no-console
  }
  process.exit(1)
})

