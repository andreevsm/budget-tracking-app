package teststore

import (
	"github.com/andreevsm/budget-tracking-app/backend/internal/app/store"

	"github.com/andreevsm/budget-tracking-app/backend/internal/app/model"
)

// UserRepository ...
type UserRepository struct {
	store *Store
	users map[string]*model.User
}

// Create ...
func (r *UserRepository) Create(u *model.User) error {
	if err := u.Validate(); err != nil {
		return err
	}

	if err := u.BeforeCreate(); err != nil {
		return err
	}

	r.users[u.Email] = u
	u.ID = len(r.users)

	return nil
}

// FindByEmail ...
func (r *UserRepository) FindByEmail(email string) (*model.User, error) {
	u, ok := r.users[email]

	if !ok {
		return nil, store.ErrRecordNotFound
	}

	return u, nil
}
