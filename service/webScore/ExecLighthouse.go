package service

import (
	"encoding/json"
	"kyotohack2018-api/model"
	"os/exec"
)

// lighthouse cli では headless chrome を起動している(パッケージ内で chrome-launcher を使用しているため)
// そのため、デプロイ先でchromeを使える環境が必須。(docker では chromium)
// 今回は heroku 環境なので、以下２つの Buildpacks を heroku 環境に入れておく。
// - https://github.com/heroku/heroku-buildpack-chromedriver.git
// - https://github.com/heroku/heroku-buildpack-google-chrome.git

// ExecLighthouse Performance　ProgressiveWebApp Accessibility SEO BestPractices の５つのscoreを返す。
func ExecLighthouse() []model.LighthouseScoreCategory {
	// ここのURLは request body から取得した任意のURLを入れる。
	var URL = []string{"https://kojitaniguchi.net"}
	var results []model.LighthouseScoreCategory

	for i := 0; i < len(URL); i++ {
		commandStr := "lighthouse --chrome-flags='--headless --no-sandbox --disable-gpu' --output json --quiet " + URL[i]
		out, err := exec.Command("sh", "-c", commandStr).Output()
		if err != nil {
			panic(err)
		}
		var lighthouseScore model.LighthouseScoreCategory
		err = json.Unmarshal(out, &lighthouseScore)
		if err != nil {
			panic(err)
		}
		results = append(results, lighthouseScore)
	}

	return results
}
