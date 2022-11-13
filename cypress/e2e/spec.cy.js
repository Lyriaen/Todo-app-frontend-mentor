describe('render application', () => {
  before('visit page', () => {
    cy.visit('../../index.html')
  })
  it('render add task panel', () => {
    cy.get('.main__form-contanier').children().should('have.length', 3)
    cy.get('input[type="checkbox"]').should('not.be.checked')
    cy.get('input[type="text"]').invoke('attr', 'placeholder').should('equal', 'New task')
  })
  it('render task list', () => {
    cy.get('.main__task-list').children().should('have.length', 0)
  })
  it('render navigation panel', () => {
    cy.get('.main__nav').children().should('have.length', 3)
    cy.get('.main__nav__incomplete-task-counter-container').should('contain', '0', 'items left')
    cy.get('.main__nav__button-container').should('contain', 'All', 'Active', 'Completed')
    cy.get('.main__nav__clear-button-container').should('contain', 'Clear Completed')
  })
})