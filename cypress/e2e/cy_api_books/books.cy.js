import { faker } from "@faker-js/faker";

const randomBookId = faker.datatype.uuid();
const randomAuthor = faker.name.fullName();
const randomTitle = faker.random.words();
const newRandomTitle = faker.random.words();
let responseBookId, responseAuthor, responseTitle;

describe("Books", () => {
  beforeEach(() => {
    cy.request("POST", "/" + "/books", {
      title: randomTitle,
      author: randomAuthor,
      id: randomBookId,
    }).then((response) => {
      responseBookId = response.body.id;
      responseAuthor = response.body.author;
      responseTitle = response.body.title;
      expect(response.status).to.eq(201);
    });
  });

  it("Shoould create a book", () => {
      expect(responseTitle).to.equal(randomTitle);
      expect(responseAuthor).to.equal(randomAuthor);
      expect(responseBookId.length).to.equal(32);
  });

  it("Should get a books", () => {
    cy.request("/" + `/${responseBookId}`).then((response) => {
      expect(response.status).to.eq(200);
      expect(responseTitle).to.equal(randomTitle);
      expect(responseAuthor).to.equal(randomAuthor);
      expect(responseBookId.length).to.equal(32);
    });
  });

  it("Should get all books", () => {
    cy.request("GET", "/" + "/books").then((response) => {
      expect(response.status).to.eq(200);

      response.body.body.forEach((book) => {
        expect(book.id.length).to.equal(32);
        expect(book.title.length).to.be.gt(0);
        expect(book.author.length).to.be.gt(0);
      });
    });
  });

  it("Should update a book", () => {
    cy.request("PUT", "/" + `${responseBookId}`, {
      title: newRandomTitle,
      author: randomAuthor,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.title).to.equal(newRandomTitle);
      expect(responseAuthor).to.equal(randomAuthor);
      expect(responseBookId.length).to.equal(32);
    });
  });

  it("Should delete a book", () => {
    cy.request("DELETE", "/" + `${responseBookId}`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.message).to.equal("Book was removed successfully");
    });
  });
});