package service

import (
	"fmt"
	"strconv"

	"github.com/PuerkitoBio/goquery"
)

// ScrapingActivety userの年間contributionを取得し、activety数を返す
// activety数とは、年間何日contributeしたかのカウント。(max 371, min 0)
// 各日のcontributionの数は考慮しない。
func ScrapingActivety(name string) int {
	doc, err := goquery.NewDocument("https://github.com/users/" + name + "/contributions")
	if err != nil {
		fmt.Print("url scarapping failed")
	}
	activetyCount := 0
	doc.Find("rect").Each(func(_ int, s *goquery.Selection) {
		// date, _ := s.Attr("data-date")
		// fmt.Println("data-date: " + date)
		dataCount, _ := s.Attr("data-count")
		count, _ := strconv.Atoi(dataCount)
		if count > 0 {
			activetyCount++
		}
	})
	return activetyCount
}
