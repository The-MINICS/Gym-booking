package entity

import (
	//"regexp"

	//"github.com/asaskevich/govalidator"
	"time"

	"gorm.io/gorm"
)

// ---role---
type Role struct {
	gorm.Model
	Role string

	Member []Member `gorm:"foreignKey:RoleID"`
}

// Gender
type Gender struct {
	gorm.Model
	Gender string

	Member []Member `gorm:"foreignKey:GenderID"`
}

// Member
type Member struct {
	gorm.Model
	Username  string `gorm:"uniqueIndex"`
	Email     string `gorm:"uniqueIndex"`
	Password  string
	Firstname string
	Lastname  string
	Age       int32
	Weight    int32
	Height    int32

	GenderID *uint
	Gender   Gender `gorm:"references:id"`
	RoleID   *uint
	Role     Role `gorm:"references:id"`

	Booking   []Booking   `gorm:"foreignKey:MemberID"`
	Contactus []Contactus `gorm:"foreignKey:MemberID"`
}

// Activity
type Activity struct {
	gorm.Model
	Activity string
	Number   string
	Capacity int16

	Booking []Booking `gorm:"foreignKey:ActivityID"`
}

// Picture
type Picture struct {
	gorm.Model
	Picture string
}

// Equipment
type Equipment struct {
	gorm.Model
	Equipments string

	PictureID *uint
	Picture   Picture `gorm:"references:id"`

	Booking []Booking `gorm:"foreignKey:EquipmentID"`
}

// Status
// สถานะ ของ Equipment
type Status struct {
	gorm.Model
	Status string
}

// Booking
// Member เป็นคนสร้าง จอง Activity
type Booking struct {
	gorm.Model
	Datetime time.Time

	MemberID *uint
	Member   Member `gorm:"references:id"`

	ActivityID *uint
	Activity   Activity `gorm:"references:id"`

	EquipmentID *uint
	Equipment   Equipment `gorm:"references:id"`
}

// Contact us
// Member เป็นคนใช้
type Contactus struct {
	gorm.Model
	Subject string
	Message string

	MemberID *uint
	Member   Member `gorm:"references:id"`
}
