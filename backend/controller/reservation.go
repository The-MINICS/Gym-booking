package controller

import (
	"net/http"

	"github.com/asaskevich/govalidator"
	"github.com/chonticha1844/Gym-booking/entity"
	"github.com/gin-gonic/gin"
	//"gorm.io/gorm"
)

// POST /reservation

func CreateReservation(c *gin.Context) {

	var reservation entity.Reservation
	var user entity.User
	var class entity.Class

	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ค้นหา user ด้วย id
	if tx := entity.DB().Where("id = ?", reservation.UserID).First(&user); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})
		return
	}

	// ค้นหา class ด้วย id
	if tx := entity.DB().Where("id = ?", reservation.ClassID).First(&class); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "class not found"})
		return
	}

	// 14: สร้าง  Reservation
	rsv := entity.Reservation{
		User:  user,
		Class: class,
	}

	// การ validate
	if _, err := govalidator.ValidateStruct(user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 13: บันทึก
	if err := entity.DB().Create(&rsv).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": rsv})

}

// GET /reservation/:id
func GetReservation(c *gin.Context) {
	var reservation entity.Reservation
	id := c.Param("id")
	if tx := entity.DB().Preload("User").Preload("Class").Raw("SELECT * FROM reservations WHERE id = ?", id).Find(&reservation).Error; tx != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "reservation not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": reservation})
}

// GET /reservation
func ListReservations(c *gin.Context) {
	var reservations []entity.Reservation

	if err := entity.DB().Preload("User").Preload("Class").Raw("SELECT * FROM reservations").Find(&reservations).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": reservations})
}

func DeleteReservation(c *gin.Context) {
	id := c.Param("id")

	//ลบเมื่อ
	if err := entity.DB().Exec("DELETE FROM reservations WHERE reservation_id = ?", id).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Exec("DELETE FROM reservations WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "reservations not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})

}
