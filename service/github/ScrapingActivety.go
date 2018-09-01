package service

import (
	"fmt"
	"strconv"

	"github.com/PuerkitoBio/goquery"
)

// ScrapingActivety userの年間contributionを取得し、activetyCount数を返す
// activety数とは、年間何日contributeしたかのカウント。(max 371, min 0)
// 各日のcontributionの数は考慮しない。
func ScrapingActivety(name string) int {
	// username を使い contributionsを取得できるhtmlを取得する
	doc, err := goquery.NewDocument("https://github.com/users/" + name + "/contributions")
	if err != nil {
		fmt.Print("url scarapping failed")
	}

	activetyCount := 0
	// contributionsは svg の rect で描画されているので、rectを抽出
	doc.Find("rect").Each(func(_ int, s *goquery.Selection) {
		// rect の data-count が日当りの contributions を持っているので、それを元にactivetyCountを算出
		dataCount, _ := s.Attr("data-count")
		count, _ := strconv.Atoi(dataCount)
		if count > 0 {
			activetyCount++
		}
	})
	return activetyCount
}
