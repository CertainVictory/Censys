describe('PaginatedList', () => {
  beforeEach(() => {
    cy.visit('/');
  });
  it('passes', () => {
    cy.visit('http://localhost:5173/');
  });
  it('should search for a query and display results', () => {
    cy.get('[data-testid="search-input"]').type('127.0.0{enter}');
    cy.get('[data-testid="search-button"]').click();
    cy.get('[data-testid="results-list"] [data-testid^="result-item-"]').should(
      //  [data-testid^="result-item-"] selects all the result items, cypress is weird.
      'have.length.greaterThan',
      0
    );
  });

  it('should navigate to the next page of results', () => {
    cy.get('[data-testid="search-input"]').type('127.0.0{enter}');
    cy.get('[data-testid="search-button"]').click();
    cy.get('[data-testid="results-list"] [data-testid^="result-item-"]').should(
      'have.length.greaterThan',
      0
    );
    cy.get('[data-testid="next-button"]').click();
    cy.get('[data-testid="results-list"] [data-testid^="result-item-"]').should(
      'have.length.greaterThan',
      0
    );
  });

  it('should navigate to the previous page of results', () => {
    cy.get('[data-testid="search-input"]').type('127.0.0{enter}');
    cy.get('[data-testid="search-button"]').click();
    cy.get('[data-testid="results-list"] [data-testid^="result-item-"]').should(
      'have.length.greaterThan',
      0
    );
    cy.get('[data-testid="next-button"]').click();
    cy.get('[data-testid="results-list"] [data-testid^="result-item-"]').should(
      'have.length.greaterThan',
      0
    );
    cy.get('[data-testid="prev-button"]').click();
    cy.get('[data-testid="results-list"] [data-testid^="result-item-"]').should(
      'have.length.greaterThan',
      0
    );
  });
  it('should return 116.202.194.118 if query is 127.0.0', () => {
    cy.get('[data-testid="search-input"]').type('127.0.0{enter}');
    cy.get('[data-testid="search-button"]').click();
    cy.get(
      `[data-testid="results-list"] [data-testid="result-item-${'116.202.194.118'}"]`
    ).should('exist');
  });
  // can become a fixture^
});

// good example of a test that tests just behavior and not actual return values
// responses can be mocked with fixtures
// commands can also be used to abstract away common actions
