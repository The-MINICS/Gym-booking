package controller

import (
	"fmt"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid" // You can use your own token generation library
)

// User struct represents user data (e.g., ID, email, reset token, token expiration time).
type User struct {
	ID           int
	Email        string
	ResetToken   string
	TokenExpires time.Time
}

var usersDB = make(map[int]User)

func main() {
	r := gin.Default()

	// Endpoint to request a password reset
	r.POST("/forgot-password", ForgotPassword)

	r.Run(":8080")
}

// ForgotPassword generates a reset token and sends a reset email.
func ForgotPassword(c *gin.Context) {
	// Parse user's email from the request
	var request struct {
		Email string `json:"email"`
	}

	if err := c.ShouldBindJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
		return
	}

	// Check if the email is associated with a user
	user, ok := findUserByEmail(request.Email)
	if !ok {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}

	// Generate a unique reset token
	resetToken := generateResetToken()

	// Set the token expiration time (e.g., 1 hour from now)
	tokenExpires := time.Now().Add(time.Hour)

	// Store the token and expiration time in the database
	user.ResetToken = resetToken
	user.TokenExpires = tokenExpires
	usersDB[user.ID] = user

	// Send a reset email to the user's email address (replace with your email sending logic)
	sendResetEmail(user.Email, resetToken)

	// Respond with a success message
	c.JSON(http.StatusOK, gin.H{"message": "Password reset instructions sent to your email"})
}

// Helper function to find a user by email (replace with your database query logic)
func findUserByEmail(email string) (User, bool) {
	for _, user := range usersDB {
		if user.Email == email {
			return user, true
		}
	}
	return User{}, false
}

// Helper function to generate a unique reset token (using UUID as an example)
func generateResetToken() string {
	return uuid.New().String()
}

// Helper function to send a reset email (replace with your email sending logic)
func sendResetEmail(email, token string) {
	fmt.Printf("Sending reset email to %s with token %s\n", email, token)
}
