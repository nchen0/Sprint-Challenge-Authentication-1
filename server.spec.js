const request = require("supertest");
const server = require("./index.js");
const db = require("./database/dbConfig");

// beforeEach(async () => {
//   await db.raw("SET foreign_key_checks = 0");
//   await db("users").truncate();
//   await db.raw("SET foreign_key_checks = 1");
// });

describe("auth.js", () => {
  it("should return an OK status code from the auth route", () => {
    const expectedStatusCode = 200;
    return request(server)
      .get("/users")
      .then(response => {
        expect(response.status).toEqual(expectedStatusCode);
      });
  });

  it("should return a JSON object from the auth route", () => {
    const expectedBody = [];
    return request(server)
      .get("/users")
      .then(response => {
        expect(response.body).toEqual(expectedBody);
      });
  });

  it("should return a JSON object from the auth route", () => {
    return request(server)
      .get("/users")
      .then(response => {
        expect(response.type).toEqual("application/json");
      });
  });
});
