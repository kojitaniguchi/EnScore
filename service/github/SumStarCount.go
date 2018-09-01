package service

import "tutorial/model"

// SumStarCount repository のstargazerの合計
func SumStarCount(Repos model.Repos) int {
	// ユーザーの各リポジトリーのstart数を取得し合計する
	startCount := 0
	for _, repo := range Repos {
		startCount += repo.StargazersCount
	}
	return startCount
}
