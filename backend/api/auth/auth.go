package auth

import (
	"errors"
	"os"
	"time"

	jwt "github.com/appleboy/gin-jwt/v2"
	"github.com/gin-gonic/gin"
	"github.com/marcelogdeandrade/csgo_demo_viewer/controllers"
	"github.com/marcelogdeandrade/csgo_demo_viewer/models"
)

// GetAuthMiddleWare function
func GetAuthMiddleWare() (*jwt.GinJWTMiddleware, error) {
	identityKey := "id"
	authMiddleware, err := jwt.New(&jwt.GinJWTMiddleware{
		Realm:       "test zone",
		Key:         []byte("secret key"),
		Timeout:     time.Hour,
		MaxRefresh:  time.Hour,
		IdentityKey: identityKey,
		PayloadFunc: func(data interface{}) jwt.MapClaims {
			if v, ok := data.(models.Account); ok {
				return jwt.MapClaims{
					identityKey: v.ID,
				}
			}
			return jwt.MapClaims{}
		},
		Authenticator: func(c *gin.Context) (interface{}, error) {
			return controllers.Login(c)
		},
		Unauthorized: func(c *gin.Context, code int, message string) {
			c.JSON(code, gin.H{
				"code":    code,
				"message": message,
			})
		},

		TokenHeadName: "Bearer",

		SendCookie:   true,
		CookieDomain: getCurrentDomain(),
		TokenLookup:  "cookie:jwt",

		TimeFunc: time.Now,
	})
	return authMiddleware, err
}

// VerifyToken function
func VerifyToken(c *gin.Context) (uint, error) {
	claims := jwt.ExtractClaims(c)
	userID := claims["id"]
	if userID == nil {
		return 0, errors.New("token error")
	}
	return uint(userID.(float64)), nil
}

func getCurrentDomain() string {
	appEnv := os.Getenv("APP_ENV")
	if appEnv == "production" {
		return "csdemos.com"
	}
	return "marcelao.com.br"
}
