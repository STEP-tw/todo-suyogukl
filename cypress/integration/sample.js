describe('sample', () => {
  it('should open homepage of app', () => {
    cy.visit("http://localhost:5001/login")
    .get("#userName")
    .type("suyog")
    cy.get("#password")
    .type("a")
    cy.get("#login").click()
    cy.contains("at home").click()
  });
});