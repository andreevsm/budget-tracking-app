describe('Sign Up Page', () => {

  beforeEach(() => {
    cy.visit('/signup');
  });

  it('Should display Sign Up Page', () => {
    cy.contains('Регистрация');
  })

  it('Should Sign Up User', () => {
    cy.get('input[formcontrolname="login"]')
    .type('test login 2')
    .should('have.value', 'test login 2');

    cy.get('input[formcontrolname="email"]')
    .type('test2@mail.com')
    .should('have.value', 'test2@mail.com');

    cy.get('input[formcontrolname="password"]')
    .type('1q2w3e4r5t6y')
    .should('have.value', '1q2w3e4r5t6y');

    cy.get('form').submit();

    cy.location('pathname', { timeout: 10000 }).should('eq', '/accounts');
  })
});