package controller

import (
	"net/http"

	"github.com/asaskevich/govalidator"
	"github.com/chonticha1844/Gym-booking/entity"
	"github.com/gin-gonic/gin"
	"gopkg.in/gomail.v2"
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
		c.JSON(http.StatusBadRequest, gin.H{"error": "Member not found"})
		return
	}

	status := uint(6)

	// 14: สร้าง  contactus
	ctu := entity.Contactus{
		Subject:  contactus.Subject,
		Message:  contactus.Message,
		Member:   member,
		StatusID: &status,
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
	if tx := entity.DB().Preload("Member").Raw("SELECT * FROM contactus WHERE id = ?", id).Find(&contactus).Error; tx != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Contactus not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": contactus})
}

// GET /contactus
func ListContactuses(c *gin.Context) {
	var contactuses []entity.Contactus

	if err := entity.DB().Preload("Member").Raw("SELECT * FROM contactus").Find(&contactuses).Error; err != nil {
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
		c.JSON(http.StatusBadRequest, gin.H{"error": "ContactUs not found"})
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

func SendInformEmail3(email string) error {
	d := gomail.NewDialer("smtp.gmail.com", 587, "TheMINICSGym@gmail.com", "rmzo slrg mdqf cxgg")

	// Create an email message
	m := gomail.NewMessage()
	m.SetHeader("From", "TheMINICSGym@gmail.com")
	m.SetHeader("To", email)
	m.SetHeader("Subject", "Response to your request.")
	m.SetBody("text/plain", "Your issue is solved.")

	if err := d.DialAndSend(m); err != nil {
		return err
	}

	return nil
}

func SendInformEmail4(email string) error {
	d := gomail.NewDialer("smtp.gmail.com", 587, "TheMINICSGym@gmail.com", "rmzo slrg mdqf cxgg")

	// Create an email message
	m := gomail.NewMessage()
	m.SetHeader("From", "TheMINICSGym@gmail.com")
	m.SetHeader("To", email)
	m.SetHeader("Subject", "Response to your request.")
	m.SetBody("text/plain", "We changed your password. You can use your phone number as a password and then go to change your password (Member>Account Settings>Change my password)")

	if err := d.DialAndSend(m); err != nil {
		return err
	}

	return nil
}

func ResponseContactus(c *gin.Context) {
	var contactus entity.Contactus
	var member entity.Member
	id := c.Param("id")

	if err := entity.DB().Where("id = ?", id).First(&contactus).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Contactus not found"})
		return
	}

	if err := entity.DB().Where("id = ?", contactus.MemberID).First(&member).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Member not found"})
		return
	}

	// Update the contactus status to "finished"
	if err := entity.DB().Model(&contactus).Update("StatusID", 8).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to update contactus status"})
		return
	}

	if contactus.Subject == "Fotgotten password" {
		err := SendInformEmail4(member.Email)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Error sending email"})
			return
		}
	} else {
		err := SendInformEmail3(member.Email)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Error sending email"})
			return
		}
	}
	c.JSON(http.StatusOK, gin.H{"data": id})

}
