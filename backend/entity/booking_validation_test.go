package entity

import (
	"testing"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func TestBookingCorrect(t *testing.T) {
	g := NewGomegaWithT(t)

	t.Run("Check Booking not blank", func(t *testing.T) {
		booking := Booking{

			Note: " ",
		}
		ok, err := govalidator.ValidateStruct(booking)
		g.Expect(ok).ToNot(BeTrue())
		g.Expect(err).ToNot(BeNil())
		g.Expect(err.Error()).To(Equal("Leave note message."))
	})

}
