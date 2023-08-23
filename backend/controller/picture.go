package controller

import (
	"net/http"

	"github.com/asaskevich/govalidator"
	"github.com/chonticha1844/Gym-booking/entity"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
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
	var pic entity.Picture

	if err := c.ShouldBindJSON(&pic); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var new_picture_tittle = pic.Title
	var new_picture_pic = pic.Picture
	var new_picture_describe = pic.Describe

	if tx := entity.DB().Where("id = ?", pic.ID).First(&pic); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "picture not found"})
		return
	}

	picture_update := entity.Picture{
		Model:    gorm.Model{ID: pic.ID},
		Picture:  new_picture_pic,
		Title:    new_picture_tittle,
		Describe: new_picture_describe,
	}

	if _, err := govalidator.ValidateStruct(picture_update); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Save(&picture_update).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Where("id = ?", pic.ID).Updates(&picture_update).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": picture_update})

}
