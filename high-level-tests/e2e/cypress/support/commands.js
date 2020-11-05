beforeEach(() => {
  cy.exec('redis-cli FLUSHALL');
});

