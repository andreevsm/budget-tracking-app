package store

import "github.com/andreevsm/budget-tracking-app/backend/internal/app/model"

// UserRepository ...
type UserRepository interface {
	Create(*model.User) error
	FindByEmail(string) (*model.User, error)
}
