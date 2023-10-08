package controller

import (
	"net/http"
	"time"

	"github.com/asaskevich/govalidator"
	"github.com/chonticha1844/Gym-booking/entity"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

// POST / equipmentbooking
func CreateEquipmentBooking(c *gin.Context) {
	var equipmentbooking entity.EquipmentBooking
	var equipmenttimeslot entity.EquipmentTimeslot
	var equipment entity.Equipment
	var booking entity.Booking

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

	// ค้นหา booking ด้วย id
	if tx := entity.DB().Where("id = ?", equipmentbooking.BookingID).First(&booking); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Please select a booking"})
		return
	}

	// Check if the equipmentbooking already has a equipment for the same timeslot with "canceled" status
	if tx := entity.DB().Where("equipment_id = ? AND equipment_timeslot_id = ? AND status_id = ?", equipmentbooking.EquipmentID, equipmentbooking.EquipmentTimeslotID, 4).First(&equipmentbooking); tx.RowsAffected != 0 {
		// Member already booked this equipment and timeslot, update the existing booking
		status2 := uint(3)
		eqbk := entity.EquipmentBooking{
			EquipmentDatetime: time.Now(),
			EquipmentNote:     equipmentbooking.EquipmentNote,
			EquipmentTimeslot: equipmenttimeslot,
			Equipment:         equipment,
			Booking:           booking,
			StatusID:          &status2,
		}

		if err := entity.DB().Save(&eqbk).Error; err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		c.JSON(http.StatusOK, gin.H{"data": eqbk})
		return
	}

	//Member จองอุปกรณ์ 1 เครื่องได้แค่ 1 ครั้ง ต่อ 1 เวลา
	if *equipmentbooking.StatusID == 3 {
		if tx := entity.DB().Where("equipment_id = ? AND equipment_timeslot_id = ? ", equipmentbooking.EquipmentID, equipmentbooking.EquipmentTimeslotID).First(&equipmentbooking); tx.RowsAffected != 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "You can book equipment only 1 equipment per time slot"})
			return
		}
	}

	status2 := uint(3)
	// 14: สร้าง  booking
	eqbk := entity.EquipmentBooking{
		EquipmentDatetime: time.Now(),
		EquipmentNote:     equipmentbooking.EquipmentNote,
		EquipmentTimeslot: equipmenttimeslot,
		Equipment:         equipment,
		Booking:           booking,
		StatusID:          &status2,
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

	// Update the equipment status to "unavailable"
	if err := entity.DB().Model(&equipment).Update("StatusID", 1).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to update equipment status"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"data": eqbk})

}

// GET /equipmentbooking/:id
func GetEquipmentBooking(c *gin.Context) {
	var equipmentbooking entity.EquipmentBooking
	id := c.Param("id")
	if tx := entity.DB().Preload("EquipmentTimeslot").Preload("Equipment").Preload("Booking").Raw("SELECT * FROM equipment_bookings WHERE id = ?", id).Find(&equipmentbooking).Error; tx != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "equipment booking not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": equipmentbooking})
}

// GET /equipmentbooking
func ListEquipmentBookings(c *gin.Context) {
	var equipmentbookings []entity.EquipmentBooking

	if err := entity.DB().Preload("EquipmentTimeslot").Preload("Equipment").Preload("Booking").Raw("SELECT * FROM equipment_bookings").Find(&equipmentbookings).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": equipmentbookings})
}

func UpdateEquipmentBooking(c *gin.Context) {
	var equipmentbooking entity.EquipmentBooking
	var equipmenttimeslot entity.EquipmentTimeslot
	var equipment entity.Equipment
	var booking entity.Booking

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

	// ค้นหา booking ด้วย id
	if tx := entity.DB().Where("id = ?", equipmentbooking.BookingID).First(&booking); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Please select a booking"})
		return
	}

	var Newequipmentnote = equipmentbooking.EquipmentNote

	update_equipmentbooking := entity.EquipmentBooking{
		Model:             gorm.Model{ID: equipmentbooking.ID},
		EquipmentDatetime: time.Now(),
		EquipmentNote:     Newequipmentnote,
		EquipmentTimeslot: equipmenttimeslot,
		Equipment:         equipment,
		Booking:           booking,
	}

	// การ validate
	if _, err := govalidator.ValidateStruct(update_equipmentbooking); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", equipmentbooking.ID).Updates(&update_equipmentbooking).Error; tx != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": tx.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": update_equipmentbooking})

}

func DeleteEquipmentBooking(c *gin.Context) {
	var equipment entity.Equipment
	var equipmentbooking entity.EquipmentBooking

	id := c.Param("id")

	if err := entity.DB().Where("id = ?", id).First(&equipmentbooking).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Equipment ooking not found"})
		return
	}

	if err := entity.DB().Where("id = ?", equipmentbooking.EquipmentID).First(&equipment).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Equipment not found"})
		return
	}

	// Update the equipment booking status to "canceled"
	if err := entity.DB().Model(&equipmentbooking).Update("StatusID", 4).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to update equipment status"})
		return
	}

	// Update the equipment status to "available"
	if err := entity.DB().Model(&equipment).Update("StatusID", 1).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to update equipment status"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}
