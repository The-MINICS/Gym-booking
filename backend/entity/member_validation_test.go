package entity

import (
	"fmt"
	"testing"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func TestMemberCorrect(t *testing.T) {
	g := NewGomegaWithT(t)

	t.Run("Check format Member", func(t *testing.T) {
		member := Member{

			Username:    "B1234567",
			Email:       "B1234567@g.sut.ac.th",
			Password:    "1234567890123",
			Firstname:   "Tom ",
			Lastname:    "Highway",
			Phonenumber: "0881234567",
		}
		//ตรวจสอบด้วย govalidator
		ok, err := govalidator.ValidateStruct(member)

		//เช็คว่ามันเป็นค่าจริงไหม
		g.Expect(ok).To(BeTrue())

		//เช็คว่ามันว่างไหม
		g.Expect(err).To((BeNil()))

		fmt.Println(err)
	})
}

func TestMember(t *testing.T) {
	g := NewGomegaWithT(t)

	t.Run("Check username not blank ", func(t *testing.T) {

		member := Member{

			Username:    "",
			Email:       "B1234567@g.sut.ac.th",
			Password:    "1234567890123",
			Firstname:   "Tom ",
			Lastname:    "Highway",
			Phonenumber: "0881234567",
		}
		//ตรวจสอบด้วย govalidator
		ok, err := govalidator.ValidateStruct(member)
		g.Expect(ok).ToNot(BeTrue())
		g.Expect(err).ToNot(BeNil())
		g.Expect(err.Error()).To(Equal("Please enter your username."))
	})

	// t.Run("Check username must be 8 digit ", func(t *testing.T) {

	// 	member := Member{

	// 		Username:  "k12345",
	// 		Email:     "B1234567@g.sut.ac.th",
	// 		Password:  "1234567890123",
	// 		Firstname: "Tom ",
	// 		Lastname:  "Highway",
	// 		Phonenumber:	"0881234567",
	// 	}
	// 	//ตรวจสอบด้วย govalidator
	// 	ok, err := govalidator.ValidateStruct(member)
	// 	g.Expect(ok).ToNot(BeTrue())
	// 	g.Expect(err).ToNot(BeNil())
	// 	g.Expect(err.Error()).To(Equal("username ต้องมี 8 ตัว"))
	// })

	t.Run("Check email not blank ", func(t *testing.T) {

		member := Member{

			Username:    "B1234567",
			Email:       "",
			Password:    "1234567890123",
			Firstname:   "Tom ",
			Lastname:    "Highway",
			Phonenumber: "0881234567",
		}
		//ตรวจสอบด้วย govalidator
		ok, err := govalidator.ValidateStruct(member)
		g.Expect(ok).ToNot(BeTrue())
		g.Expect(err).ToNot(BeNil())
		g.Expect(err.Error()).To(Equal("Please enter your email."))
	})

	t.Run("Check email format correct ", func(t *testing.T) {

		member := Member{

			Username:    "B1234567",
			Email:       "B1234567@",
			Password:    "1234567890123",
			Firstname:   "Tom ",
			Lastname:    "Highway",
			Phonenumber: "0881234567",
		}
		//ตรวจสอบด้วย govalidator
		ok, err := govalidator.ValidateStruct(member)
		g.Expect(ok).ToNot(BeTrue())
		g.Expect(err).ToNot(BeNil())
		g.Expect(err.Error()).To(Equal("Email format is invalid."))
	})

	t.Run("Check password not blank ", func(t *testing.T) {

		member := Member{

			Username:    "B1234567",
			Email:       "B1234567@g.sut.ac.th",
			Password:    "",
			Firstname:   "Tom ",
			Lastname:    "Highway",
			Phonenumber: "0881234567",
		}
		//ตรวจสอบด้วย govalidator
		ok, err := govalidator.ValidateStruct(member)
		g.Expect(ok).ToNot(BeTrue())
		g.Expect(err).ToNot(BeNil())
		g.Expect(err.Error()).To(Equal("Please enter your password."))
	})

	// t.Run("Check password must be =13 digit", func(t *testing.T) {

	// 	member := Member{

	// 		Username:  "B1234567",
	// 		Email:     "B1234567@g.sut.ac.th",
	// 		Password:  "12345",
	// 		Firstname: "Tom ",
	// 		Lastname:  "Highway",
	// 		Phonenumber:	"0881234567",
	// 	}
	// 	//ตรวจสอบด้วย govalidator
	// 	ok, err := govalidator.ValidateStruct(member)
	// 	g.Expect(ok).ToNot(BeTrue())
	// 	g.Expect(err).ToNot(BeNil())
	// 	g.Expect(err.Error()).To(Equal("password ต้องมี 13 ตัว"))
	// })

	t.Run("Check firstname not blank ", func(t *testing.T) {

		member := Member{

			Username:    "B1234567",
			Email:       "B1234567@g.sut.ac.th",
			Password:    "1234567890123",
			Firstname:   "",
			Lastname:    "Highway",
			Phonenumber: "0881234567",
		}
		//ตรวจสอบด้วย govalidator
		ok, err := govalidator.ValidateStruct(member)
		g.Expect(ok).ToNot(BeTrue())
		g.Expect(err).ToNot(BeNil())
		g.Expect(err.Error()).To(Equal("Please enter your firstname."))
	})

	t.Run("Check lastname not blank ", func(t *testing.T) {

		member := Member{

			Username:    "B1234567",
			Email:       "B1234567@g.sut.ac.th",
			Password:    "1234567890123",
			Firstname:   "Tom",
			Lastname:    "",
			Phonenumber: "0881234567",
		}
		//ตรวจสอบด้วย govalidator
		ok, err := govalidator.ValidateStruct(member)
		g.Expect(ok).ToNot(BeTrue())
		g.Expect(err).ToNot(BeNil())
		g.Expect(err.Error()).To(Equal("Please enter your lastname."))
	})

	t.Run("Tel. is not correct. ", func(t *testing.T) {

		fixtures := []string{
			"0000000000",  // เป็น 0
			"0200000000",  // ขึ้นต้นด้วย 0 ตามด้วย 2 และตามด้วย string 8 ตัว
			"090-0000000", // มีขีดคั่น
			"080000000",   // ขึ้นต้นด้วย 0 ตามด้วย 8 และตามด้วย string 7 ตัว
			"9912345678",  // ขึ้นต้นด้วย 9
			"090",         // ตัวอักษร 3 ตัว
			"0",           // ตัวอักษร 1 ตัว
		}
		for _, Phonenumber := range fixtures {
			member := Member{

				Username:    "B1234567",
				Email:       "B1234567@g.sut.ac.th",
				Password:    "1234567890123",
				Firstname:   "Tom",
				Lastname:    "Highway",
				Phonenumber: Phonenumber,
			}
			//ตรวจสอบด้วย govalidator
			ok, err := govalidator.ValidateStruct(member)
			g.Expect(ok).ToNot(BeTrue())
			g.Expect(err).ToNot(BeNil())
			g.Expect(err.Error()).To(Equal("Phone number is not correct."))
		}
	})
}
