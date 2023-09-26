package controller

import (
	"net/http"
	"strings"
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
	var date entity.Date

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

	// ค้นหา date ด้วย id
	if tx := entity.DB().Where("id = ?", booking.DateID).First(&date); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Please select a date"})
		return
	}

	timeslot.Quantity++

	//Member จองแต่ละ time slot ได้แค่ 1 ครั้ง
	if tx := entity.DB().Where("member_id = ? AND timeslot_id = ?", booking.MemberID, booking.TimeslotID).First(&booking); tx.RowsAffected != 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "You can book only 1 times per time slot"})
		return
	}

	//จำนวน member ที่จองห้องต้องไม่เกิน capacity
	if timeslot.Quantity > room.Capacity {
		c.JSON(http.StatusBadRequest, gin.H{"error": "This time slot is fully booked"})
		return
	}

	// 14: สร้าง  booking
	bk := entity.Booking{
		Datetime: booking.Datetime,
		Note:     booking.Note,
		Member:   member,
		Room:     room,
		Timeslot: timeslot,
		Date:     date,
	}

	// การ validate
	if _, err := govalidator.ValidateStruct(booking); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Update the Timeslot with the incremented Quantity
	if err := entity.DB().Save(&timeslot).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 13: บันทึก
	if err := entity.DB().Create(&bk).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if strings.Contains(room.Activity, "fitness") || strings.Contains(room.Activity, "Fitness") {
		var equipmenttimeslot entity.EquipmentTimeslot
		var equipment entity.Equipment

		// Create an EquipmentBooking record
		equipmentBooking := entity.EquipmentBooking{
			EquipmentDatetime: time.Now(),
			EquipmentTimeslot: equipmenttimeslot,
			Equipment:         equipment,
			BookingID:         &bk.ID,
		}

		// Save the EquipmentBooking record to the database
		if err := entity.DB().Create(&equipmentBooking).Error; err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
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
	var booking entity.Booking
	var timeslot entity.Timeslot

	id := c.Param("id")

	if err := entity.DB().Where("id = ?", id).First(&booking).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Booking not found"})
		return
	}

	if err := entity.DB().Where("id = ?", booking.TimeslotID).First(&timeslot).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Timeslot not found"})
		return
	}

	if timeslot.Quantity > 0 {
		timeslot.Quantity--
	}

	// Save the updated timeslot back to the database
	if err := entity.DB().Save(&timeslot).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Exec("DELETE FROM bookings WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "bookings not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}
