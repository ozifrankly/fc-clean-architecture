import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for product", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("shoud create a product",async () => {
    const response = await request(app).post("/product")
                                .send({
                                  name: "John",
                                  price: 23.4
                                });
    expect(response.status).toBe(200);
    expect(response.body.name).toBe("John")
    expect(response.body.price).toBe(23.4)

  });

  it("shoud not create a product",async () => {
    const response = await request(app).post("/product").send({name: "John"});
    expect(response.status).toBe(500);
  });

  it("shoud list all products",async () => {
    let response = await request(app).post("/product").send({name: "product 1", price: 1.2});
    expect(response.status).toBe(200);
    response = await request(app).post("/product").send({name: "product 2", price: 2.4});
    expect(response.status).toBe(200);

    const listResponse = await request(app).get("/product").send();
    expect(listResponse.status).toBe(200);

    expect(listResponse.body.products[0].name).toBe("product 1");
    expect(listResponse.body.products[0].price).toBe(1.2);
    expect(listResponse.body.products[1].name).toBe("product 2");
    expect(listResponse.body.products[1].price).toBe(2.4);


  });
});
