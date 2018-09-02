package service

import (
	"fmt"
	"strconv"
)

// ComputeScoreGithub startCount activetyCountを元にgithubScoreを算出
func ComputeScoreGithub(startCount int, activetyCount int) int {
	// 計算結果がfloatになるときは、項もfloat64にしておく。

	// --------------------- activetyScore　--------------------------
	// activetyScore　= Activetyの配点(60点) * (活動日数/年間日数)
	Float64ActivetyScore := float64(60) * (float64(activetyCount) / float64(371))
	activetyScore := int(Float64ActivetyScore)
	fmt.Println("activetyScore: " + strconv.Itoa(activetyScore))

	// --------------------- starScore ------------------------------
	// startScore　= Startの配点(40点) * (ユーザーのスター数/100)
	// ユーザーのスター数が100以上の場合、startScoreは満点の40点とする
	starScore := 0
	if 0 < startCount && startCount < 10 {
		starScore = 1
	} else if 10 <= startCount && startCount < 100 {
		Float64StarScore := float64(40) * (float64(startCount) / float64(100))
		starScore = int(Float64StarScore)
	} else if 100 <= startCount {
		starScore = 40
	}
	fmt.Println("starScore: " + strconv.Itoa(starScore))
	githubScore := activetyScore + starScore
	return githubScore
}
