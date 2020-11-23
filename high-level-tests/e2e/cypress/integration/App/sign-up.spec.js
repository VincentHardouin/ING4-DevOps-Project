/// <reference types="cypress" />

context('Sign Up', () => {
  it('should sign up and sign in', () => {
    // Sign Up
    // given
    cy.visit('http://localhost:3000')
    cy.get('#sign-up .panel-heading a').click()
    cy.get('#sign-up #username').type('test-username')
    cy.get('#sign-up #password').type('test-Passw0rd')

    // when
    cy.get('#sign-up #btn-sign-up').click()

    // then
    cy.get('#sign-up .alert-success').contains('L‘utilisateur a bien été créé')

    // Sign In
    // given
    cy.get('#sign-in .panel-heading a').click()
    cy.get('#sign-in #username').clear()
    cy.get('#sign-in #password').clear()
    cy.get('#sign-in #username').type('test-username')
    cy.get('#sign-in #password').type('test-Passw0rd')

    // when
    cy.get('#sign-in #btn-sign-in').click()

    cy.get('p').contains('Welcome test-username')
  })
})
