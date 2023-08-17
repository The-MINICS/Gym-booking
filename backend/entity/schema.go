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

	Booking   []Booking   `gorm:"foreignKey:AdminID"`
	Equipment []Equipment `gorm:"foreignKey:AdminID"`
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

// Proportion
type TimeProportion struct {
	gorm.Model
	Proportion string

	Booking []Booking `gorm:"foreignKey:TimeProportionID"`
}

// Room
type Room struct {
	gorm.Model
	Activity     string
	Number       string
	Quantity	int16
	Capacity     int16
	Attendant    string
	Illustration string
	Caption      string

	Booking []Booking `gorm:"foreignKey:RoomID"`
}

// Picture
type Picture struct {
	gorm.Model
	Picture  string
	Title    string
	Describe string

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

	AdminID *uint
	Admin   Admin `gorm:"references:id"`

	Booking []Booking `gorm:"foreignKey:EquipmentID"`
}

// Booking
// Member เป็นคนสร้าง ใช้จอง
type Booking struct {
	gorm.Model
	Datetime time.Time

	AdminID *uint
	Admin   Admin `gorm:"references:id"`

	MemberID *uint
	Member   Member `gorm:"references:id"`

	RoomID *uint
	Room   Room `gorm:"references:id"`

	TimeProportionID *uint
	TimeProportion   TimeProportion `gorm:"references:id"`

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
