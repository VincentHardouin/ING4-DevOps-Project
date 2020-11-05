/// <reference types="cypress" />

context('Sign In', () => {
  it('should sign in', () => {
    // given
    cy.visit('http://localhost:3000')
    cy.get('#sign-in .panel-heading a').click()
    cy.get('#sign-in #username').type('test-username')
    cy.get('#sign-in #password').type('test-Passw0rd')

    // when
    cy.get('#sign-in #btn-sign-in').click()

    // then
    cy.get('#sign-in .alert-success').contains('L‘utilisateur a bien été créé')
  })
})
