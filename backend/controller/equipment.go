package controller

import (
	"net/http"

	"github.com/asaskevich/govalidator"
	"github.com/chonticha1844/Gym-booking/entity"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

// POST--equipment--
func CreateEquipment(c *gin.Context) {
	var equipment entity.Equipment
	var picture entity.Picture

	if err := c.ShouldBindJSON(&equipment); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ค้นหา picture ด้วย id
	if tx := entity.DB().Where("id = ?", equipment.PictureID).First(&picture); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Please select a picture"})
		return
	}

	// 14: สร้าง  equipmentr
	eqi := entity.Equipment{
		Equipments: equipment.Equipments,
		Picture:    picture,
	}

	// การ validate
	if _, err := govalidator.ValidateStruct(equipment); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 13: บันทึก
	if err := entity.DB().Create(&eqi).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": eqi})

}

//GET--equipment id--

func GetEquipment(c *gin.Context) {
	var equipment entity.Equipment
	id := c.Param("id")
	if err := entity.DB().Preload("Picture").Raw("SELECT * FROM equipment WHERE id = ?", id).Scan(&equipment).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": equipment})
}

// GET--equipments--
func ListEquipments(c *gin.Context) {
	var equipmets []entity.Equipment
	if err := entity.DB().Preload("Picture").Raw("SELECT * FROM equipment").Find(&equipmets).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": equipmets})
}

// PATCH--equipment
func UpdateEquipment(c *gin.Context) {
	var equipment entity.Equipment
	var picture entity.Picture

	if err := c.ShouldBindJSON(&equipment); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ค้นหา picture ด้วย id
	if tx := entity.DB().Where("id = ?", equipment.PictureID).First(&picture); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Please select a picture"})
		return
	}
	update_equipment := entity.Equipment{
		Model:      gorm.Model{ID: equipment.ID},
		Equipments: equipment.Equipments,
		Picture:    picture,
	}

	// การ validate
	if _, err := govalidator.ValidateStruct(update_equipment); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": update_equipment})
}

// DELETE--equipment id--
func DeleteEquipment(c *gin.Context) {
	id := c.Param("id")

	//ลบเมื่อ
	if err := entity.DB().Exec("DELETE FROM equipment WHERE equipment_id = ?", id).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Exec("DELETE FROM equipment WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "equipment not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}
