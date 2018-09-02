package model

// QiitaCredentialData access_tokenが入ったreponseの json 構造体
type QiitaCredentialData struct {
	AccessToken string   `json:"token"`
	ClientID    string   `json:"client_id"`
	Scopes      []string `json:"scopes"`
}
