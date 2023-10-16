package middlewares

import (
	"net/http"
	"strings"

	"github.com/chonticha1844/Gym-booking/service"
	"github.com/gin-gonic/gin"
)

// // validates token
// func Authorizes() gin.HandlerFunc {
// 	return func(c *gin.Context) {
// 		clientToken := c.Request.Header.Get("Authorization")
// 		if clientToken == "" {
// 			c.JSON(http.StatusForbidden, gin.H{"error": "No Authorization header provided"})
// 			return
// 		}

// 		extractedToken := strings.Split(clientToken, "Bearer ")

// 		if len(extractedToken) == 2 {
// 			clientToken = strings.TrimSpace(extractedToken[1])
// 		} else {
// 			c.JSON(http.StatusBadRequest, gin.H{"error": "Incorrect Format of Authorization Token"})
// 			return
// 		}

// 		jwtWrapper := service.JwtWrapper{
// 			SecretKey: "SvNQpBN8y3qlVrsGAYYWoJJk56LtzFHx",
// 			Issuer:    "AuthService",
// 		}

// 		claims, err := jwtWrapper.ValidateToken(clientToken)
// 		if err != nil {
// 			c.JSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
// 			return
// 		}

// 		c.Set("email", claims.Email)

// 		c.Next()

// 	}
// }

func Authorizes() gin.HandlerFunc {
	return func(c *gin.Context) {
		// Check the request URL and method to handle "Forgot Password" separately
		if c.Request.URL.Path == "/forgot-password" && c.Request.Method == "POST" {
			// Handle "Forgot Password" logic without token validation
			// Example: Generate a password reset token and send it to the user's email
			// (as shown in previous examples)
		} else {
			// For other routes that require authentication, perform token validation
			clientToken := c.Request.Header.Get("Authorization")
			if clientToken == "" {
				c.JSON(http.StatusForbidden, gin.H{"error": "No Authorization header provided"})
				return
			}

			extractedToken := strings.Split(clientToken, "Bearer ")

			if len(extractedToken) == 2 {
				clientToken = strings.TrimSpace(extractedToken[1])
			} else {
				c.JSON(http.StatusBadRequest, gin.H{"error": "Incorrect Format of Authorization Token"})
				return
			}

			jwtWrapper := service.JwtWrapper{
				SecretKey: "SvNQpBN8y3qlVrsGAYYWoJJk56LtzFHx",
				Issuer:    "AuthService",
			}

			claims, err := jwtWrapper.ValidateToken(clientToken)
			if err != nil {
				c.JSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
				return
			}

			// Set the user's email in the context for authorized routes
			c.Set("email", claims.Email)
		}

		// Continue to the next middleware or route
		c.Next()
	}
}
