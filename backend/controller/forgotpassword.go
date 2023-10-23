package controller

import (
	"net/http"

	"github.com/asaskevich/govalidator"
	"github.com/chonticha1844/Gym-booking/entity"
	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
	"gopkg.in/gomail.v2"
	"gorm.io/gorm"
)

// ForgotPayload
type ForgotPayload struct {
	Email string `json:"email"`
}

// LoginResponse token response
type ForgotResponse struct {
	Token string `json:"token"`
	ID    uint   `json:"id"`
}

// func SendPasswordResetEmail(email, token string) error {
// 	d := gomail.NewDialer("smtp.gmail.com", 587, "TheMINICSGym@gmail.com", "rmzo slrg mdqf cxgg")

// 	// Create an email message
// 	m := gomail.NewMessage()
// 	m.SetHeader("From", "TheMINICSGym@gmail.com")
// 	m.SetHeader("To", email)
// 	m.SetHeader("Subject", "Password Reset")
// 	m.SetBody("text/html", fmt.Sprintf("To reset your password, <a href='http://127.0.0.1:5173/reset-password?token=%s'>click here</a>.", token))

// 	if err := d.DialAndSend(m); err != nil {
// 		return err
// 	}

// 	return nil
// }

func SendPasswordResetEmail(email string) error {
	d := gomail.NewDialer("smtp.gmail.com", 587, "TheMINICSGym@gmail.com", "rmzo slrg mdqf cxgg")

	// Create an email message
	m := gomail.NewMessage()
	m.SetHeader("From", "TheMINICSGym@gmail.com")
	m.SetHeader("To", email)
	m.SetHeader("Subject", "Password Reset")
	m.SetBody("text/plain", "We have received your request. We will contact you within 24 hours.")

	if err := d.DialAndSend(m); err != nil {
		return err
	}

	return nil
}

func ForgotPassword(c *gin.Context) {
	var forgotpassword ForgotPayload
	var member entity.Member

	if err := c.ShouldBindJSON(&forgotpassword); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("email = ?", forgotpassword.Email).First(&member); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Your email is incorrect."})
		return
	}

	status := uint(6)

	// 14: สร้าง  contactus
	ctu := entity.Contactus{
		Subject:  "Fotgotten password",
		Message:  "Please change my password to default password.",
		Member:   member,
		StatusID: &status,
	}

	// 13: บันทึก
	if err := entity.DB().Create(&ctu).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Send a password reset email to the user
	err := SendPasswordResetEmail(forgotpassword.Email)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Error sending the password reset email"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": member})
}

// func ForgotPassword(c *gin.Context) {
// 	var forgotpassword ForgotPayload
// 	var member entity.Member

// 	if err := c.ShouldBindJSON(&forgotpassword); err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}

// 	if tx := entity.DB().Where("email = ?", forgotpassword.Email).First(&member); tx.RowsAffected == 0 {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": "Your email is incorrect."})
// 		return
// 	}

// 	jwtWrapper := service.JwtWrapper{
// 		SecretKey:       "SvNQpBN8y3qlVrsGAYYWoJJk56LtzFHx",
// 		Issuer:          "AuthService",
// 		ExpirationHours: 24,
// 	}

// 	// Generate a password reset token
// 	token, err := jwtWrapper.GeneratePasswordResetToken(forgotpassword.Email)
// 	if err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": "Error generating the password reset token"})
// 		return
// 	}

// 	// Send a password reset email to the user
// 	err = SendPasswordResetEmail(forgotpassword.Email, token)
// 	if err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": "Error sending the password reset email"})
// 		return
// 	}

// 	c.JSON(http.StatusOK, gin.H{"data": member})
// }

func ResetPassword(c *gin.Context) {
	var member entity.Member

	// Bind the JSON request to a struct
	if err := c.ShouldBindJSON(&member); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var newNewPassword = member.NewPassword
	var newConfirmNewPassword = member.ConfirmNewPassword

	// Retrieve the user's current hashed password from the database
	if tx := entity.DB().Where("id = ?", member.ID).First(&member); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Member not found"})
		return
	}

	// เข้ารหัสลับรหัสผ่านที่ผู้ใช้กรอกก่อนบันทึกลงฐานข้อมูล
	hashedNewPassword, err := bcrypt.GenerateFromPassword([]byte(newNewPassword), 14)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "error hashing password"})
		return
	}

	// เข้ารหัสลับรหัสผ่านที่ผู้ใช้กรอกก่อนบันทึกลงฐานข้อมูล
	hashedConfirmNewPassword, err := bcrypt.GenerateFromPassword([]byte(newConfirmNewPassword), 14)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "error hashing password"})
		return
	}

	// การ validate
	if _, err := govalidator.ValidateStruct(member); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	reset_password := entity.Member{
		Model:              gorm.Model{ID: member.ID},
		NewPassword:        string(hashedNewPassword),
		ConfirmNewPassword: string(hashedConfirmNewPassword),
	}

	if tx := entity.DB().Where("id = ?", member.ID).Updates(&reset_password).Error; tx != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": tx.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": reset_password})

	// Validate the new password and confirmation
	if newNewPassword != newConfirmNewPassword {
		c.JSON(http.StatusBadRequest, gin.H{"error": "New password and confirmation do not match"})
		return
	}

	// Update the user's password in the database with the new hashed password
	if err := entity.DB().Model(&member).Update("Password", string(hashedNewPassword)).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error updating password"})
		return
	}
}
