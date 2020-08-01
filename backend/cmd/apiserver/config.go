package apiserver

// Config ...
type Config struct {
	BidnAddr string `toml:"bind_addr`
}

// NewConfig
func NewConfig() *Config {
	return &Config {
		BidnAddr: ":8080"
	}
}