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

	r.POST("/admins", controller.CreateAdmin)
	r.POST("/users", controller.CreateUser)
	r.GET("/genders", controller.ListGenders)
	r.GET("/users", controller.ListUsers)

	// Authentication Routes
	r.POST("/login/user", controller.LoginUser)
	r.POST("/login/admin", controller.LoginAdmin)

	api := r.Group("")
	{
		protected := api.Use(middlewares.Authorizes())
		{
			// Role Routes
			protected.POST("/roles", controller.CreateRole)
			protected.GET("/roles", controller.ListRoles)
			protected.GET("/role/:id", controller.GetRole)
			protected.PATCH("/roles", controller.UpdateRole)
			protected.DELETE("/roles/:id", controller.DeleteRole)

			//Gender Routes
			protected.POST("/genders", controller.CreateGender)
			protected.GET("/gender/:id", controller.GetGender)
			protected.PATCH("/genders", controller.UpdateGender)
			protected.DELETE("/genders/:id", controller.DeleteGender)

			// Admin Routes
			protected.GET("/admins", controller.ListAdmins)
			protected.GET("/admin/:id", controller.GetAdmin)
			protected.PATCH("/admins", controller.UpdateAdmin)
			protected.DELETE("/admins/:id", controller.DeleteAdmin)

			//User Routes
			protected.GET("/user/:id", controller.GetUser)
			protected.PATCH("/users", controller.UpdateUser)
			protected.DELETE("/users/:id", controller.DeleteUser)

			// Room Routes
			protected.POST("/rooms", controller.CreateRoom)
			protected.GET("/rooms", controller.ListRooms)
			protected.GET("/room/:id", controller.GetRoom)
			protected.PATCH("/rooms", controller.UpdateRoom)
			protected.DELETE("/rooms/:id", controller.DeleteRoom)

			// Activity Routes
			protected.POST("/activitys", controller.CreateActivity)
			protected.GET("/activitys", controller.ListActivitys)
			protected.GET("/activity/:id", controller.GetActivity)
			protected.PATCH("/activitys", controller.UpdateActivity)
			protected.DELETE("/activitys/:id", controller.DeleteActivity)

			// Class Routes
			protected.POST("/classes", controller.CreateClass)
			protected.GET("/classes", controller.ListClasses)
			protected.GET("/class/:id", controller.GetClass)
			protected.PATCH("/classes", controller.UpdateClass)
			protected.DELETE("/classes/:id", controller.DeleteClass)

			// Reservation Routes
			protected.POST("/reservations", controller.CreateReservation)
			protected.GET("/reservations", controller.ListReservations)
			protected.GET("/reservation/:id", controller.GetReservation)
			protected.DELETE("/reservations/:id", controller.DeleteReservation)

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

			// Status Routes
			protected.POST("/statuses", controller.CreateStatus)
			protected.GET("/statuses", controller.ListStatuses)
			protected.GET("/status/:id", controller.GetStatus)
			protected.PATCH("/statuses", controller.UpdateStatus)
			protected.DELETE("/statuses/:id", controller.DeleteStatus)

			// Booking Routes
			protected.POST("/bookings", controller.CreateBooking)
			protected.GET("/bookings", controller.ListBookings)
			protected.GET("/booking/:id", controller.GetBooking)
			protected.PATCH("/bookings", controller.UpdateBooking)
			protected.DELETE("/bookings/:id", controller.DeleteBooking)

			// Contactus Routes
			protected.POST("/contactuses", controller.CreateContactus)
			protected.GET("/contactuses", controller.ListContactuses)
			protected.GET("/contactus/:id", controller.GetContactus)
			protected.PATCH("/contactuses", controller.UpdateContactus)
			protected.DELETE("/contactuses/:id", controller.DeleteContactus)

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
