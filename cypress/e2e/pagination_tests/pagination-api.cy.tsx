describe('Censys API Calls', () => {
  it('should return 200 -- valid request', () => {
    const query = 'example';
    cy.request({
      url:
        Cypress.env('API_URL') +
        `?q=${query}&per_page=50&sort=RELEVANCE&virtual_hosts=EXCLUDE`,

      headers: {
        Authorization: `Basic ${Cypress.env('AUTH_HEADER')}`,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('result');
    });
  });

  it('should return 401 error, no auth', () => {
    const query = '127.0.0';
    cy.request({
      url:
        Cypress.env('API_URL') +
        `?q=${query}&per_page=50&sort=RELEVANCE&virtual_hosts=EXCLUDE`,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.body.code).to.eq(401);
    });
  });

  it('should return 422 error -- invalid cursor', () => {
    const query = '127.0.0';
    cy.request({
      url:
        Cypress.env('API_URL') +
        `?q=${query}?per_page=50&sort=RELEVANCE&virtual_hosts=EXCLUDE&cursor:2`,
      headers: {
        Authorization: `Basic ${Cypress.env('AUTH_HEADER')}`,
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.body.code).to.eq(422);
    });
  });

  // could add rate limit test here but i stil need to finish this before i rate limit myself
});
