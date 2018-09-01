package service

import (
	"fmt"
	"strconv"
)

// ScoreGithub startCount activetyCountを元にscoreを算出
func ScoreGithub(startCount int, activetyCount int) int {

	Float64ActivetyScore := float64(60) * (float64(activetyCount) / float64(371))
	activetyScore := int(Float64ActivetyScore)
	fmt.Println("activetyScore: " + strconv.Itoa(activetyScore))

	starScore := 0
	if startCount < 100 {
		Float64StarScore := float64(40) * (float64(startCount) / float64(100))
		starScore = int(Float64StarScore)
	} else if 100 <= startCount {
		starScore = 40
	}
	fmt.Println("starScore: " + strconv.Itoa(starScore))

	githubScore := activetyScore + starScore

	return githubScore
}
