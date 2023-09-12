package controller

import (
	"net/http"
	"time"

	"github.com/asaskevich/govalidator"
	"github.com/chonticha1844/Gym-booking/entity"
	"github.com/gin-gonic/gin"
)

// POST /booking
func CreateBooking(c *gin.Context) {
	var booking entity.Booking
	var member entity.Member
	var room entity.Room
	var timeslot entity.Timeslot
	// var equipmentbooking entity.EquipmentBooking

	if err := c.ShouldBindJSON(&booking); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ค้นหา member ด้วย id
	if tx := entity.DB().Where("id = ?", booking.MemberID).First(&member); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "member not found"})
		return
	}

	// ค้นหา room ด้วย id
	if tx := entity.DB().Where("id = ?", booking.RoomID).First(&room); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Please select a room"})
		return
	}

	// ค้นหา timeslot ด้วย id
	if tx := entity.DB().Where("id = ?", booking.TimeslotID).First(&timeslot); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Please select a time"})
		return
	}

	room.Quantity++

	// // Check if a booking already exists for the selected Timeslot
	// if tx := entity.DB().Where("timeslot_id = ?", booking.TimeslotID).First(&booking); tx.RowsAffected != 0 {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": "You can book only 1 time slot"})
	// 	return
	// }

	// 14: สร้าง  booking
	bk := entity.Booking{
		Datetime: time.Now(),
		Note:     booking.Note,
		Member:   member,
		Room:     room,
		Timeslot: timeslot,
	}

	// การ validate
	if _, err := govalidator.ValidateStruct(booking); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Update the Timeslot with the incremented Quantity
	if err := entity.DB().Save(&room).Error; err != nil {
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
	var booking entity.Booking
	id := c.Param("id")
	if tx := entity.DB().Preload("Member").Preload("Room").Preload("Timeslot").Raw("SELECT * FROM bookings WHERE id = ?", id).Find(&booking).Error; tx != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "booking not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": booking})
}

// GET /booking
func ListBookings(c *gin.Context) {
	var bookings []entity.Booking

	if err := entity.DB().Preload("Member").Preload("Room").Preload("Timeslot").Raw("SELECT * FROM bookings").Find(&bookings).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": bookings})
}

func DeleteBooking(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM bookings WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "bookings not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})

}
