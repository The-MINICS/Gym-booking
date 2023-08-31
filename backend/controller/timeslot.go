package controller

import (
	"net/http"

	"github.com/chonticha1844/Gym-booking/entity"
	"github.com/gin-gonic/gin"
)

// POST--timeslot--
func CreateTimeslot(c *gin.Context) {
	var timeslot entity.Timeslot
	if err := c.ShouldBindJSON(&timeslot); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&timeslot).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": timeslot})
}

//GET--timeslot id--

func GetTimeslot(c *gin.Context) {
	var timeslot entity.Timeslot
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM timeslots WHERE id = ?", id).Scan(&timeslot).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": timeslot})
}

// GET--timeslots--
func ListTimeslots(c *gin.Context) {
	var timeslots []entity.Timeslot
	if err := entity.DB().Raw("SELECT * FROM timeslots").Scan(&timeslots).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": timeslots})
}

// DELETE--timeslot id--
func DeleteTimeslot(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM timeslots WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Time slot not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH--timeslot--
func UpdateTimeslot(c *gin.Context) {
	var timeslot entity.Timeslot
	if err := c.ShouldBindJSON(&timeslot); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", timeslot.ID).First(&timeslot); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Time slot not found"})
		return
	}

	if err := entity.DB().Save(&timeslot).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": timeslot})
}
