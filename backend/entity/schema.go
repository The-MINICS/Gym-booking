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
	Admin  []Admin  `gorm:"foreignKey:RoleID"`
}

// Gender
type Gender struct {
	gorm.Model
	Gender string

	Member []Member `gorm:"foreignKey:GenderID"`
	Admin  []Admin  `gorm:"foreignKey:GenderID"`
}

// Admin
type Admin struct {
	gorm.Model
	Username    string `gorm:"uniqueIndex"`
	Email       string `gorm:"uniqueIndex"`
	Password    string
	Firstname   string
	Lastname    string
	Phonenumber string
	Age         int32
	Weight      int32
	Height      int32

	GenderID *uint
	Gender   Gender `gorm:"references:id"`
	RoleID   *uint
	Role     Role `gorm:"references:id"`

	Booking []Booking `gorm:"foreignKey:AdminID"`
}

// Member
type Member struct {
	gorm.Model
	Username        string `gorm:"uniqueIndex"`
	Email           string `gorm:"uniqueIndex"`
	Password        string
	Firstname       string
	Lastname        string
	Phonenumber     string
	Age             int32
	Weight          int32
	Height          int32
	Member_datetime time.Time

	GenderID *uint
	Gender   Gender `gorm:"references:id"`
	RoleID   *uint
	Role     Role `gorm:"references:id"`

	Booking   []Booking   `gorm:"foreignKey:MemberID"`
	Contactus []Contactus `gorm:"foreignKey:MemberID"`
}

// Room
type Room struct {
	gorm.Model
	Activity  string
	Number    string
	Capacity  int16
	Attendant string

	PictureID *uint
	Picture   Picture `gorm:"references:id"`

	Booking []Booking `gorm:"foreignKey:RoomID"`
}

// Picture
type Picture struct {
	gorm.Model
	Picture  string
	Describe string

	Room      []Room      `gorm:"foreignKey:PictureID"`
	Equipment []Equipment `gorm:"foreignKey:PictureID"`
}

// Equipment
type Equipment struct {
	gorm.Model
	Equipments string

	RoomID *uint
	Room   Room `gorm:"references:id"`

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
// Member เป็นคนสร้าง จอง Room
type Booking struct {
	gorm.Model
	Datetime time.Time

	AdminID *uint
	Admin   Admin `gorm:"references:id"`

	MemberID *uint
	Member   Member `gorm:"references:id"`

	RoomID *uint
	Room   Room `gorm:"references:id"`

	EquipmentID *uint
	Equipment   Equipment `gorm:"references:id"`
}

// Contact us
// User เป็นคนใช้
type Contactus struct {
	gorm.Model
	Subject string
	Message string

	MemberID *uint
	Member   Member `gorm:"references:id"`
}
