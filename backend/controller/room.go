package controller

import (
	"net/http"

	"github.com/asaskevich/govalidator"
	"github.com/chonticha1844/Gym-booking/entity"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

// POST--Room--
func CreateRoom(c *gin.Context) {
	var room entity.Room
	var picture entity.Picture

	if err := c.ShouldBindJSON(&room); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ค้นหา picture ด้วย id
	if tx := entity.DB().Where("id = ?", room.PictureID).First(&picture); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Please select a picture"})
		return
	}

	// 14: สร้าง  room
	rm := entity.Room{
		Activity: room.Activity,
		Number:   room.Number,
		Capacity: room.Capacity,
		Picture:  picture,
	}

	// การ validate
	if _, err := govalidator.ValidateStruct(room); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 13: บันทึก
	if err := entity.DB().Create(&rm).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": rm})

}

//GET--room id--

func GetRoom(c *gin.Context) {
	var room entity.Room
	id := c.Param("id")
	if err := entity.DB().Preload("Picture").Raw("SELECT * FROM rooms WHERE id = ?", id).Scan(&room).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": room})
}

// GET--rooms--
func ListRooms(c *gin.Context) {
	var rooms []entity.Room
	if err := entity.DB().Preload("Picture").Raw("SELECT * FROM rooms").Scan(&rooms).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": rooms})
}

// DELETE--room id--
func DeleteRoom(c *gin.Context) {
	id := c.Param("id")

	//ลบเมื่อ
	if err := entity.DB().Exec("DELETE FROM rooms WHERE room_id = ?", id).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
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
	var picture entity.Picture

	// ค้นหา picture ด้วย id
	if tx := entity.DB().Where("id = ?", room.PictureID).First(&picture); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Please select a picture"})
		return
	}
	update_room := entity.Room{
		Model:    gorm.Model{ID: room.ID},
		Activity: room.Activity,
		Number:   room.Number,
		Capacity: room.Capacity,
		Picture:  picture,
	}

	// การ validate
	if _, err := govalidator.ValidateStruct(update_room); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": update_room})
}
