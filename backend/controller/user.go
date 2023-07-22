package controller

import (
	"net/http"

	"github.com/asaskevich/govalidator"
	"github.com/chonticha1844/Gym-booking/entity"
	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
	//"gorm.io/gorm"
)

// POST /users
func CreateUser(c *gin.Context) {

	var user entity.User
	var gender entity.Gender

	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ค้นหา gender ด้วย id
	if tx := entity.DB().Where("id = ?", user.GenderID).First(&gender); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "กรุณาเลือกเพศ"})
		return
	}

	// เข้ารหัสลับรหัสผ่านที่ผู้ใช้กรอกก่อนบันทึกลงฐานข้อมูล
	hashPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), 14)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "error hashing password"})
		return
	}

	// 14: สร้าง  user
	usr := entity.User{
		Username:  user.Username,
		Email:     user.Email,
		Password:  string(hashPassword),
		Gender:    gender,
		Firstname: user.Firstname,
		Lastname:  user.Lastname,
		Age:       user.Age,
		Weight:    user.Weight,
		Height:    user.Height,
	}

	// การ validate
	if _, err := govalidator.ValidateStruct(user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 13: บันทึก
	if err := entity.DB().Create(&usr).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": usr})

}

// GET /user/:id
func GetUser(c *gin.Context) {
	var user entity.User
	id := c.Param("id")
	if tx := entity.DB().Preload("Gender").Raw("SELECT * FROM users WHERE id = ?", id).Find(&user).Error; tx != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": user})
}

// GET /user
func ListUsers(c *gin.Context) {
	var users []entity.User

	if err := entity.DB().Preload("Gender").Raw("SELECT * FROM users").Find(&users).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": users})
}

func UpdateUser(c *gin.Context) {
	var user entity.User
	var gender entity.Gender

	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ค้นหา gender ด้วย id
	if tx := entity.DB().Where("id = ?", user.GenderID).First(&gender); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "กรุณาเลือกเพศ"})
		return
	}

	update_user := entity.User{
		Username:  user.Username,
		Email:     user.Email,
		Password:  user.Password,
		Gender:    gender,
		Firstname: user.Firstname,
		Lastname:  user.Lastname,
		Age:       user.Age,
		Weight:    user.Weight,
		Height:    user.Height,
	}

	// การ validate
	if _, err := govalidator.ValidateStruct(update_user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if !(user.Password[0:13] == "$2a$14$") {
		hashPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), 14)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "error hashing password"})
			return

		}
		update_user.Password = string(hashPassword)
	}

	if tx := entity.DB().Where("id = ?", user.ID).Updates(&update_user).Error; tx != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": tx.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": update_user})

}
func DeleteUser(c *gin.Context) {
	id := c.Param("id")

	//ลบเมื่อ
	if err := entity.DB().Exec("DELETE FROM users WHERE user_id = ?", id).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Exec("DELETE FROM users WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "users not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})

}
