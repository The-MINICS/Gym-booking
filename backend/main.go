package main

import (
	"github.com/chonticha1844/Gym-booking/controller"
	"github.com/chonticha1844/Gym-booking/entity"
	"github.com/chonticha1844/Gym-booking/middlewares"
	"github.com/gin-gonic/gin"
	// "time"
	// "fmt"
)

const PORT = "9999"

func main() {
	entity.SetupDatabase()

	r := gin.Default()
	r.Use(CORSMiddleware())

	r.POST("/members", controller.CreateMember)
	r.GET("/genders", controller.ListGenders)
	r.GET("/roles", controller.ListRoles)

	// Authentication Routes
	r.POST("/login/member", controller.LoginMember)

	api := r.Group("")
	{
		protected := api.Use(middlewares.Authorizes())
		{
			// Role Routes
			protected.POST("/roles", controller.CreateRole)
			protected.GET("/role/:id", controller.GetRole)
			protected.PATCH("/roles", controller.UpdateRole)
			protected.DELETE("/roles/:id", controller.DeleteRole)

			//Gender Routes
			protected.POST("/genders", controller.CreateGender)
			protected.GET("/gender/:id", controller.GetGender)
			protected.PATCH("/genders", controller.UpdateGender)
			protected.DELETE("/genders/:id", controller.DeleteGender)

			//MemberRoutes
			protected.GET("/member/:id", controller.GetMember)
			protected.GET("/members", controller.ListMembers)
			protected.PATCH("/members", controller.UpdateMember)
			protected.DELETE("/members/:id", controller.DeleteMember)

			// Room Routes
			protected.POST("/rooms", controller.CreateRoom)
			protected.GET("/rooms", controller.ListRooms)
			protected.GET("/room/:id", controller.GetRoom)
			protected.PATCH("/rooms", controller.UpdateRoom)
			protected.DELETE("/rooms/:id", controller.DeleteRoom)

			// Picture Routes
			protected.POST("/pictures", controller.CreatePicture)
			protected.GET("/pictures", controller.ListPictures)
			protected.GET("/picture/:id", controller.GetPicture)
			protected.PATCH("/pictures", controller.UpdatePicture)
			protected.DELETE("/pictures/:id", controller.DeletePicture)

			// Equipment Routes
			protected.POST("/equipments", controller.CreateEquipment)
			protected.GET("/equipments", controller.ListEquipments)
			protected.GET("/equipment/:id", controller.GetEquipment)
			protected.PATCH("/equipments", controller.UpdateEquipment)
			protected.DELETE("/equipments/:id", controller.DeleteEquipment)

			// Timeslot Routes
			protected.POST("/timeslots", controller.CreateTimeslot)
			protected.GET("/timeslots", controller.ListTimeslots)
			protected.GET("/timeslot/:id", controller.GetTimeslot)
			protected.PATCH("/timeslots", controller.UpdateTimeslot)
			protected.DELETE("/timeslots/:id", controller.DeleteTimeslot)

			// Equipment Timeslot Routes
			protected.POST("/equipmenttimeslots", controller.CreateEquipmentTimeslot)
			protected.GET("/equipmenttimeslots", controller.ListEquipmentTimeslots)
			protected.GET("/equipmenttimeslot/:id", controller.GetEquipmentTimeslot)
			protected.PATCH("/equipmenttimeslots", controller.UpdateEquipmentTimeslot)
			protected.DELETE("/equipmenttimeslots/:id", controller.DeleteEquipmentTimeslot)

			// Booking Routes
			protected.POST("/bookings", controller.CreateBooking)
			protected.GET("/bookings", controller.ListBookings)
			protected.GET("/booking/:id", controller.GetBooking)
			protected.DELETE("/bookings/:id", controller.DeleteBooking)

			// Equipment Booking Routes
			protected.POST("/equipmentbookings", controller.CreateEquipmentBooking)
			protected.GET("/equipmentbookings", controller.ListEquipmentBookings)
			protected.GET("/equipmentbooking/:id", controller.GetEquipmentBooking)
			protected.DELETE("/equipmentbookings/:id", controller.DeleteEquipmentBooking)

			// Contactus Routes
			protected.POST("/contactuses", controller.CreateContactus)
			protected.GET("/contactuses", controller.ListContactuses)
			protected.GET("/contactus/:id", controller.GetContactus)
			protected.PATCH("/contactuses", controller.UpdateContactus)
			protected.DELETE("/contactuses/:id", controller.DeleteContactus)

			// Status Routes
			protected.POST("/statuses", controller.CreateStatus)
			protected.GET("/statuses", controller.ListStatuses)
			protected.GET("/status/:id", controller.GetStatus)
			protected.PATCH("/statuses", controller.UpdateStatus)
			protected.DELETE("/statuses/:id", controller.DeleteStatus)

		}
	}

	// Run the server go run main.go
	r.Run("localhost: " + PORT)
}

// func Passthetime() {

// 	timeslot1 := time.Time.Hour(2)
//     // Defining duration parameter of
//     // AfterFunc() method
//     DurationOfTime := time.Duration(3) * time.Second

//     // Defining function parameter of
//     // AfterFunc() method
//     f := func() {

//         // Printed when its called by the
//         // AfterFunc() method in the time
//         // stated above
//         fmt.Println("Function called by "+
//             "AfterFunc() after 3 seconds")
//     }

//     // Calling AfterFunc() method with its
//     // parameter
//     Timer1 := time.AfterFunc(DurationOfTime, f)

//     // Calling stop method
//     // w.r.to Timer1
//     defer Timer1.Stop()

//     // Calling sleep method
//     time.Sleep(10 * time.Second)
// }

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE, PATCH")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}
