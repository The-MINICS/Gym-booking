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
	// var timeslot entity.Timeslot
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
	// if tx := entity.DB().Where("id = ?", booking.TimeslotID).First(&timeslot); tx.RowsAffected == 0 {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": "Please select a time"})
	// 	return
	// }

	// ค้นหา equipmentbooking ด้วย id
	// if tx := entity.DB().Where("id = ?", booking.EquipmentBookingID).First(&equipmentbooking); tx.RowsAffected == 0 {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": "Please select an equipment"})
	// 	return
	// }

	// Update room booking status
	room.Quantity++

	//คำนวณ remain ของ quantity
	room.Remain = room.Capacity - room.Quantity

	//จำนวน member ที่จองห้องต้องไม่เกิน capacity
	if room.Quantity >= room.Capacity {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Room is fully booked"})
		return
	}

	// if &timeslot.ID == booking.TimeslotID {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": "You already booked for this time slot"})
	// 	return
	// }

	// 14: สร้าง  booking
	bk := entity.Booking{
		Datetime: time.Now(),
		Note:     booking.Note,
		Member:   member,
		Room:     room,
		// Timeslot: timeslot,
		// EquipmentBooking: equipmentbooking,
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
	var booking entity.Booking
	id := c.Param("id")
	if tx := entity.DB().Preload("Member").Preload("Room").Raw("SELECT * FROM bookings WHERE id = ?", id).Find(&booking).Error; tx != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "booking not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": booking})
}

// GET /booking
func ListBookings(c *gin.Context) {
	var bookings []entity.Booking

	if err := entity.DB().Preload("Member").Preload("Room").Raw("SELECT * FROM bookings").Find(&bookings).Error; err != nil {
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
