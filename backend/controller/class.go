package controller

import (
	"net/http"

	"github.com/asaskevich/govalidator"
	"github.com/chonticha1844/Gym-booking/entity"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

// POST /classes
func CreateClass(c *gin.Context) {

	var class entity.Class
	var admin entity.Admin
	var room entity.Room
	var activity entity.Activity

	if err := c.ShouldBindJSON(&class); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ค้นหา admin ด้วย id
	if tx := entity.DB().Where("id = ?", class.AdminID).First(&admin); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "admin not found"})
		return
	}

	// ค้นหา room ด้วย id
	if tx := entity.DB().Where("id = ?", class.RoomID).First(&room); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "กรุณาเลือกห้อง"})
		return
	}

	// ค้นหา activity ด้วย id
	if tx := entity.DB().Where("id = ?", class.ActivityID).First(&activity); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "กรุณาเลือกกิจกรรม"})
		return
	}

	// 14: สร้าง  class
	cls := entity.Class{
		Class_datetime: class.Class_datetime,
		Admin:          admin,
		Room:           room,
		Activity:       activity,
	}

	// การ validate
	if _, err := govalidator.ValidateStruct(class); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 13: บันทึก
	if err := entity.DB().Create(&cls).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": cls})

}

// GET /class/:id
func GetClass(c *gin.Context) {
	var class entity.Class
	id := c.Param("id")
	if tx := entity.DB().Preload("Admin").Preload("Room").Preload("Activity").Raw("SELECT * FROM classes WHERE id = ?", id).Find(&class).Error; tx != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "class not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": class})
}

// GET /class
func ListClasses(c *gin.Context) {
	var classes []entity.Class

	if err := entity.DB().Preload("Admin").Preload("Room").Preload("Activity").Raw("SELECT * FROM classes").Find(&classes).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": classes})
}

func UpdateClass(c *gin.Context) {
	var class entity.Class
	var admin entity.Admin
	var room entity.Room
	var activity entity.Activity

	if err := c.ShouldBindJSON(&class); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ค้นหา admin ด้วย id
	if tx := entity.DB().Where("id = ?", class.AdminID).First(&admin); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "admin not found"})
		return
	}

	// ค้นหา room ด้วย id
	if tx := entity.DB().Where("id = ?", class.RoomID).First(&room); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "กรุณาเลือกห้อง"})
		return
	}

	// ค้นหา activity ด้วย id
	if tx := entity.DB().Where("id = ?", class.ActivityID).First(&activity); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "กรุณาเลือกกิจกรรม"})
		return
	}

	update_class := entity.Class{
		Model:          gorm.Model{ID: class.ID},
		Class_datetime: class.Class_datetime,
		Admin:          admin,
		Room:           room,
		Activity:       activity,
	}

	// การ validate
	if _, err := govalidator.ValidateStruct(class); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", class.ID).Updates(&update_class).Error; tx != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": tx.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": update_class})

}
func DeleteClass(c *gin.Context) {
	id := c.Param("id")

	//ลบเมื่อ
	if err := entity.DB().Exec("DELETE FROM classes WHERE class_id = ?", id).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Exec("DELETE FROM classes WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "class not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})

}
