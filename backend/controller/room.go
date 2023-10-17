package controller

import (
	"net/http"
	"time"

	"github.com/asaskevich/govalidator"
	"github.com/chonticha1844/Gym-booking/entity"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

// POST--room--
func CreateRoom(c *gin.Context) {
	var date entity.Date
	var room entity.Room

	if err := c.ShouldBindJSON(&room); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Create a new room and associate it with the date
	rm := entity.Room{
		Activity:     room.Activity,
		Number:       room.Number,
		Capacity:     room.Capacity,
		Attendant:    room.Attendant,
		Illustration: room.Illustration,
		Caption:      room.Caption,
	}

	// การ validate
	if _, err := govalidator.ValidateStruct(room); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Insert the room into the database
	if err := entity.DB().Create(&rm).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Get the current date
	currentDate := time.Now()

	// Create rooms for the current day and the next three days
	for i := 0; i < 4; i++ {
		// Generate date ID based on the current date and i
		dateID := currentDate.AddDate(0, 0, i)

		date = entity.Date{
			DateCode: dateID,
			Timeslots: []entity.Timeslot{
				{
					Slot:     "8:00 - 12:00",
					Quantity: 0,
					RoomID:   &rm.ID,
				},
				{
					Slot:     "13:00 - 16:00",
					Quantity: 0,
					RoomID:   &rm.ID,
				},
				{
					Slot:     "16:30 - 19:30",
					Quantity: 0,
					RoomID:   &rm.ID,
				},
			},
			RoomID: &rm.ID,
		}

		if err := entity.DB().Create(&date).Error; err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

	}

	c.JSON(http.StatusOK, gin.H{"data": room})
}

// GET--room id--
func GetRoom(c *gin.Context) {
	var room entity.Room
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM rooms WHERE id = ?", id).Scan(&room).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": room})
}

// GET--rooms--
func ListRooms(c *gin.Context) {
	var rooms []entity.Room
	if err := entity.DB().Raw("SELECT * FROM rooms").Scan(&rooms).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": rooms})
}

func DeleteRoom(c *gin.Context) {
	id := c.Param("id")

	var room entity.Room
	if err := entity.DB().Where("id = ?", id).First(&room).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Room not found"})
		return
	}

	// Delete associated timeslots
	if err := entity.DB().Exec("DELETE FROM timeslots WHERE room_id = ?", id).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to delete associated timeslots"})
		return
	}

	// Delete associated dates
	if err := entity.DB().Exec("DELETE FROM dates WHERE room_id = ?", id).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to delete associated dates"})
		return
	}

	if tx := entity.DB().Exec("DELETE FROM rooms WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "room not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH--room--
func UpdateRoom(c *gin.Context) {
	var room entity.Room

	if err := c.ShouldBindJSON(&room); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var new_room_activity = room.Activity
	var new_room_number = room.Number
	var new_room_capacity = room.Capacity
	var new_room_attendant = room.Attendant
	var new_room_illustration = room.Illustration
	var new_room_caption = room.Caption

	if tx := entity.DB().Where("id = ?", room.ID).First(&room); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "room not found"})
		return
	}

	room_update := entity.Room{
		Model:        gorm.Model{ID: room.ID},
		Activity:     new_room_activity,
		Number:       new_room_number,
		Capacity:     new_room_capacity,
		Attendant:    new_room_attendant,
		Illustration: new_room_illustration,
		Caption:      new_room_caption,
	}

	if _, err := govalidator.ValidateStruct(room_update); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Save(&room_update).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Where("id = ?", room.ID).Updates(&room_update).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": room_update})
}
