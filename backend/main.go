package main

import (
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

	//member route
	r.POST("/members", controller.CreateMember)
	r.GET("/genders", controller.ListGenders)
	r.GET("/roles", controller.ListRoles)

	//member request
	r.POST("/member-request", controller.MemberRequest)

	// Authentication Routes
	r.POST("/login/member", controller.LoginMember)
	r.POST("/forgot-password", controller.ForgotPassword)
	r.PATCH("/reset-password", controller.ResetPassword)

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
			protected.PATCH("/changepassword", controller.ChangePassword)
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
			protected.DELETE("/bookings/:id", controller.CancelBooking)

			// Equipment Booking Routes
			protected.POST("/equipmentbookings", controller.CreateEquipmentBooking)
			protected.GET("/equipmentbookings", controller.ListEquipmentBookings)
			protected.GET("/equipmentbooking/:id", controller.GetEquipmentBooking)
			protected.PATCH("/equipmentbookings", controller.UpdateEquipmentBooking)
			protected.DELETE("/equipmentbookings/:id", controller.CancelEquipmentBooking)

			// Contactus Routes
			protected.POST("/contactuses", controller.CreateContactus)
			protected.GET("/contactuses", controller.ListContactuses)
			protected.GET("/contactus/:id", controller.GetContactus)
			protected.PATCH("/contactuses", controller.UpdateContactus)
			protected.DELETE("/contactuses/:id", controller.ResponseContactus)

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

			//Member Request Routes
			protected.GET("/memberrequest/:id", controller.GetMemberRequest)
			protected.GET("/memberrequests", controller.ListMemberRequests)
			protected.DELETE("/memberrequests/:id", controller.DeleteMemberRequest)
			protected.PATCH("/acceptrequest", controller.AcceptRequest)
			protected.PATCH("/denymemberrequest", controller.DenyRequest)
		}
	}

	// Run the server go run main.go
	r.Run("localhost: " + PORT)

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
