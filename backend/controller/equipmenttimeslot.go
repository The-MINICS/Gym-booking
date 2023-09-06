package controller

import (
	"net/http"

	"github.com/chonticha1844/Gym-booking/entity"
	"github.com/gin-gonic/gin"
)

// POST--equipmenttimeslot--
func CreateEquipmentTimeslot(c *gin.Context) {
	var equipmenttimeslot entity.EquipmentTimeslot
	if err := c.ShouldBindJSON(&equipmenttimeslot); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&equipmenttimeslot).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": equipmenttimeslot})
}

//GET--equipmenttimeslot id--

func GetEquipmentTimeslot(c *gin.Context) {
	var equipmenttimeslot entity.EquipmentTimeslot
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM equipment_timeslots WHERE id = ?", id).Scan(&equipmenttimeslot).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": equipmenttimeslot})
}

// GET--equipmenttimeslots--
func ListEquipmentTimeslots(c *gin.Context) {
	var equipmenttimeslots []entity.EquipmentTimeslot
	if err := entity.DB().Raw("SELECT * FROM equipment_timeslots").Scan(&equipmenttimeslots).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": equipmenttimeslots})
}

// DELETE--equipmenttimeslot id--
func DeleteEquipmentTimeslot(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM equipment_timeslots WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Time slot not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH--equipmenttimeslot--
func UpdateEquipmentTimeslot(c *gin.Context) {
	var equipmenttimeslot entity.EquipmentTimeslot
	if err := c.ShouldBindJSON(&equipmenttimeslot); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", equipmenttimeslot.ID).First(&equipmenttimeslot); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Time slot not found"})
		return
	}

	if err := entity.DB().Save(&equipmenttimeslot).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": equipmenttimeslot})
}
