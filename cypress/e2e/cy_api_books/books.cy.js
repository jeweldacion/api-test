import { faker } from "@faker-js/faker";

const baseUrl = "https://f4hatlr72b.execute-api.us-east-1.amazonaws.com/production";
const randomBookId = faker.datatype.uuid();
const randomAuthor = faker.name.fullName();
const randomTitle = faker.random.words();
let responseBookId, responseAuthor, responseTitle;

describe("Books", () => {
  beforeEach(() => {
    cy.request("POST", baseUrl + "/books", {
      title: randomTitle,
      author: randomAuthor,
      id: randomBookId
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
    cy.request(baseUrl + "/" + responseBookId).then((response) => {
      expect(response.status).to.eq(200);
      expect(responseTitle).to.equal(randomTitle);
      expect(responseAuthor).to.equal(randomAuthor);
      expect(responseBookId.length).to.equal(32);
    });
  });
});