/// <reference types="cypress" />

describe ('Sauce Labs Test Suite', () => {
    const username  = 'standard_user';
    const password = 'secret_sauce'
    const Lowest_Price = '$7.99'
    const highest_price = '$49.99'
    const total_amount_to_pay_checkout = '$53.99'

    beforeEach(() => {
        cy.visit('/')

        cy.get('.login_wrapper')
        cy.get('#login_button_container')
        cy.get('[data-test="username"]').type(username)
        cy.get('[data-test="password"]').type(password)


        cy.get('[data-test="login-button"]').click({force:true})
    })

         it('User can view inventory list', () => {

            cy.get('body')
            cy.get(':nth-child(2) > :nth-child(1) > #inventory_container')
            cy.get(':nth-child(1) > .inventory_item_description').should('contain', 'Sauce Labs Backpack')
          

         })


         it('User can filer products from low to high', () => {

            cy.get('.header_secondary_container')
            cy.get('[data-test="product_sort_container"]').select('Price (low to high)')
            cy.get(':nth-child(2) > :nth-child(1) > #inventory_container')
            cy.get(':nth-child(1) > .inventory_item_description')

            //Product starts with the lowest price 
            cy.get(':nth-child(1) > .inventory_item_description > .pricebar > .inventory_item_price').contains(Lowest_Price)
            
          

         })



         
         it('User can filer products from high to low', () => {

            cy.get('.header_secondary_container')
            cy.get('[data-test="product_sort_container"]').select('Price (high to low)')
            cy.get(':nth-child(2) > :nth-child(1) > #inventory_container')
            cy.get(':nth-child(1) > .inventory_item_description')

            //Product starts with the lowest price 
            cy.get(':nth-child(1) > .inventory_item_description > .pricebar > .inventory_item_price').contains(highest_price)
            
          

         })

            
         it('User can add a product to cart', () => {

            cy.get(':nth-child(1) > .inventory_item_description')
            cy.get('[data-test="add-to-cart-sauce-labs-fleece-jacket"]').click()
            
            cy.get('.primary_header')
            cy.get('.shopping_cart_link').click()

            cy.get('#cart_contents_container')
            cy.get('.cart_list')
            cy.get('.cart_item')

             //assert the item name
           cy.get('.inventory_item_name').contains('Sauce Labs Fleece Jacket')
           cy.get('.inventory_item_price').contains('$49.99')
          
           
            cy.get('.cart_footer')
            cy.get('[data-test="checkout"]').click()

            cy.get('#checkout_info_container')
            cy.get('[data-test="firstName"]').type('John')
            cy.get('[data-test="lastName"]').type('Doe')
            cy.get('[data-test="postalCode"]').type('567284')
            cy.get('.checkout_buttons')
            cy.get('[data-test="continue"]').click()

            
           cy.get('#checkout_summary_container')
           cy.get('.summary_total_label').contains(total_amount_to_pay_checkout)
           cy.get('.cart_footer')
           cy.get('[data-test="finish"]').click()

           cy.get('#checkout_complete_container')
           cy.get('.complete-header').contains('THANK YOU FOR YOUR ORDER')

           cy.get('[data-test="back-to-products"]').click()

         })
      


            
         it('User can remove an item from cart', () => {

            cy.get(':nth-child(1) > .inventory_item_description')
            
            cy.get(':nth-child(2) > :nth-child(1) > #inventory_container')
            cy.get('.inventory_list > :nth-child(6)')
            cy.get(':nth-child(6) > .inventory_item_description')
            cy.get('[data-test="add-to-cart-test.allthethings()-t-shirt-(red)"]').click()
            cy.get('.primary_header')
            cy.get('.shopping_cart_link').click()
            cy.get('#cart_contents_container')
            cy.get('.cart_item')
            cy.get('.item_pricebar')
            cy.get('[data-test="remove-test.allthethings()-t-shirt-(red)"]').click()
          

         })
  
    after( () => {
        //Logout User
        cy.get('body')
        cy.get('.primary_header')
        cy.get('#react-burger-menu-btn').click()
        cy.get('.bm-menu')
        cy.get('#logout_sidebar_link').click({force:true})
    })
});