package main

import (
	"fmt"
	"time"

	"github.com/chonticha1844/Gym-booking/controller"
	"github.com/chonticha1844/Gym-booking/entity"
	"github.com/chonticha1844/Gym-booking/middlewares"
	"github.com/gin-gonic/gin"
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
			protected.PATCH("/members//change-password", controller.ChangePassword)
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
			protected.PATCH("/equipmentbookings", controller.UpdateEquipmentBooking)
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

			// Date Routes
			protected.POST("/dates", controller.CreateDate)
			protected.GET("/dates", controller.ListDates)
			protected.GET("/date/:id", controller.GetDate)
			protected.PATCH("/dates", controller.UpdateDate)
			protected.DELETE("/dates/:id", controller.DeleteDate)

		}
	}

	// Run the server go run main.go
	r.Run("localhost: " + PORT)

	// // Create a new cron scheduler
	// c := cron.New()

	// var timeslot entity.Timeslot

	// // Define the cron schedule (every minute)
	// c.AddFunc("* * * * *", func() {
	// 	currentTime := time.Now()
	// 	targetTime := time.Date(currentTime.Year(), currentTime.Month(), currentTime.Day(), 04, 23, 0, 0, currentTime.Location())

	// 	if currentTime.Equal(targetTime) {
	// 		if err := entity.DB().Model(&timeslot).Where("1 = 1").Update("Quantity", 0).Error; err != nil {
	// 			fmt.Println("Error deleting records:", err)
	// 			return
	// 		}
	// 	}
	// })

	// c.Start()

	// // Keep the program running
	// select {}

	// Create a ticker that checks the time every minute
	ticker := time.NewTicker(1 * time.Minute)

	// Run a background goroutine to perform the update at 6 AM
	go func() {
		for {
			select {
			case <-ticker.C:
				// Get the current time
				now := time.Now()

				// Check if the current time is 6 AM
				if now.Hour() == 5 && now.Minute() == 47 {
					// Perform the update here
					updateTimeslotQuantity()
				}
			}
		}
	}()

	// Keep the application running
	select {}

}

func updateTimeslotQuantity() {
	var timeslot entity.Timeslot
	if err := entity.DB().Model(&timeslot).Where("1 = 1").Update("Quantity", 0).Error; err != nil {
		fmt.Println("Error to update quantity!")
		return
	}
}

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
