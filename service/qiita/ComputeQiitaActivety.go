package service

import (
	"kyotohack2018-api/model"
	"time"
)

type post struct {
	ID         string    `json:"id"`
	Private    bool      `json:"private"`
	CreatedAt  time.Time `json:"created_at"`
	UpdatedAt  time.Time `json:"updated_at"`
	LikesCount int       `json:"likes_count"`
}

// ComputeQiitaActivety 直近1年間での投稿活動頻度を全ての投稿の CreatedAt と UpdateAt を元に算出
func ComputeQiitaActivety(Posts model.Posts) int {
	var ActivetyCandidate []int
	for _, post := range Posts {
		// 限定公開の投稿は対象外
		if post.Private != true {
			// 直近1年間での活動で該当するmonthをActivetyCandidateに格納
			ActivetyCandidate = checkWithinPeriod(post, ActivetyCandidate)
		}
	}
	// ActivetyCandidate の 重複するmonthを削除することで、同じ月に複数回活動していても、1カウントとみなす。
	Activety := removeDuplicate(ActivetyCandidate)
	ActivetyCount := len(Activety)

	return ActivetyCount
}

// CheckWithinPeriod Timeを比較し、直近１年間の活動を算出する
func checkWithinPeriod(post post, ActivetyCandidate []int) []int {
	// 今日の日付
	todayTime := time.Now()

	// 一年前の日付
	OneYearAgoTime := todayTime.AddDate(-1, 0, 0)

	// 投稿の作成・更新日付
	CreatedTime := post.CreatedAt
	UpdatedAtTime := post.UpdatedAt

	// month(例 "apr")に対応する、int(例 4)を返す
	month := [12]int{1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12}

	// CreatedAt と UpdateAt で直近一年以内ににの活動当たるものを全て取得し, ActivetyCandidate
	if OneYearAgoTime.Unix() <= CreatedTime.Unix() {
		CreatedAtMonth := month[post.CreatedAt.Month()]
		ActivetyCandidate = append(ActivetyCandidate, CreatedAtMonth)
	}
	if OneYearAgoTime.Unix() <= UpdatedAtTime.Unix() {
		UpdatedAtMonth := month[post.UpdatedAt.Month()]
		ActivetyCandidate = append(ActivetyCandidate, UpdatedAtMonth)
	}

	return ActivetyCandidate
}

// 重複した要素を削除して返却
func removeDuplicate(args []int) []int {
	results := make([]int, 0, len(args))
	encountered := map[int]bool{}
	for i := 0; i < len(args); i++ {
		if !encountered[args[i]] {
			encountered[args[i]] = true
			results = append(results, args[i])
		}
	}
	return results
}
