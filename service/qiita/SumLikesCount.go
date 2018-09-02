package service

import "kyotohack2018-api/model"

// SumLikesCount repository のstargazerの合計
func SumLikesCount(Posts model.Posts) int {
	// ユーザーの各リポジトリーのstart数を取得し合計する
	LikesSum := 0
	for _, post := range Posts {
		LikesSum += post.LikesCount
	}
	return LikesSum
}
