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
	var room entity.Room
	var member entity.Member

	if err := c.ShouldBindJSON(&equipment); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ค้นหา picture ด้วย id
	if tx := entity.DB().Where("id = ?", equipment.PictureID).First(&picture); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Please select a picture"})
		return
	}

	// ค้นหา room ด้วย id
	if tx := entity.DB().Where("id = ?", equipment.RoomID).First(&room); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Please select the room"})
		return
	}
	// ค้นหา member ด้วย id
	if tx := entity.DB().Where("id = ?", equipment.MemberID).First(&member); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Please select responsibility"})
		return
	}

	// 14: สร้าง  equipmentr
	eqi := entity.Equipment{
		Name:    equipment.Name,
		Picture: picture,
		Room:    room,
		Member:  member,
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
	if err := entity.DB().Preload("Picture").Preload("Member").Raw("SELECT * FROM equipment WHERE id = ?", id).Scan(&equipment).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": equipment})
}

// GET--equipments--
func ListEquipments(c *gin.Context) {
	var equipments []entity.Equipment
	if err := entity.DB().Preload("Picture").Preload("Member").Raw("SELECT * FROM equipment").Find(&equipments).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": equipments})
}

// PATCH--equipment
func UpdateEquipment(c *gin.Context) {
	var equipment entity.Equipment
	var picture entity.Picture
	var room entity.Room
	var member entity.Member

	if err := c.ShouldBindJSON(&equipment); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var new_equipment = equipment.Name

	if tx := entity.DB().Where("id = ?", equipment.PictureID).First(&picture); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Picture not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", equipment.RoomID).First(&room); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Room not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", equipment.MemberID).First(&member); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Member not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", equipment.ID).First(&equipment); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Equipment not found"})
		return
	}

	update_equipment := entity.Equipment{
		Model:   gorm.Model{ID: equipment.ID},
		Name:    new_equipment,
		Picture: picture,
		Room:    room,
		Member:  member,
	}

	if _, err := govalidator.ValidateStruct(update_equipment); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Save(&update_equipment).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": update_equipment})
}

// DELETE--equipment id--
func DeleteEquipment(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM equipment WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Equipment not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}
