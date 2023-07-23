package controller

import (
	"net/http"

	"github.com/asaskevich/govalidator"
	"github.com/chonticha1844/Gym-booking/entity"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

// POST /contactus
func CreateContactus(c *gin.Context) {
	var contactus entity.Contactus
	var member entity.Member

	if err := c.ShouldBindJSON(&contactus); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ค้นหา member ด้วย id
	if tx := entity.DB().Where("id = ?", contactus.MemberID).First(&member); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "member not found"})
		return
	}

	// 14: สร้าง  contactus
	ctu := entity.Contactus{
		Subject: contactus.Subject,
		Message: contactus.Message,
		Member:  member,
	}

	// การ validate
	if _, err := govalidator.ValidateStruct(contactus); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 13: บันทึก
	if err := entity.DB().Create(&ctu).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": ctu})

}

// GET /contactus/:id
func GetContactus(c *gin.Context) {
	var contactus entity.Contactus
	id := c.Param("id")
	if tx := entity.DB().Preload("User").Raw("SELECT * FROM contactuses WHERE id = ?", id).Find(&contactus).Error; tx != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "contactus not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": contactus})
}

// GET /contactus
func ListContactuses(c *gin.Context) {
	var contactuses []entity.Contactus

	if err := entity.DB().Preload("User").Raw("SELECT * FROM contactuses").Find(&contactuses).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": contactuses})
}

func UpdateContactus(c *gin.Context) {
	var contactus entity.Contactus
	var member entity.Member

	if err := c.ShouldBindJSON(&contactus); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ค้นหา member ด้วย id
	if tx := entity.DB().Where("id = ?", contactus.MemberID).First(&member); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "member not found"})
		return
	}
	update_contactus := entity.Contactus{
		Model:   gorm.Model{ID: contactus.ID},
		Subject: contactus.Subject,
		Message: contactus.Message,
		Member:  member,
	}

	// การ validate
	if _, err := govalidator.ValidateStruct(update_contactus); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", contactus.ID).Updates(update_contactus).Error; tx != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": tx.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": update_contactus})

}
func DeleteContactus(c *gin.Context) {
	id := c.Param("id")

	//ลบเมื่อ
	if err := entity.DB().Exec("DELETE FROM contactuses WHERE contactus_id = ?", id).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Exec("DELETE FROM contactuses WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "contactuses not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})

}
