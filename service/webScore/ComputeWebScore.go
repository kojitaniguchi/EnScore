package service

import "kyotohack2018-api/model"

// ComputeWebScore 取得したlighthouse scoreを元にWebScoreを算出する
func ComputeWebScore(results []model.LighthouseScoreCategory) {
	// ５つのカテゴリースコアを評価基準を元にスコア化する
	// １つのURLに対して１つのsocreを算出する
	// ScoreResults に格納して行く
	for i := 0; i < len(results); i++ {
		// Performance score
		PerformanceScore := float64(20) * results[i].Categories.Performance.Score
		println(int(PerformanceScore))
	}
}
