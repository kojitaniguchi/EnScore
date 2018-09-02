package service

import (
	"fmt"
	"strconv"
)

// ComputeQiitaScore startCount activetyCountを元にgithubScoreを算出
func ComputeQiitaScore(ItemsCount int, FollowersCount int, SumLikesCount int, ActivetyCount int) int {
	// 計算結果がfloatになるときは、項もfloat64にしておく。

	// --------------------- ItemsScore --------------------------
	// ItemsScore = ItemsScoreの配点(30点) * (投稿数/50)
	ItemsScore := 0
	if ItemsCount == 1 {
		ItemsScore = 1
	} else if 2 <= ItemsCount && ItemsCount < 50 {
		Float64ItemsScore := float64(30) * (float64(ItemsCount) / float64(50))
		ItemsScore = int(Float64ItemsScore)
	} else if 50 <= ItemsCount {
		ItemsScore = 30
	}
	fmt.Println("ItemsScore: " + strconv.Itoa(ItemsScore))

	// --------------------- LikesScore ------------------------------
	// LikesScore = LikesScoreの配点(30点) * (ユーザー投稿のイイね総数/1000)
	LikesScore := 0
	if 0 < SumLikesCount && SumLikesCount < 40 {
		LikesScore = 1
	} else if 10 <= SumLikesCount && SumLikesCount < 100 {
		Float64LikesScore := float64(30) * (float64(SumLikesCount) / float64(1000))
		LikesScore = int(Float64LikesScore)
	} else if 1000 <= SumLikesCount {
		LikesScore = 30
	}
	fmt.Println("LikesScore: " + strconv.Itoa(LikesScore))

	// --------------------- FollowersScore ------------------------------
	// FollowersScore = FollowersScoreの配点(10点) * (ユーザーFollowers/100)
	FollowersScore := 0
	if 0 < FollowersCount && FollowersCount < 10 {
		FollowersScore = 1
	} else if 10 <= FollowersCount && FollowersCount < 100 {
		Float64FollowersScore := float64(30) * (float64(FollowersCount) / float64(1000))
		FollowersScore = int(Float64FollowersScore)
	} else if 100 <= FollowersCount {
		FollowersScore = 30
	}
	fmt.Println("FollowersScore: " + strconv.Itoa(FollowersScore))

	// --------------------- ActivetyScore ------------------------------
	// ActivetyScore = ActivetyScoreの配点(30点) * (活動頻度/12)
	Float64ActivetyScore := float64(30) * (float64(ActivetyCount) / float64(12))
	ActivetyScore := int(Float64ActivetyScore)
	fmt.Println("ActivetyScore: " + strconv.Itoa(ActivetyScore))

	qiitaScore := ItemsScore + LikesScore + FollowersScore + ActivetyScore
	return qiitaScore
}
