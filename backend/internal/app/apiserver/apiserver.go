package apiserver

// APIServer ...
type APIServer struct{
	config *Config
}

// New ...
func New(config *Config) *APIServer {
	return &APIServer{
		config: config
	}
}

// Start ...
func (s *APIServer) Start() error {
	return nil
}
