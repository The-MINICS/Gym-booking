package entity

import (
	"regexp"

	"time"

	"github.com/asaskevich/govalidator"

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
	Username           string `gorm:"uniqueIndex" valid:"required~Please fill your username." ` //,matches(^(A|B|D|M)([0-9]{7}$))~username ต้องมี 8 ตัว
	Email              string `gorm:"uniqueIndex" valid:"email~Email format is invalid.,required~Please fill your email."`
	Password           string `valid:"required~Please fill your password." ` //,matches(^[1-9]([0-9]{12}$))~password ต้องมี 13 ตัว
	Firstname          string `valid:"required~Please fill your firstname."`
	Lastname           string `valid:"required~Please fill your lastname."`
	Phonenumber        string `valid:"required~Please fill your phone number., matches(^0([6|8|9])([0-9]{8}$))~Phone number is incorrect."`
	Age                int32  `valid:"required~Please fill your age., IsPositive~The age number must not be negative."`
	Weight             int32  `valid:"required~Please fill your weight., IsPositive~The Weight number must not be negative."`
	Height             int32  `valid:"required~Please fill your height., IsPositive~The height number must not be negative."`
	Member_datetime    time.Time
	OldPassword        string
	NewPassword        string
	ConfirmNewPassword string

	GenderID *uint
	Gender   Gender `gorm:"references:id" valid:"-"`
	RoleID   *uint
	Role     Role `gorm:"references:id" valid:"-"`

	Booking   []Booking   `gorm:"foreignKey:MemberID"`
	Contactus []Contactus `gorm:"foreignKey:MemberID"`
	Equipment []Equipment `gorm:"foreignKey:MemberID"`
}

// date
type Date struct {
	gorm.Model
	DateCode time.Time

	RoomID *uint
	Room   Room `gorm:"references:id" valid:"-"`

	Timeslots         []Timeslot          `gorm:"foreignKey:DateID"`
	Booking           []Booking           `gorm:"foreignKey:DateID"`
	EquipmentTimeslot []EquipmentTimeslot `gorm:"foreignKey:DateID"`
}

// Timeslot
type Timeslot struct {
	gorm.Model
	Slot     string
	Quantity int16

	DateID *uint
	Date   Date `gorm:"references:id" valid:"-"`

	RoomID *uint
	Room   Room `gorm:"references:id" valid:"-"`

	Booking           []Booking           `gorm:"foreignKey:TimeslotID"`
	EquipmentTimeslot []EquipmentTimeslot `gorm:"foreignKey:TimeslotID"`
}

// Equipment Timeslot
type EquipmentTimeslot struct {
	gorm.Model
	Equipmentslot string

	TimeslotID *uint
	Timeslot   Timeslot `gorm:"references:id" valid:"-"`

	DateID *uint
	Date   Date `gorm:"references:id" valid:"-"`

	EquipmentBooking []EquipmentBooking `gorm:"foreignKey:EquipmentTimeslotID"`
}

// Room
type Room struct {
	gorm.Model
	Activity     string `valid:"required~Please fill activity about the room." `
	Number       string `gorm:"uniqueIndex" valid:"required~Please fill the room number., matches(^(R)([0-9]{3}$))~Please fill the correct room format." `
	Capacity     int16  `valid:"required~Please fill the room capacity., Range~Please fill a capacity number is not less than 1 and not more than 100." `
	Attendant    string `valid:"required~Please fill the room attendant." `
	Illustration string `valid:"required~Please select a illustration." `
	Caption      string `valid:"required~Please fill any caption about the equipment that you added., maxstringlength(500)~It is too many characters." `

	Booking   []Booking   `gorm:"foreignKey:RoomID"`
	Equipment []Equipment `gorm:"foreignKey:RoomID"`
	Dates     []Date      `gorm:"foreignKey:RoomID"`
	Timeslot  []Timeslot  `gorm:"foreignKey:RoomID"`
}

// Picture
type Picture struct {
	gorm.Model
	Picture  string `valid:"required~Please select the picture." `
	Title    string `valid:"required~Please fill the equipment name." `
	Describe string `valid:"required~Please fill any caption about the equipment that you added., maxstringlength(500)~It is too many characters." `

	Equipment []Equipment `gorm:"foreignKey:PictureID"`
}

// Equipment
type Equipment struct {
	gorm.Model
	Name string `valid:"required~Please fill the equipment name." `

	RoomID *uint
	Room   Room `gorm:"references:id" valid:"-"`

	PictureID *uint
	Picture   Picture `gorm:"references:id" valid:"-"`

	MemberID *uint
	Member   Member `gorm:"references:id" valid:"-"`

	StatusID *uint
	Status   Status `gorm:"references:id" valid:"-"`

	EquipmentBooking []EquipmentBooking `gorm:"foreignKey:EquipmentID"`
}

// Booking
// Member เป็นคนสร้าง ใช้จองห้อง
type Booking struct {
	gorm.Model
	Datetime time.Time
	Note     string `valid:"maxstringlength(50)~It is too many characters." `

	MemberID *uint
	Member   Member `gorm:"references:id" valid:"-"`

	RoomID *uint
	Room   Room `gorm:"references:id" valid:"-"`

	DateID *uint
	Date   Date `gorm:"references:id" valid:"-"`

	TimeslotID *uint
	Timeslot   Timeslot `gorm:"references:id" valid:"-"`

	StatusID *uint
	Status   Status `gorm:"references:id" valid:"-"`

	EquipmentBooking []EquipmentBooking `gorm:"foreignKey:BookingID"`
}

// Booking
// Member เป็นคนสร้าง ใช้จองอุปกรณ์
type EquipmentBooking struct {
	gorm.Model
	EquipmentDatetime   time.Time
	EquipmentNote       string
	EquipmentTimeslotID *uint
	EquipmentTimeslot   EquipmentTimeslot `gorm:"references:id" valid:"-"`

	EquipmentID *uint
	Equipment   Equipment `gorm:"references:id" valid:"-"`

	BookingID *uint
	Booking   Booking `gorm:"references:id" valid:"-"`

	StatusID *uint
	Status   Status `gorm:"references:id" valid:"-"`
}

// Contact us
// Member เป็นคนใช้
type Contactus struct {
	gorm.Model
	Subject string
	Message string

	MemberID *uint
	Member   Member `gorm:"references:id" valid:"-"`
}

// status
type Status struct {
	gorm.Model
	State string

	Equipment        []Equipment        `gorm:"foreignKey:StatusID"`
	EquipmentBooking []EquipmentBooking `gorm:"foreignKey:StatusID"`
	Booking          []Booking          `gorm:"foreignKey:StatusID"`
}

// ฟังก์ชันที่จะใช่ในการ validation ตัวอักษรพิเศษและตัวเลข
func init() {
	govalidator.CustomTypeTagMap.Set("checkuserpattern", govalidator.CustomTypeValidator(func(i interface{}, context interface{}) bool {
		s, ok := i.(string)
		if !ok {
			return false
		}
		match, _ := regexp.MatchString("^[ก-๛a-zA-Z\\s]+$", s)
		return match
	}))

	govalidator.CustomTypeTagMap.Set("IsPositive", func(i interface{}, context interface{}) bool {
		t := i.(int32)
		if t < 1 {
			return false
		} else {
			return true
		}
	})

	govalidator.CustomTypeTagMap.Set("Range", func(i interface{}, context interface{}) bool {
		t := i.(int16)
		if t < 1 {
			return false
		}
		if t > 100 {
			return false
		} else {
			return true
		}
	})
}
