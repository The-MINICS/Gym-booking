package controller

import (
	"net/http"

	"github.com/chonticha1844/Gym-booking/entity"
	"github.com/gin-gonic/gin"
)

// POST--date--
func CreateDate(c *gin.Context) {
	var date entity.Date
	if err := c.ShouldBindJSON(&date); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&date).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": date})
}

//GET--date id--

func GetDate(c *gin.Context) {
	var date entity.Date
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM dates WHERE id = ?", id).Scan(&date).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": date})
}

// GET--dates--
func ListDates(c *gin.Context) {
	var dates []entity.Date
	if err := entity.DB().Raw("SELECT * FROM dates").Scan(&dates).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": dates})
}

// DELETE--date id--
func DeleteDate(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM dates WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Date not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH--date--
func UpdateDate(c *gin.Context) {
	var date entity.Date
	if err := c.ShouldBindJSON(&date); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", date.ID).First(&date); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Date not found"})
		return
	}

	if err := entity.DB().Save(&date).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": date})
}
