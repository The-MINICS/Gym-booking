package controller

import (
	"net/http"

	"github.com/asaskevich/govalidator"
	"github.com/chonticha1844/Gym-booking/entity"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

// POST /booking
func CreateEquipmentBooking(c *gin.Context) {
	var equipmentbooking entity.EquipmentBooking
	var equipmenttimeslot entity.EquipmentTimeslot
	var equipment entity.Equipment

	if err := c.ShouldBindJSON(&equipmentbooking); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ค้นหา equipmenttimeslot ด้วย id
	if tx := entity.DB().Where("id = ?", equipmentbooking.EquipmentTimeslotID).First(&equipmenttimeslot); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Please select a time"})
		return
	}

	// ค้นหา equipment ด้วย id
	if tx := entity.DB().Where("id = ?", equipmentbooking.EquipmentID).First(&equipment); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Please select an equipment"})
		return
	}

	// // Update room equipmentbooking status
	// room.Quantity++

	// //คำนวณ remain ของ quantity
	// room.Remain = room.Capacity - room.Quantity

	// //จำนวน member ที่จองห้องต้องไม่เกิน capacity
	// if room.Quantity >= room.Capacity {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": "Room is fully booked"})
	// 	return
	// }

	// if &timeslot.ID == booking.TimeslotID {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": "You already booked for this time slot"})
	// 	return
	// }

	// 14: สร้าง  booking
	eqbk := entity.EquipmentBooking{
		EquipmentDatetime: equipmentbooking.EquipmentDatetime,
		EquipmentTimeslot: equipmenttimeslot,
		Equipment:         equipment,
	}

	// การ validate
	if _, err := govalidator.ValidateStruct(equipmentbooking); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 13: บันทึก
	if err := entity.DB().Create(&eqbk).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": eqbk})

}

// GET /equipmentbooking/:id
func GetEquipmentBooking(c *gin.Context) {
	var equipmentbooking entity.EquipmentBooking
	id := c.Param("id")
	if tx := entity.DB().Preload("EquipmentTimeslot").Preload("Equipment").Raw("SELECT * FROM equipment_bookings WHERE id = ?", id).Find(&equipmentbooking).Error; tx != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "equipment booking not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": equipmentbooking})
}

// GET /equipmentbooking
func ListEquipmentBookings(c *gin.Context) {
	var equipmentbookings []entity.EquipmentBooking

	if err := entity.DB().Preload("EquipmentTimeslot").Preload("Equipment").Raw("SELECT * FROM equipment_bookings").Find(&equipmentbookings).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": equipmentbookings})
}

func UpdateEquipmentBooking(c *gin.Context) {
	var equipmentbooking entity.EquipmentBooking
	var equipmenttimeslot entity.EquipmentTimeslot
	var equipment entity.Equipment

	if err := c.ShouldBindJSON(&equipmentbooking); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ค้นหา equipmenttimeslot ด้วย id
	if tx := entity.DB().Where("id = ?", equipmentbooking.EquipmentTimeslotID).First(&equipmenttimeslot); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Please select a time"})
		return
	}

	// ค้นหา equipment ด้วย id
	if tx := entity.DB().Where("id = ?", equipmentbooking.EquipmentID).First(&equipment); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Please select an equipment"})
		return
	}

	update_equipmentbooking := entity.EquipmentBooking{
		Model:             gorm.Model{ID: equipmentbooking.ID},
		EquipmentDatetime: equipmentbooking.EquipmentDatetime,
		EquipmentTimeslot: equipmenttimeslot,
		Equipment:         equipment,
	}

	// การ validate
	if _, err := govalidator.ValidateStruct(update_equipmentbooking); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", equipmentbooking.ID).Updates(update_equipmentbooking).Error; tx != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": tx.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": update_equipmentbooking})

}
func DeleteEquipmentBooking(c *gin.Context) {
	id := c.Param("id")

	//ลบเมื่อ
	if err := entity.DB().Exec("DELETE FROM equipment_bookings WHERE equipment_booking_id = ?", id).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Exec("DELETE FROM equipment_bookings WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "equipment bookings not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})

}
