package controller

import (
	"net/http"

	"github.com/chonticha1844/Gym-booking/entity"
	"github.com/gin-gonic/gin"
)

// POST--timeproportion--
func CreateTimeProportion(c *gin.Context) {
	var timeproportion entity.TimeProportion
	if err := c.ShouldBindJSON(&timeproportion); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&timeproportion).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": timeproportion})
}

//GET--timeproportion id--

func GetTimeProportion(c *gin.Context) {
	var timeproportion entity.TimeProportion
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM time_proportions WHERE id = ?", id).Scan(&timeproportion).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": timeproportion})
}

// GET--timeproportions--
func ListTimeProportions(c *gin.Context) {
	var timeproportions []entity.TimeProportion
	if err := entity.DB().Raw("SELECT * FROM time_proportions").Scan(&timeproportions).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": timeproportions})
}

// DELETE--timeproportion id--
func DeleteTimeProportion(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM time_proportions WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Time proportion not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH--timeproportion--
func UpdateTimeProportion(c *gin.Context) {
	var timeproportion entity.TimeProportion
	if err := c.ShouldBindJSON(&timeproportion); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", timeproportion.ID).First(&timeproportion); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Time proportion not found"})
		return
	}

	if err := entity.DB().Save(&timeproportion).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": timeproportion})
}
