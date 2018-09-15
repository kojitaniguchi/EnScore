package service

import (
	"kyotohack2018-api/model"
	"strconv"
)

// ComputeWebScore 取得したlighthouse scoreを元にWebScoreを算出する
func ComputeWebScore(results []model.LighthouseScoreCategory) []model.ScoreResult {
	// ５つのカテゴリースコアを評価基準を元にスコア化する
	// １つのURLに対して１つのsocreを算出する
	var ScoreResults []model.ScoreResult
	for i := 0; i < len(results); i++ {
		// Performance score
		Float64PerformanceScore := float64(20) * results[i].Categories.Performance.Score
		PerformanceScore := int(Float64PerformanceScore)
		println("PerformanceScore: " + strconv.Itoa(PerformanceScore))

		// Pwa score
		Float64PwaScore := float64(20) * results[i].Categories.Pwa.Score
		PwaScore := int(Float64PwaScore)
		println("PwaScore: " + strconv.Itoa(PwaScore))

		// Accessibility Score
		Float64AccessibilityScore := float64(20) * results[i].Categories.Accessibility.Score
		AccessibilityScore := int(Float64AccessibilityScore)
		println("AccessibilityScore: " + strconv.Itoa(AccessibilityScore))

		// BestPractices Score
		Float64BestPracticesScore := float64(20) * results[i].Categories.BestPractices.Score
		BestPracticesScore := int(Float64BestPracticesScore)
		println("BestPracticesScore: " + strconv.Itoa(BestPracticesScore))

		// Seo Score
		Float64SeoScore := float64(20) * results[i].Categories.Seo.Score
		SeoScore := int(Float64SeoScore)
		println("SeoScore: " + strconv.Itoa(SeoScore))

		ScoreSum := PerformanceScore + PwaScore + AccessibilityScore + BestPracticesScore + SeoScore
		println("ScoreSum: " + strconv.Itoa(ScoreSum))

		RequestedURL := results[i].RequestedURL
		ScoreResult := model.ScoreResult{RequestedURL: RequestedURL, Score: ScoreSum}

		ScoreResults = append(ScoreResults, ScoreResult)
	}

	return ScoreResults
}
