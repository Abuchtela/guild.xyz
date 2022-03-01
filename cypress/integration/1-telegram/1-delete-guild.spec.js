/// <reference types="cypress" />

before(() => {
  cy.disconnectMetamaskWalletFromAllDapps()
})

describe("delete-guild", () => {
  before(() => {
    cy.visit("/cypress-gang")
  })

  describe("without wallet", () => {
    it("renders page", () => {
      cy.get("h1").should("contain.text", "Cypress Gang")
    })

    it("edit button is not visible", () => {
      cy.get(".chakra-button[aria-label='Edit & customize guild']").should(
        "not.exist"
      )
    })
  })

  describe("with wallet", () => {
    before(() => {
      cy.connectWallet()
    })

    it("edit button is visible", () => {
      cy.get(".chakra-button[aria-label='Edit & customize guild']")
        .should("exist")
        .should("be.visible")
    })

    it("open edit tab", () => {
      cy.get(".chakra-button[aria-label='Edit & customize guild']").click()
      cy.get(".chakra-slide h2").should("contain.text", "Edit guild")
    })

    it("can delete guild", () => {
      cy.get(".chakra-slide .chakra-button").first().click()
      cy.findByText("Delete").click()
      cy.confirmMetamaskSignatureRequest()
      cy.url().should("not.match", /[0-9a-z\-]+$/i)
    })
  })
})
