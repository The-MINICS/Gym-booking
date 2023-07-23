package controller

import (
	"net/http"

	"github.com/asaskevich/govalidator"
	"github.com/chonticha1844/Gym-booking/entity"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

// POST /booking
func CreateBooking(c *gin.Context) {
	var booking entity.Booking
	var user entity.User
	var equipment entity.Equipment

	if err := c.ShouldBindJSON(&booking); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ค้นหา user ด้วย id
	if tx := entity.DB().Where("id = ?", booking.UserID).First(&user); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})
		return
	}

	// ค้นหา equipment ด้วย id
	if tx := entity.DB().Where("id = ?", booking.EquipmentID).First(&equipment); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "กรุณาเลือกอุปกรณ์"})
		return
	}

	// 14: สร้าง  booking
	bk := entity.Booking{
		Booking_datetime: booking.Booking_datetime,
		User:             user,
		Equipment:        equipment,
	}

	// การ validate
	if _, err := govalidator.ValidateStruct(booking); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 13: บันทึก
	if err := entity.DB().Create(&bk).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": bk})

}

// GET /booking/:id
func GetBooking(c *gin.Context) {
	var booking entity.User
	id := c.Param("id")
	if tx := entity.DB().Preload("User").Preload("Equipment").Raw("SELECT * FROM bookings WHERE id = ?", id).Find(&booking).Error; tx != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "booking not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": booking})
}

// GET /booking
func ListBookings(c *gin.Context) {
	var bookings []entity.Booking

	if err := entity.DB().Preload("User").Preload("Equipment").Raw("SELECT * FROM bookings").Find(&bookings).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": bookings})
}

func UpdateBooking(c *gin.Context) {
	var booking entity.Booking
	var user entity.User
	var equipment entity.Equipment

	if err := c.ShouldBindJSON(&booking); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ค้นหา user ด้วย id
	if tx := entity.DB().Where("id = ?", booking.UserID).First(&user); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})
		return
	}

	// ค้นหา equipment ด้วย id
	if tx := entity.DB().Where("id = ?", booking.EquipmentID).First(&equipment); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "กรุณาเลือกอุปกรณ์"})
		return
	}

	update_booking := entity.Booking{
		Model:            gorm.Model{ID: booking.ID},
		Booking_datetime: booking.Booking_datetime,
		User:             user,
		Equipment:        equipment,
	}

	// การ validate
	if _, err := govalidator.ValidateStruct(update_booking); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", booking.ID).Updates(update_booking).Error; tx != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": tx.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": update_booking})

}
func DeleteBooking(c *gin.Context) {
	id := c.Param("id")

	//ลบเมื่อ
	if err := entity.DB().Exec("DELETE FROM bookings WHERE booking_id = ?", id).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Exec("DELETE FROM bookings WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "bookings not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})

}
