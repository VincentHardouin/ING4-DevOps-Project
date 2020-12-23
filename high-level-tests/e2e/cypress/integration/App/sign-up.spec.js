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

    // then
    cy.get('p').contains('Welcome test-username')

    // Update Password
    // given
    const newPassword = 'new-Passw0rd'
    cy.get('#update-password #password').type(newPassword)

    // when
    cy.get('#update-password #btn-update-password').click()

    // then
    cy.get('#sign-up .alert-success').contains(
      'Le mot de passe a bien été mis à jour'
    )

    // Sign In With New Password
    // given
    cy.get('#sign-in .panel-heading a').click()
    cy.get('#sign-in #username').clear()
    cy.get('#sign-in #password').clear()
    cy.get('#sign-in #username').type('test-username')
    cy.get('#sign-in #password').type(newPassword)

    // when
    cy.get('#sign-in #btn-sign-in').click()

    // then
    cy.get('p').contains('Welcome test-username')

    // Delete
    // when
    cy.get('#btn-delete').click()

    cy.get('#sign-up .alert-success').contains(
      'L‘utilisateur a bien été supprimé'
    )
  })
})
