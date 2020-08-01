package apiserver

// APIServer ...
type APIServer struct{}

// New ...
func New() *APIServer {
	return &APIServer{}
}

// Start ...
func (s *APIServer) Start() error {
	return nil
}
