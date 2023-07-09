package controller

import (
	"net/http"

	"github.com/chonticha1844/Gym-booking/entity"
	"github.com/chonticha1844/Gym-booking/service"
	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

// LoginPayload login body
type LoginPayload struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

// test struct temporarily
type User struct {
	entity.User
	User_username string `json:"username"`
	User_password string `json:"password"`
}

// SignUpPayload signup body
type SignUpPayload struct {
	Username string `json:"username"`
	Email    string `json:"email"`
	Password string `json:"password"`
}

// LoginResponse token response
type LoginResponse struct {
	Token string `json:"token"`
	ID    uint   `json:"id"`
	Role  int    `json:"role"`
}

// POST /loginUser
func LoginUser(c *gin.Context) {
	var payload LoginPayload
	var user entity.User

	if err := c.ShouldBindJSON(&payload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// ค้นหา user ด้วย Username ที่ผู้ใช้กรอกเข้ามา
	if err := entity.DB().Raw("SELECT * FROM users WHERE username = ?", payload.Username).Scan(&user).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ตรวจสอบรหัสผ่าน
	err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(payload.Password))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "password is incerrect"})
		return
	}

	// กำหนดค่า SecretKey, Issuer และระยะเวลาหมดอายุของ Token สามารถกำหนดเองได้
	// SecretKey ใช้สำหรับการ sign ข้อความเพื่อบอกว่าข้อความมาจากตัวเราแน่นอน
	// Issuer เป็น unique id ที่เอาไว้ระบุตัว client
	// ExpirationHours เป็นเวลาหมดอายุของ token

	jwtWrapper := service.JwtWrapper{
		SecretKey:       "SvNQpBN8y3qlVrsGAYYWoJJk56LtzFHx",
		Issuer:          "AuthService",
		ExpirationHours: 24,
	}

	signedToken, err := jwtWrapper.GenerateToken(user.Username)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "error signing token"})
		return
	}

	tokenResponse := LoginResponse{
		Token: signedToken,
		ID:    user.ID,
	}

	c.JSON(http.StatusOK, gin.H{"data": tokenResponse})
}
