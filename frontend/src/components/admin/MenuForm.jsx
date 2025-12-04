import React, { useState, useEffect } from 'react'
import './MenuForm.css'

// Helper function to get full image URL
const getImageUrl = (imagePath) => {
  if (!imagePath) return null
  // Nếu đã là full URL, trả về nguyên
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath
  }
  // Nếu là relative path từ server, thêm base URL
  if (imagePath.startsWith('/uploads/')) {
    const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'
    return `${baseURL}${imagePath}`
  }
  return imagePath
}

const MenuForm = ({ item, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: ''
  })
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)

  useEffect(() => {
    if (item) {
      setFormData({
        name: item.name || '',
        description: item.description || '',
        price: item.price || '',
        image: item.image || ''
      })
      setImagePreview(item.image || null)
    }
  }, [item])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      // Kiểm tra loại file
      if (!file.type.startsWith('image/')) {
        alert('Vui lòng chọn file hình ảnh')
        return
      }
      
      // Kiểm tra kích thước file (5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Kích thước file không được vượt quá 5MB')
        return
      }

      setImageFile(file)
      
      // Tạo preview
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!formData.name || !formData.price) {
      alert('Vui lòng điền đầy đủ thông tin bắt buộc')
      return
    }

    onSubmit({
      ...formData,
      price: parseFloat(formData.price),
      imageFile: imageFile
    })
  }

  return (
    <div className="menu-form-overlay">
      <div className="menu-form card">
        <div className="form-header">
          <h3>{item ? 'Sửa món ăn' : 'Thêm món ăn mới'}</h3>
          <button className="btn-close" onClick={onCancel}>×</button>
        </div>

        <form onSubmit={handleSubmit} className="form-content">
          <div className="input-group">
            <label htmlFor="name">
              Tên món ăn <span className="required">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Nhập tên món ăn"
            />
          </div>

          <div className="input-group">
            <label htmlFor="description">Mô tả</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              placeholder="Nhập mô tả món ăn"
            />
          </div>

          <div className="input-group">
            <label htmlFor="price">
              Giá (VNĐ) <span className="required">*</span>
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              min="0"
              placeholder="Nhập giá món ăn"
            />
          </div>

          <div className="input-group">
            <label htmlFor="image">Hình ảnh</label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleFileChange}
            />
            
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={onCancel}>
              Hủy
            </button>
            <button type="submit" className="btn btn-primary">
              {item ? 'Cập nhật' : 'Thêm món'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default MenuForm



