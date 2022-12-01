import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for product", () => {

    beforeEach(async () => {

        await sequelize.sync({force: true});
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it("should create a product", async () => {
        const response = await request(app)
            .post("/product")
            .send({
                name: "Whey",
                price: 99,
            });

        expect(response.status).toBe(200);
        expect(response.body.name).toBe("Whey");
        expect(response.body.price).toBe(99);
    });

    it("should not create a product", async () => {
        const response = await request(app)
            .post("/product")
            .send({
                name: "Whey"
            });

        expect(response.status).toBe(500);

    });

    it("should list all products", async () => {
        const response = await request(app)
            .post("/product")
            .send({
                name: "Whey",
                price: 99,
            });

        expect(response.status).toBe(200);

        const response2 = await request(app)
            .post("/product")
            .send({
                name: "Whey Isolado",
                price: 110,
            });

        expect(response2.status).toBe(200);

        const responseProducts = await request(app)
            .get("/product")
            .send();

        expect(responseProducts.status).toBe(200);
        expect(responseProducts.body.products[0].name).toBe("Whey");
        expect(responseProducts.body.products[0].price).toBe(99);
        expect(responseProducts.body.products[1].name).toBe("Whey Isolado");
        expect(responseProducts.body.products[1].price).toBe(110);
        
    });

});