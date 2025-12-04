const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const pool = require('../config/db')

const buildTokenPayload = (user) => {
  const normalizedRole = user.vai_tro === 'nhanvien' ? 'staff' : user.vai_tro
  return {
    id: user.id,
    username: user.ten_dang_nhap,
    role: normalizedRole
  }
}

const generateToken = (payload) => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET chưa được cấu hình trong file .env')
  }
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '12h'
  })
}

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body

    if (!username || !password) {
      return res.status(400).json({ message: 'Vui lòng nhập tên đăng nhập và mật khẩu' })
    }

    const [rows] = await pool.query(
      'SELECT * FROM nguoi_dung WHERE ten_dang_nhap = ? LIMIT 1',
      [username]
    )

    const user = rows[0]

    if (!user) {
      return res.status(401).json({ message: 'Sai tên đăng nhập hoặc mật khẩu' })
    }

    const isMatch = await bcrypt.compare(password, user.mat_khau)

    if (!isMatch) {
      return res.status(401).json({ message: 'Sai tên đăng nhập hoặc mật khẩu' })
    }

    const payload = buildTokenPayload(user)
    const token = generateToken(payload)

    res.json({
      token,
      user: payload
    })
  } catch (error) {
    console.error('Login error:', error)
    // Nếu là lỗi JWT_SECRET, trả về lỗi rõ ràng
    if (error.message && error.message.includes('JWT_SECRET')) {
      return res.status(500).json({ message: error.message })
    }
    next(error)
  }
}

exports.getProfile = async (req, res, next) => {
  try {
    res.json({ user: req.user })
  } catch (error) {
    next(error)
  }
}

