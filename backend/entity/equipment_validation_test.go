package entity

import (
	"fmt"
	"testing"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func TestEquipmentCorrect(t *testing.T) {
	g := NewGomegaWithT(t)

	t.Run("Check format Equipment", func(t *testing.T) {
		equipment := Equipment{

			Name: "Treadmill No.1",
		}
		//ตรวจสอบด้วย govalidator
		ok, err := govalidator.ValidateStruct(equipment)

		//เช็คว่ามันเป็นค่าจริงไหม
		g.Expect(ok).To(BeTrue())

		//เช็คว่ามันว่างไหม
		g.Expect(err).To((BeNil()))

		fmt.Println(err)
	})
}

func TestEquipment(t *testing.T) {
	g := NewGomegaWithT(t)

	t.Run("Check name not blank ", func(t *testing.T) {

		equipment := Equipment{

			Name: "",
		}
		//ตรวจสอบด้วย govalidator
		ok, err := govalidator.ValidateStruct(equipment)
		g.Expect(ok).ToNot(BeTrue())
		g.Expect(err).ToNot(BeNil())
		g.Expect(err.Error()).To(Equal("Please enter equipment name."))
	})
}
