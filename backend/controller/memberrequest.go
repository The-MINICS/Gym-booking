package controller

import (
	"net/http"
	"time"

	"github.com/asaskevich/govalidator"
	"github.com/chonticha1844/Gym-booking/entity"
	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
	"gopkg.in/gomail.v2"
)

// POST /members user request
func MemberRequest(c *gin.Context) {
	var memberrequest entity.MemberRequest
	var gender entity.Gender

	if err := c.ShouldBindJSON(&memberrequest); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ค้นหา gender ด้วย id
	if tx := entity.DB().Where("id = ?", memberrequest.GenderID).First(&gender); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Please select your gender"})
		return
	}

	// เข้ารหัสลับรหัสผ่านที่ผู้ใช้กรอกก่อนบันทึกลงฐานข้อมูล
	hashPassword, err := bcrypt.GenerateFromPassword([]byte(memberrequest.Password), 14)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Error hashing password"})
		return
	}

	// การ validate
	if _, err := govalidator.ValidateStruct(memberrequest); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	//กำหนด Role ตอนสร้าง
	role := uint(2)

	//กำหนด Role ตอนสร้าง
	status := uint(6)

	// 14: สร้าง  member
	mr := entity.MemberRequest{
		Username:               memberrequest.Username,
		Email:                  memberrequest.Email,
		Password:               string(hashPassword),
		Gender:                 gender,
		Firstname:              memberrequest.Firstname,
		Lastname:               memberrequest.Lastname,
		Phonenumber:            memberrequest.Phonenumber,
		MemberRequest_datetime: time.Now(),
		Age:                    memberrequest.Age,
		Weight:                 memberrequest.Weight,
		Height:                 memberrequest.Height,
		Attachment:             memberrequest.Attachment,
		RoleID:                 &role,
		StatusID:               &status,
	}

	// 13: บันทึก
	if err := entity.DB().Create(&mr).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": mr})
}

// GET /member/:id
func GetMemberRequest(c *gin.Context) {
	var memberrequest entity.MemberRequest
	id := c.Param("id")
	if tx := entity.DB().Preload("Gender").Preload("Role").Preload("Status").Raw("SELECT * FROM member_requests WHERE id = ?", id).Find(&memberrequest).Error; tx != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Member request not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": memberrequest})
}

// GET /member
func ListMemberRequests(c *gin.Context) {
	var memberrequests []entity.MemberRequest

	if err := entity.DB().Preload("Gender").Preload("Role").Preload("Status").Raw("SELECT * FROM member_requests").Find(&memberrequests).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": memberrequests})
}

// DELETE /members/:id
func DeleteMemberRequest(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM member_requests WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Member not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

//////////////////////////////////////////////////////////////////////////////////////

// ขั้นตอนการ ACCEPT by admin
func CreateMemberFromRequest(memberrequest *entity.MemberRequest) (*entity.Member, error) {
	// Create a new member using data from the MemberRequest
	member := entity.Member{
		Username:        memberrequest.Username,
		Email:           memberrequest.Email,
		Password:        memberrequest.Password,
		GenderID:        memberrequest.GenderID,
		Firstname:       memberrequest.Firstname,
		Lastname:        memberrequest.Lastname,
		Phonenumber:     memberrequest.Phonenumber,
		Member_datetime: time.Now(),
		Age:             memberrequest.Age,
		Weight:          memberrequest.Weight,
		Height:          memberrequest.Height,
		RoleID:          memberrequest.RoleID,
		MemberRequestID: &memberrequest.ID,
	}

	if err := entity.DB().Create(&member).Error; err != nil {
		return nil, err
	}

	return &member, nil
}

func SendInformEmail1(email string) error {
	d := gomail.NewDialer("smtp.gmail.com", 587, "TheMINICSGym@gmail.com", "rmzo slrg mdqf cxgg")

	// Create an email message
	m := gomail.NewMessage()
	m.SetHeader("From", "TheMINICSGym@gmail.com")
	m.SetHeader("To", email)
	m.SetHeader("Subject", "Membership acceptance")
	m.SetBody("text/plain", "Wellcome to our community. You have been accepted as a member of the MINICS Gym.")

	if err := d.DialAndSend(m); err != nil {
		return err
	}

	return nil
}

// GET /member/:id
func GetMemberRequestID(c *gin.Context) {
	id := c.Param("id")
	var memberRequestID uint
	if err := entity.DB().Model(entity.MemberRequest{}).Where("id = ?", id).Pluck("id", &memberRequestID).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Member request not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": memberRequestID})
}

func AcceptRequest(c *gin.Context) {
	var memberrequest entity.MemberRequest

	if err := c.ShouldBindJSON(&memberrequest); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", memberrequest.ID).First(&memberrequest); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Member request not found"})
		return
	}

	// Check if email or username already exist
	errorMessage := CheckEmailAndUsernameExists(memberrequest.Email, memberrequest.Username)
	if errorMessage == "Email already exists" {
		SendInformEmailEmailAlreadyExists(memberrequest.Email)
		entity.DB().Model(&memberrequest).Update("StatusID", 7)
		c.JSON(http.StatusInternalServerError, gin.H{"error": errorMessage})
		return
	}
	if errorMessage == "Username already exists" {
		SendInformEmailUsernameAlreadyExists(memberrequest.Email)
		entity.DB().Model(&memberrequest).Update("StatusID", 7)
		c.JSON(http.StatusInternalServerError, gin.H{"error": errorMessage})
		return
	}

	// If no existing member found, create a new member
	newMember, err := CreateMemberFromRequest(&memberrequest)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create a new member"})
		return
	}

	// Send an email
	err = SendInformEmail1(memberrequest.Email)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Error sending email"})
		return
	}

	// Update the member request status to "accepted"
	if err := entity.DB().Model(&memberrequest).Update("StatusID", 5).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to update member request status"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"data": newMember})
}

func CheckEmailAndUsernameExists(email, username string) string {
	var existingMember entity.Member
	if err := entity.DB().Where("email = ?", email).First(&existingMember).Error; err == nil {
		return "Email already exists"
	}

	if err := entity.DB().Where("username = ?", username).First(&existingMember).Error; err == nil {
		return "Username already exists"
	}

	return ""
}

func SendInformEmailEmailAlreadyExists(email string) error {
	d := gomail.NewDialer("smtp.gmail.com", 587, "TheMINICSGym@gmail.com", "rmzo slrg mdqf cxgg")

	// Create an email message
	m := gomail.NewMessage()
	m.SetHeader("From", "TheMINICSGym@gmail.com")
	m.SetHeader("To", email)
	m.SetHeader("Subject", "Membership acceptance")
	m.SetBody("text/plain", "Sorry, Your member request was rejected because of your email have been used. Please send a request again with a new email address.")

	if err := d.DialAndSend(m); err != nil {
		return err
	}

	return nil
}

func SendInformEmailUsernameAlreadyExists(email string) error {
	d := gomail.NewDialer("smtp.gmail.com", 587, "TheMINICSGym@gmail.com", "rmzo slrg mdqf cxgg")

	// Create an email message
	m := gomail.NewMessage()
	m.SetHeader("From", "TheMINICSGym@gmail.com")
	m.SetHeader("To", email)
	m.SetHeader("Subject", "Membership acceptance")
	m.SetBody("text/plain", "Sorry, Your member request was rejected because of your username have been used. Please send a request again with a new username.")

	if err := d.DialAndSend(m); err != nil {
		return err
	}

	return nil
}

///////////////////////////////////////////////////////////////////////////////////

// ขั้นตอนการ Deny
func SendInformEmail2(email string) error {
	d := gomail.NewDialer("smtp.gmail.com", 587, "TheMINICSGym@gmail.com", "rmzo slrg mdqf cxgg")

	// Create an email message
	m := gomail.NewMessage()
	m.SetHeader("From", "TheMINICSGym@gmail.com")
	m.SetHeader("To", email)
	m.SetHeader("Subject", "Membership acceptance")
	m.SetBody("text/plain", "Sorry, Your member request was rejected. Please send a request again. You can inquire for more information at the number 0881234567.")

	if err := d.DialAndSend(m); err != nil {
		return err
	}

	return nil
}

func DenyRequest(c *gin.Context) {
	var memberrequest entity.MemberRequest

	if err := c.ShouldBindJSON(&memberrequest); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Where("id = ?", memberrequest.ID).First(&memberrequest).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Member request not found"})
		return
	}

	err := SendInformEmail2(memberrequest.Email)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Error sending email"})
		return
	}

	// Update the member request status to "denied"
	if err := entity.DB().Model(&memberrequest).Update("StatusID", 7).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to update member request status"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"data": memberrequest})
}
