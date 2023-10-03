package controller

import (
	"net/http"
	"time"

	"github.com/asaskevich/govalidator"
	"github.com/chonticha1844/Gym-booking/entity"
	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

// POST /members
func CreateMember(c *gin.Context) {
	var member entity.Member
	var gender entity.Gender

	if err := c.ShouldBindJSON(&member); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ค้นหา gender ด้วย id
	if tx := entity.DB().Where("id = ?", member.GenderID).First(&gender); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Choose your gender"})
		return
	}

	// เข้ารหัสลับรหัสผ่านที่ผู้ใช้กรอกก่อนบันทึกลงฐานข้อมูล
	hashPassword, err := bcrypt.GenerateFromPassword([]byte(member.Password), 14)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "error hashing password"})
		return
	}

	// การ validate
	if _, err := govalidator.ValidateStruct(member); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	//กำหนด Role ตอนสร้าง
	role := uint(2)

	// 14: สร้าง  member
	mr := entity.Member{
		Username:        member.Username,
		Email:           member.Email,
		Password:        string(hashPassword),
		Gender:          gender,
		Firstname:       member.Firstname,
		Lastname:        member.Lastname,
		Phonenumber:     member.Phonenumber,
		Member_datetime: time.Now(),
		Age:             member.Age,
		Weight:          member.Weight,
		Height:          member.Height,
		RoleID:          &role,
	}

	// 13: บันทึก
	if err := entity.DB().Create(&mr).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": mr})
}

// GET /member/:id
func GetMember(c *gin.Context) {
	var member entity.Member
	id := c.Param("id")
	if tx := entity.DB().Preload("Gender").Preload("Role").Raw("SELECT * FROM members WHERE id = ?", id).Find(&member).Error; tx != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "member not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": member})
}

// GET /member
func ListMembers(c *gin.Context) {
	var members []entity.Member

	if err := entity.DB().Preload("Gender").Preload("Role").Raw("SELECT * FROM members WHERE role_id = 2").Find(&members).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": members})
}

func UpdateMember(c *gin.Context) {
	var member entity.Member
	var gender entity.Gender
	var role entity.Role

	if err := c.ShouldBindJSON(&member); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var newUsername = member.Username
	var newFirstname = member.Firstname
	var newLastname = member.Lastname
	var newEmail = member.Email
	var newPassword = member.Password
	var newPhone = member.Phonenumber
	var newAge = member.Age
	var newWeight = member.Weight
	var newHeight = member.Height

	if tx := entity.DB().Where("id = ?", member.GenderID).First(&gender); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Gender not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", member.RoleID).First(&role); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Role not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", member.ID).First(&member); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Member not found"})
		return
	}

	update_member := entity.Member{
		Model:           gorm.Model{ID: member.ID},
		Username:        newUsername,
		Email:           newEmail,
		Password:        newPassword,
		Gender:          gender,
		Firstname:       newFirstname,
		Lastname:        newLastname,
		Phonenumber:     newPhone,
		Member_datetime: member.Member_datetime,
		Age:             newAge,
		Weight:          newWeight,
		Height:          newHeight,
		Role:            role,
	}

	// การ validate
	if _, err := govalidator.ValidateStruct(update_member); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if !(member.Password[0:13] == "$2a$14$") {
		hashPassword, err := bcrypt.GenerateFromPassword([]byte(member.Password), 14)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "error hashing password"})
			return

		}
		update_member.Password = string(hashPassword)
	}

	if tx := entity.DB().Where("id = ?", member.ID).Updates(&update_member).Error; tx != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": tx.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": update_member})

}

func ChangePassword(c *gin.Context) {
	var member entity.Member

	// Bind the JSON request to a struct
	if err := c.ShouldBindJSON(&member); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Retrieve the user's current hashed password from the database
	if tx := entity.DB().Where("id = ?", member.ID).First(&member); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Member not found"})
		return
	}

	// เข้ารหัสลับรหัสผ่านที่ผู้ใช้กรอกก่อนบันทึกลงฐานข้อมูล
	hashPassword1, err := bcrypt.GenerateFromPassword([]byte(member.OldPassword), 14)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "error hashing password"})
		return
	}

	// เข้ารหัสลับรหัสผ่านที่ผู้ใช้กรอกก่อนบันทึกลงฐานข้อมูล
	hashPassword2, err := bcrypt.GenerateFromPassword([]byte(member.NewPassword), 14)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "error hashing password"})
		return
	}

	// เข้ารหัสลับรหัสผ่านที่ผู้ใช้กรอกก่อนบันทึกลงฐานข้อมูล
	hashPassword3, err := bcrypt.GenerateFromPassword([]byte(member.ConfirmNewPassword), 14)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "error hashing password"})
		return
	}

	update_password := entity.Member{
		Model:              gorm.Model{ID: member.ID},
		OldPassword:        string(hashPassword1),
		NewPassword:        string(hashPassword2),
		ConfirmNewPassword: string(hashPassword3),
	}

	if tx := entity.DB().Where("id = ?", member.ID).Updates(&update_password).Error; tx != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": tx.Error()})
		return
	}

	// Verify the old password
	if err := bcrypt.CompareHashAndPassword([]byte(member.Password), []byte(member.OldPassword)); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Current password is incorrect"})
		return
	}

	var newPassword = member.NewPassword
	var confirmPassword = member.ConfirmNewPassword

	// Validate the new password and confirmation
	if newPassword != confirmPassword {
		c.JSON(http.StatusBadRequest, gin.H{"error": "New password and confirmation do not match"})
		return
	}

	// Hash the new password
	newHashedPassword, err := bcrypt.GenerateFromPassword([]byte(newPassword), bcrypt.DefaultCost)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Error hashing new password"})
		return
	}

	// Update the user's password in the database with the new hashed password
	if err := entity.DB().Model(&member).Update("Password", string(newHashedPassword)).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error updating password"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Password changed successfully"})
}

// DELETE /members/:id
func DeleteMember(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM members WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Member not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}
