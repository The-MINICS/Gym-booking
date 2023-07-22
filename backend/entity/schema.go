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

	Admin []Admin `gorm:"foreignKey:RoleID"`
	User  []User  `gorm:"foreignKey:GenderID"`
}

// Gender
type Gender struct {
	gorm.Model
	Gender string

	User  []User  `gorm:"foreignKey:GenderID"`
	Admin []Admin `gorm:"foreignKey:GenderID"`
}

// Admin
type Admin struct {
	Admin_firstname string
	Admin_lastname  string
	Admin_email     string `gorm:"uniqueIndex" `
	Admin_password  string

	GenderID *uint
	Gender   Gender `gorm:"references:id"`

	RoleID *uint
	Role   Role `gorm:"references:id"`
}

// User
type User struct {
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

	Reservation []Reservation `gorm:"foreignKey:UserID"`
	Booking     []Booking     `gorm:"foreignKey:UserID"`
	Contactus   []Contactus   `gorm:"foreignKey:UserID"`
}

// Room
type Room struct {
	gorm.Model
	Number   string
	Capacity int16

	Class []Class `gorm:"foreignKey:RoomID"`
}

// Activity
type Activity struct {
	gorm.Model
	Activity string

	Class []Class `gorm:"foreignKey:ActivityID"`
}

// Class
// Admin เป็นคนสร้าง Class ที่มีกิจกรรมไว้ให้ User จอง
type Class struct {
	gorm.Model
	Class_datetime time.Time

	AdminID *uint
	Admin   Admin `gorm:"references:id"`

	RoomID *uint
	Room   Room `gorm:"references:id"`

	ActivityID *uint
	Activity   Activity `gorm:"references:id"`

	Reservation []Reservation `gorm:"foreignKey:ClassID"`
}

// Reservation
// User เป็นคนสร้าง จอง Class
type Reservation struct {
	gorm.Model

	UserID *uint
	User   User `gorm:"references:id"`

	ClassID *uint
	Class   Class `gorm:"references:id"`
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
// User เป็นคนสร้าง จอง Equipment
type Booking struct {
	gorm.Model
	Booking_datetime time.Time

	UserID *uint
	User   User `gorm:"references:id"`

	EquipmentID *uint
	Equipment   Equipment `gorm:"references:id"`
}

// Contact us
// User เป็นคนใช้
type Contactus struct {
	gorm.Model
	Subject string
	Message string

	UserID *uint
	User   User `gorm:"references:id"`
}
