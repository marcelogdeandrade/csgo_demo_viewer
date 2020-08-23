package utils

// CheckError function
func CheckError(err error) {
	if err != nil {
		panic(err.Error())
	}
}
