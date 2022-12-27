describe( 'render application' , () => {

    before( 'visit page' , () => {
        cy.visit( '../../index.html' );
    } );

    it( 'render add task panel' , () => {
        cy.get( '.main__form-container' ).children().should( 'have.length' , 3 );
        cy.get( 'input[type="checkbox"]' ).should( 'not.be.checked' );
        cy.get( 'input[type="text"]' ).invoke( 'attr' , 'placeholder' ).should( 'equal' , 'New task' );
    } );

    it( 'render task list' , () => {
        cy.get( '.main__task-list' ).children().should( 'have.length' , 0 );
    } );

    it( 'render navigation panel' , () => {
        cy.get( '.main__nav' ).children().should( 'have.length' , 3 );
        cy.get( '.main__nav__incomplete-task-counter-container' ).should( 'contain' , '0' , 'items left' );
        cy.get( '.main__nav__button-container' ).should( 'contain' , 'All' , 'Active' , 'Completed' );
        cy.get( '.main__nav__clear-button-container' ).should( 'contain' , 'Clear Completed' );
    } );
} );

describe( 'full flow of application' , () => {

    let TODO_ITEM_ONE = 'create app';
    let TODO_ITEM_TWO = 'commit changes';
    let TODO_ITEM_THREE = 'put project on github';
    let TODO_ITEM_FOUR = 'test app';
    let TODO_ITEM_FIVE = 'HURRAY! LETS PARTY!';

    const counter = '.main__nav__incomplete-task-counter-container__counter';

    before( 'visit page' , () => {
        cy.visit( '../../index.html' );
    } );

    it( 'add incompleted task, increase counter and clear input field after item is added ' , () => {
        cy.addTask( TODO_ITEM_ONE );
        cy.get( '.main__task-list li' ).eq( 0 ).find( 'input[type="checkbox"]' ).should( 'not.be.checked' );
        cy.get( '.main__task-list li' ).eq( 0 ).should( 'contain' , TODO_ITEM_ONE );
        cy.get( '.main__form-container__input' ).should( 'have.text' , '' );
        cy.get( counter ).should( 'have.text' , 1 );
    } );

    it( 'add completed task, dont increase counter' , () => {
        cy.addTask( TODO_ITEM_TWO , true );
        cy.get( '.main__task-list li' ).eq( 1 ).find( 'input[type="checkbox"]' ).should( 'be.checked' );
        cy.get( '.main__task-list li' ).eq( 1 ).should( 'contain' , TODO_ITEM_TWO );
        cy.get( counter ).should( 'have.text' , 1 );
    } );

    it( 'change status of task on the list, check counter' , () => {
        cy.addTask( TODO_ITEM_THREE );
        cy.get( '.main__task-list li' ).eq( 2 ).find( 'input[type="checkbox"]' ).click();
        cy.get( '.main__task-list li' ).eq( 2 ).find( 'input[type="checkbox"]' ).should( 'be.checked' );
        cy.get( counter ).should( 'have.text' , 1 );
        cy.get( '.main__task-list li' ).eq( 2 ).find( 'input[type="checkbox"]' ).click();
        cy.get( '.main__task-list li' ).eq( 2 ).find( 'input[type="checkbox"]' ).should( 'not.be.checked' );
        cy.get( counter ).should( 'have.text' , 2 );
    } );

    it( 'change active tab' , () => {
        cy.get( '.main__nav__button-container' ).contains( 'Active' ).click();
        cy.get( '.main__task-list li' ).should( 'have.length' , 2 );
        cy.get( '.main__nav__button-container' ).contains( 'Completed' ).click();
        cy.get( '.main__task-list li' ).should( 'have.length' , 1 );
        cy.get( '.main__nav__button-container' ).contains( 'All' ).click();
        cy.get( '.main__task-list li' ).should( 'have.length' , 3 );
    } );

    it( 'task list is load after refresh' , () => {
        cy.reload();
        cy.get( '.main__task-list li' ).should( 'have.length' , 3 );
    } );

    it( 'remove task' , () => {
        cy.get( '.main__task-list li' ).eq( 2 ).find( 'button' ).click();
        cy.get( '.main__task-list li' ).should( 'have.length' , 2 );
        cy.get( counter ).should( 'have.text' , 1 );
    } );

    it( 'remove all completed' , () => {
        cy.addTask( TODO_ITEM_FOUR , true );
        cy.addTask( TODO_ITEM_FIVE , true );
        cy.get( '.main__nav__clear-button' ).click();
        cy.get( '.main__task-list li' ).should( 'have.length' , 3 );
        cy.get( counter ).should( 'have.text' , 1 );
    } );
} );

describe( 'check task adding' , () => {

    let TODO_ITEM_ONE = 'create app';
    let TODO_ITEM_TWO = 'commit changes';

    before( 'visit page' , () => {
        cy.visit( '../../index.html' , {
            onBeforeLoad( win ) {
                win.localStorage.clear();
            } ,
        } );
    } );

    it( 'add task to list ' , () => {
        cy.get( '.main__task-list li' ).should( 'have.length' , 0 );
        cy.addTask( TODO_ITEM_ONE , true );
        cy.get( '.main__task-list li' ).should( 'have.length' , 1 );
        cy.addTask( TODO_ITEM_TWO );
        cy.get( '.main__task-list li' ).should( 'have.length' , 2 );
    } );

    it( 'doesnt add \"empty\" task ' , () => {
        cy.addTask( '           ' );
        cy.get( '.main__task-list li' ).should( 'have.length' , 2 );
    } );

    it( 'doesnt add task which already exist in the list' , () => {
        cy.addTask( TODO_ITEM_ONE );
        cy.get( '.main__task-list li' ).should( 'have.length' , 2 );
    } );

    it( 'check if task is trim when added' , () => {
        cy.addTask( '2' );
        cy.get( '.main__task-list li' ).eq( 2 ).should( 'have.text' , TODO_ITEM_ONE + '2' );
    } );

} );