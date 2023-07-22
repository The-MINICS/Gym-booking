package controller

import (
	"net/http"

	"github.com/chonticha1844/Gym-booking/entity"
	"github.com/gin-gonic/gin"
)

// POST--picture--
func CreatePicture(c *gin.Context) {
	var picture entity.Picture
	if err := c.ShouldBindJSON(&picture); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&picture).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": picture})
}

//GET--picture id--

func GetPicture(c *gin.Context) {
	var picture entity.Picture
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM pictures WHERE id = ?", id).Scan(&picture).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": picture})
}

// GET--pictures--
func ListPictures(c *gin.Context) {
	var pictures []entity.Picture
	if err := entity.DB().Raw("SELECT * FROM pictures").Scan(&pictures).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": pictures})
}

// DELETE--picture id--
func DeletePicture(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM pictures WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "picture not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH--picture--
func UpdatePicture(c *gin.Context) {
	var picture entity.Picture
	if err := c.ShouldBindJSON(&picture); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", picture.ID).First(&picture); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "picture not found"})
		return
	}

	if err := entity.DB().Save(&picture).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": picture})
}
