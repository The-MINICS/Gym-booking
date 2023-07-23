package controller

import (
	"net/http"

	"github.com/asaskevich/govalidator"
	"github.com/chonticha1844/Gym-booking/entity"
	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

// POST /admins
func CreateAdmin(c *gin.Context) {
	var admin entity.Admin
	var gender entity.Gender
	var role entity.Role

	if err := c.ShouldBindJSON(&admin); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ค้นหา gender ด้วย id
	if tx := entity.DB().Where("id = ?", admin.GenderID).First(&gender); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "กรุณาเลือกเพศ"})
		return
	}

	// ค้นหา role ด้วย id
	if tx := entity.DB().Where("id = ?", admin.RoleID).First(&role); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "กรุณาเลือกหน้าที่(Role)"})
		return
	}

	// เข้ารหัสลับรหัสผ่านที่ผู้ใช้กรอกก่อนบันทึกลงฐานข้อมูล
	hashPassword, err := bcrypt.GenerateFromPassword([]byte(admin.Admin_password), 14)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "error hashing password"})
		return
	}

	// 14: สร้าง  admin
	adm := entity.Admin{
		Admin_firstname: admin.Admin_firstname,
		Admin_lastname:  admin.Admin_lastname,
		Admin_email:     admin.Admin_email,
		Admin_password:  string(hashPassword),
		Gender:          gender,
		Role:            role,
	}

	// การ validate
	if _, err := govalidator.ValidateStruct(admin); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 13: บันทึก
	if err := entity.DB().Create(&adm).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": adm})

}

// GET /admins
// List all admins
func ListAdmins(c *gin.Context) {
	var admins []entity.Admin
	if err := entity.DB().Preload("Gender").Preload("Role").Raw("SELECT * FROM admins").Find(&admins).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": admins})
}

// GET /admin/:id
// Get admin by id
func GetAdmin(c *gin.Context) {
	var admin entity.Admin
	id := c.Param("id")
	if tx := entity.DB().Preload("Gender").Preload("Role").Raw("SELECT * FROM admins WHERE id = ?", id).Find(&admin).Error; tx != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "admin not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": admin})
}

// PATCH /admins
func UpdateAdmin(c *gin.Context) {
	var admin entity.Admin
	var gender entity.Gender
	var role entity.Role

	if err := c.ShouldBindJSON(&admin); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", admin.GenderID).First(&gender); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "gender not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", admin.RoleID).First(&role); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "role not found"})
		return
	}

	update_admin := entity.Admin{
		Model:           gorm.Model{ID: admin.ID},
		Admin_firstname: admin.Admin_firstname,
		Admin_lastname:  admin.Admin_lastname,
		Admin_email:     admin.Admin_email,
		Admin_password:  admin.Admin_password,
		Gender:          gender,
		Role:            role,
	}

	if _, err := govalidator.ValidateStruct(update_admin); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if !(admin.Admin_password[0:6] == "$2a$14$") {
		hashPassword, err := bcrypt.GenerateFromPassword([]byte(admin.Admin_password), 14)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "error hashing password"})
			return

		}
		update_admin.Admin_password = string(hashPassword)
	}

	if err := entity.DB().Save(&update_admin).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": update_admin})

}

// DELETE /admins/:id
func DeleteAdmin(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM admins WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "admins not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})

}
