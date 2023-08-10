package controller

import (
	"net/http"

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
		Member_datetime: member.Member_datetime,
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

	if err := entity.DB().Preload("Gender").Preload("Role").Raw("SELECT * FROM members").Find(&members).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": members})
}

func UpdateMember(c *gin.Context) {
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

	update_member := entity.Member{
		Model:           gorm.Model{ID: member.ID},
		Username:        member.Username,
		Email:           member.Email,
		Password:        member.Password,
		Gender:          gender,
		Firstname:       member.Firstname,
		Lastname:        member.Lastname,
		Phonenumber:     member.Phonenumber,
		Age:             member.Age,
		Weight:          member.Weight,
		Height:          member.Height,
		Member_datetime: member.Member_datetime,
		Role:            member.Role,
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
func DeleteMember(c *gin.Context) {
	id := c.Param("id")

	//ลบเมื่อ
	if err := entity.DB().Exec("DELETE FROM members WHERE member_id = ?", id).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Exec("DELETE FROM members WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "members not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})

}
