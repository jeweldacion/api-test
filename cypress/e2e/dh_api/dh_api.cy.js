import { faker } from "@faker-js/faker";

describe("Books", () => {
  beforeEach(() => {

    it("Should create a user", () => {
        const radomUserName = faker.name.datatype.string();
        const randomEmail = faker.internet.email();

        cy.request("POST", "https://qa.delekhomes.com/api/users/login", { 
            email:randomEmail,
            password:"JewelD18!" 
          })
          .then((response) => {
            cy.log(response.body)
          });
    
        });
    });
});