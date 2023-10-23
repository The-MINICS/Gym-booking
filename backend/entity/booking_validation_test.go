package entity

import (
	"fmt"
	"testing"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func TestBookingCorrect(t *testing.T) {
	g := NewGomegaWithT(t)

	t.Run("Check format Booking", func(t *testing.T) {
		booking := Booking{

			Note: "I may go late around 20 minutes",
		}
		//ตรวจสอบด้วย govalidator
		ok, err := govalidator.ValidateStruct(booking)

		//เช็คว่ามันเป็นค่าจริงไหม
		g.Expect(ok).To(BeTrue())

		//เช็คว่ามันว่างไหม
		g.Expect(err).To((BeNil()))

		fmt.Println(err)
	})
}

func TestBooking(t *testing.T) {
	g := NewGomegaWithT(t)

	t.Run("Check note not too many characters", func(t *testing.T) {

		booking := Booking{

			Note: "0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789",
		}
		//ตรวจสอบด้วย govalidator
		ok, err := govalidator.ValidateStruct(booking)
		g.Expect(ok).ToNot(BeTrue())
		g.Expect(err).ToNot(BeNil())
		g.Expect(err.Error()).To(Equal("It is too many characters."))
	})
}
