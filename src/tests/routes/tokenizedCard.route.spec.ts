import request from "supertest";
import app from "../../app";

describe("POST /generateToken", () => {
  const validBody = {
    card_number: 2334434322134421,
    cvv: 2213,
    expiration_month: "12",
    expiration_year: "2027",
    email: "correo4@hotmail.com",
  };

  const noValidBody = {
    card_number: 2334434322134421,
    cvv: 22131,
    expiration_month: "12",
    expiration_year: "2027",
    email: "correo4@hotmail.com",
  };

  test("should respond with a status code 400 when Authorization header does not exist", async () => {
    const response = await request(app).post("/generateToken");
    expect(response.statusCode).toBe(400);
  });

  test("should respond with a status code 401 when Authorization header does not start with pk_test_", async () => {
    const response = await request(app).post("/generateToken").set({
      Authorization: "ak_test_jsFFS3Do9wnfEfsr",
      Accept: "application/json",
    });
    expect(response.statusCode).toBe(401);
  });

  test("should respond with a status code 201 when Authorization header exists but body is not valid", async () => {
    const response = await request(app)
      .post("/generateToken")
      .set({
        Authorization: "pk_test_jsFFS3Do9wnfEfsr",
        Accept: "application/json",
      })
      .send(noValidBody);
    expect(response.statusCode).toBe(403);
  });

  test("should respond with a status code 201 when Authorization header and body are good", async () => {
    const response = await request(app)
      .post("/generateToken")
      .set({
        Authorization: "pk_test_jsFFS3Do9wnfEfsr",
        Accept: "application/json",
      })
      .send(validBody);
    expect(response.statusCode).toBe(201);
  });

  test("should respond with a 16 characters alphanumeric token and status code 201", async () => {
    const response = await request(app)
      .post("/generateToken")
      .set({
        Authorization: "pk_test_jsFFS3Do9wnfEfsr",
        Accept: "application/json",
      })
      .send(validBody);
    expect(response.statusCode).toBe(201);
    expect(response.body.token).toBeDefined();
    expect(response.body.token).toMatch(/^[a-zA-Z0-9]{16}$/);
  });
});

describe("GET /getCard", () => {
  test("should respond with a status code 400 and AUTHORIZATION_HEADER_MISSING error when Authorization header does not exist", async () => {
    const response = await request(app).get("/getCard");
    expect(response.statusCode).toBe(400);
    expect(JSON.parse(response.text).error).toBe(
      "AUTHORIZATION_HEADER_MISSING"
    );
  });

  test("should respond with a status code 400 and INVALID_TOKEN_FORMAT error when Authorization header exists but is not valid", async () => {
    const response = await request(app).get("/getCard").set({
      Authorization: "nd0df3Ef",
      Accept: "application/json",
    });
    expect(response.statusCode).toBe(400);
    expect(JSON.parse(response.text).error).toBe("INVALID_TOKEN_FORMAT");
  });

  test("should respond with a status code 404 and CARD_NOT_FOUND error when Authorization header is valid but is not found in db", async () => {
    const response = await request(app).get("/getCard").set({
      Authorization: "nd0df3Ef4G21gl6s",
      Accept: "application/json",
    });
    expect(response.statusCode).toBe(404);
    expect(JSON.parse(response.text).error).toBe("CARD_NOT_FOUND");
  });

  test("should respond with a status code 401 and TOKEN_EXPIRED error when Authorization header is valid, exists in db but is expired", async () => {
    const response = await request(app).get("/getCard").set({
      Authorization: "64d8DD14D9D74AA4",
      Accept: "application/json",
    });
    expect(response.statusCode).toBe(401);
    expect(JSON.parse(response.text).error).toBe("TOKEN_EXPIRED");
  });

  //Paste a fresh token authorization
  test("should respond with a status code 200 and Object response when Authorization header is valid, exists in db and token is not expired", async () => {
    const response = await request(app).get("/getCard").set({
      Authorization: "0705c56a47c6411b",
      Accept: "application/json",
    });
    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.text).card_number).toBeDefined();
    expect(JSON.parse(response.text).expiration_month).toBeDefined();
    expect(JSON.parse(response.text).expiration_year).toBeDefined();
    expect(JSON.parse(response.text).email).toBeDefined();
    expect(JSON.parse(response.text).createdAt).toBeDefined();
  });
});
