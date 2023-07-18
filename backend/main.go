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

	// User Routes
	r.POST("/users", controller.CreateUser)
	r.GET("//genders", controller.ListGenders)
	r.GET("/users", controller.ListUsers)

	// Authentication Routes
	r.POST("/login/user", controller.LoginUser)

	api := r.Group("")
	{
		protected := api.Use(middlewares.Authorizes())
		{

			// Equipment Routes
			protected.POST("/equipments", controller.CreateEquipment)
			protected.GET("/equipments", controller.ListEquipments)
			protected.GET("/equipment/:id", controller.GetEquipment)
			protected.DELETE("/equipments/:id", controller.DeleteEquipment)

			// Reservation Routes
			protected.POST("/reservations", controller.CreateReservation)
			protected.GET("/reservations", controller.ListReservations)
			protected.GET("/reservation/:id", controller.GetReservation)
			protected.DELETE("/reservations/:id", controller.DeleteReservation)

			//Gender Routes
			protected.GET("/gender/:id", controller.GetGender)
			protected.POST("/genders", controller.CreateGender)
			protected.PATCH("/genders", controller.UpdateGender)
			protected.DELETE("/genders/:id", controller.DeleteGender)

			//User Routes
			protected.GET("/user/:id", controller.GetUser)
			protected.PATCH("/users", controller.UpdateUser)
			protected.DELETE("/users/:id", controller.DeleteUser)
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
