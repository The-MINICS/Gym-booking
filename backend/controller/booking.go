package controller

import (
	"net/http"

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
	var status entity.Status

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

	// ค้นหา status ด้วย id
	if tx := entity.DB().Where("id = ?", booking.StatusID).First(&status); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Please select status a date"})
		return
	}

	// Check if the member already has a booking for the same timeslot with "canceled" status
	if tx := entity.DB().Where("member_id = ? AND timeslot_id = ? AND status_id = ?", booking.MemberID, booking.TimeslotID, 4).First(&booking); tx.RowsAffected != 0 {
		// Member already booked this timeslot, update the existing booking
		status1 := uint(3)
		bk := entity.Booking{
			Datetime: booking.Datetime,
			Note:     booking.Note,
			Member:   member,
			Room:     room,
			Timeslot: timeslot,
			Date:     date,
			StatusID: &status1,
		}

		if err := entity.DB().Save(&bk).Error; err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		c.JSON(http.StatusOK, gin.H{"data": bk})
		return
	}

	//Member can book only 1 times per time slot
	if *booking.StatusID == uint(3) {
		if tx := entity.DB().Where("member_id = ? AND timeslot_id = ?", booking.MemberID, booking.TimeslotID).First(&booking); tx.RowsAffected != 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "You can book only 1 times per time slot"})
			return
		}
	}

	timeslot.Quantity++

	//จำนวน member ที่จองห้องต้องไม่เกิน capacity
	if timeslot.Quantity > room.Capacity {
		c.JSON(http.StatusBadRequest, gin.H{"error": "This time slot is fully booked"})
		return
	}

	status1 := uint(3)

	// 14: สร้าง  booking
	bk := entity.Booking{
		Datetime: booking.Datetime,
		Note:     booking.Note,
		Member:   member,
		Room:     room,
		Timeslot: timeslot,
		Date:     date,
		StatusID: &status1,
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

	// Update the equipment status to "available"
	if err := entity.DB().Model(&booking).Update("StatusID", 4).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to update booking status"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}
