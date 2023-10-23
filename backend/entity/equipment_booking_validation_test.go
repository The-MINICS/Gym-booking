package entity

import (
	"fmt"
	"testing"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func TestEquipmentBookingCorrect(t *testing.T) {
	g := NewGomegaWithT(t)

	t.Run("Check format Booking", func(t *testing.T) {
		equipmentbooking := EquipmentBooking{

			EquipmentNote: "จอง1",
		}
		//ตรวจสอบด้วย govalidator
		ok, err := govalidator.ValidateStruct(equipmentbooking)

		//เช็คว่ามันเป็นค่าจริงไหม
		g.Expect(ok).To(BeTrue())

		//เช็คว่ามันว่างไหม
		g.Expect(err).To((BeNil()))

		fmt.Println(err)
	})
}

func TestEquipmentBooking(t *testing.T) {
	g := NewGomegaWithT(t)

	t.Run("Check note not too many characters", func(t *testing.T) {

		equipmentbooking := EquipmentBooking{

			EquipmentNote: "0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789",
		}
		//ตรวจสอบด้วย govalidator
		ok, err := govalidator.ValidateStruct(equipmentbooking)
		g.Expect(ok).ToNot(BeTrue())
		g.Expect(err).ToNot(BeNil())
		g.Expect(err.Error()).To(Equal("It is too many characters."))
	})
}