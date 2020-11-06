/// <reference types="cypress" />

context('Sign Up', () => {
  it('should sign up', () => {
    // given
    cy.visit('http://localhost:3000')
    cy.get('#sign-up .panel-heading a').click()
    cy.get('#sign-up #username').type('test-username')
    cy.get('#sign-up #password').type('test-Passw0rd')

    // when
    cy.get('#sign-up #btn-sign-up').click()

    // then
    cy.get('#sign-up .alert-success').contains('L‘utilisateur a bien été créé')
  })
})
