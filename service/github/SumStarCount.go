package service

import "tutorial/model"

// SumStarCount repository のstargazerの合計
func SumStarCount(Repos model.Repos) int {
	startCount := 0
	for _, repo := range Repos {
		startCount += repo.StargazersCount
	}
	return startCount
}
