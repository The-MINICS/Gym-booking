package controller

import (
	"net/http"

	"github.com/asaskevich/govalidator"
	"github.com/chonticha1844/Gym-booking/entity"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

// POST--room--
func CreateRoom(c *gin.Context) {
	var room entity.Room
	if err := c.ShouldBindJSON(&room); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&room).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
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

// DELETE--room id--
func DeleteRoom(c *gin.Context) {
	id := c.Param("id")
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
	var new_room_quantity = room.Quantity
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
		Quantity:     new_room_quantity,
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
