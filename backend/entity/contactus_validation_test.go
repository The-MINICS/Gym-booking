package entity

import (
	"fmt"
	"testing"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func TestContactusCorrect(t *testing.T) {
	g := NewGomegaWithT(t)

	t.Run("Check format Contact us", func(t *testing.T) {
		contactus := Contactus{

			Subject: "I can not book the room.",
			Message: "I can not book the aerobic room. Please resolve this problem.",
		}
		//ตรวจสอบด้วย govalidator
		ok, err := govalidator.ValidateStruct(contactus)

		//เช็คว่ามันเป็นค่าจริงไหม
		g.Expect(ok).To(BeTrue())

		//เช็คว่ามันว่างไหม
		g.Expect(err).To((BeNil()))

		fmt.Println(err)
	})
}

func TestContactus(t *testing.T) {
	g := NewGomegaWithT(t)

	t.Run("Check subject not blank", func(t *testing.T) {

		contactus := Contactus{

			Subject: "",
			Message: "I can not book the aerobic room. Please resolve this problem.",
		}
		//ตรวจสอบด้วย govalidator
		ok, err := govalidator.ValidateStruct(contactus)
		g.Expect(ok).ToNot(BeTrue())
		g.Expect(err).ToNot(BeNil())
		g.Expect(err.Error()).To(Equal("Please fill the subject."))
	})

	t.Run("Check message not blank ", func(t *testing.T) {

		contactus := Contactus{

			Subject: "I can not book the room",
			Message: "",
		}
		//ตรวจสอบด้วย govalidator
		ok, err := govalidator.ValidateStruct(contactus)
		g.Expect(ok).ToNot(BeTrue())
		g.Expect(err).ToNot(BeNil())
		g.Expect(err.Error()).To(Equal("Please fill the message."))
	})
}
