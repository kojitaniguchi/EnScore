package main

import (
	"fmt"

	"github.com/PuerkitoBio/goquery"
)

func main() {
	doc, err := goquery.NewDocument("https://github.com/users/kojitaniguchi/contributions")
	if err != nil {
		fmt.Print("url scarapping failed")
	}
	doc.Find("rect").Each(func(_ int, s *goquery.Selection) {
		date, _ := s.Attr("data-date")
		fmt.Println("data-date: " + date)
		count, _ := s.Attr("data-count")
		fmt.Println("data-count: " + count)
	})
}
