import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for customer", () => {

    beforeEach(async () => {

        await sequelize.sync({force: true});
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it("should create a customer", async () => {
        const response = await request(app)
            .post("/customer")
            .send({
                name: "Customer",
                address: {
                    street: "Street 1",
                    city: "City 1",
                    number: 123,
                    zip: "12345",
                },
            });
        
        expect(response.status).toBe(200);
        expect(response.body.name).toBe("Customer");
        expect(response.body.address.street).toBe("Street 1");
        expect(response.body.address.city).toBe("City 1");
        expect(response.body.address.number).toBe(123);
        expect(response.body.address.zip).toBe("12345");

    });

    it("should not create a customer", async () => {
        const response = await request(app)
            .post("/customer")
            .send({
                name: "Bruno"
            });

            expect(response.status).toBe(500);
    })

    it("should list all customers in JSON format", async () => {
        const customerDto = {
            name: "Customer",
            address: {
                street: "Street 1",
                city: "City 1",
                number: 123,
                zip: "12345",
            },
        };
        const response = await request(app)
        .post("/customer")
        .send(customerDto);
    
        expect(response.status).toBe(200);

        const customerDto2 = {
            name: "Customer 2",
            address: {
                street: "Street 2",
                city: "City 2",
                number: 1234,
                zip: "123456",
            },
        };

        const response2 = await request(app)
        .post("/customer")
        .send(customerDto2);
    
        expect(response2.status).toBe(200);

        const listResponse = await request(app).get('/customer').send();
        expect(listResponse.status).toBe(200);
        expect(listResponse.body.customers.length).toBe(2);

        const customerResponse = listResponse.body.customers[0];
        const customerResponse2 = listResponse.body.customers[1];

        expect(customerDto.name).toBe(customerResponse.name);
        expect(customerDto.address.street).toBe(customerResponse.address.street);
        expect(customerDto.address.city).toBe(customerResponse.address.city);
        expect(customerDto.address.number).toBe(customerResponse.address.number);
        expect(customerDto.address.zip).toBe(customerResponse.address.zip);
        expect(customerDto2.name).toBe(customerResponse2.name);
        expect(customerDto2.address.street).toBe(customerResponse2.address.street);
        expect(customerDto2.address.city).toBe(customerResponse2.address.city);
        expect(customerDto2.address.number).toBe(customerResponse2.address.number);
        expect(customerDto2.address.zip).toBe(customerResponse2.address.zip);

    });
    
    it("should list all customers in XML format", async () => {
        const customerDto = {
            name: "Customer",
            address: {
                street: "Street 1",
                city: "City 1",
                number: 123,
                zip: "12345",
            },
        };
        const response = await request(app)
        .post("/customer")
        .send(customerDto);
    
        expect(response.status).toBe(200);

        const customerDto2 = {
            name: "Customer 2",
            address: {
                street: "Street 2",
                city: "City 2",
                number: 1234,
                zip: "123456",
            },
        };

        const response2 = await request(app)
            .post("/customer")
            .send(customerDto2);
    
        expect(response2.status).toBe(200);

        const listResponse = await request(app)
            .get('/customer')
            .set("Accept", "application/xml")
            .send();

        expect(listResponse.status).toBe(200);
        expect(listResponse.text).toContain(`<?xml version="1.0" encoding="UTF-8"?>`);
        expect(listResponse.text).toContain(`<customers>`);
        expect(listResponse.text).toContain(`<customer>`);
        expect(listResponse.text).toContain(`<name>Customer</name>`);
        expect(listResponse.text).toContain(`<address>`);
        expect(listResponse.text).toContain(`<street>Street 1</street>`);
        expect(listResponse.text).toContain(`<city>City 1</city>`);
        expect(listResponse.text).toContain(`<number>123</number>`);
        expect(listResponse.text).toContain(`<zip>12345</zip>`);
        expect(listResponse.text).toContain(`</address>`);
        expect(listResponse.text).toContain(`</customer>`);
        expect(listResponse.text).toContain(`<customer>`);
        expect(listResponse.text).toContain(`<name>Customer 2</name>`);
        expect(listResponse.text).toContain(`<address>`);
        expect(listResponse.text).toContain(`<street>Street 2</street>`);
        expect(listResponse.text).toContain(`<city>City 2</city>`);
        expect(listResponse.text).toContain(`<number>1234</number>`);
        expect(listResponse.text).toContain(`<zip>123456</zip>`);
        expect(listResponse.text).toContain(`</address>`);
        expect(listResponse.text).toContain(`</customer>`);
        expect(listResponse.text).toContain(`</customers>`);

    });
});