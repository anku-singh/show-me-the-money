const request = require("supertest");
const express = require("express");
const sheetRoutes = require("../routes/sheetRoutes");
const axios = require("axios");

jest.mock("axios");

const app = express();
app.use("/api/v1/sheet", sheetRoutes);

describe("GET /api/v1/sheet/balance-sheet", () => {
  it("should return balance sheet data", async () => {
    const mockData = { BalanceSheet: { Assets: [], Liabilities: [] } };
    axios.get.mockResolvedValue({ data: mockData });

    const response = await request(app).get("/api/v1/sheet/balance-sheet");
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockData);
  });

  it("should return 500 for an error", async () => {
    axios.get.mockRejectedValue(new Error("Error fetching"));

    const response = await request(app).get("/api/v1/sheet/balance-sheet");
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ message: "Error fetching balance sheet" });
  });
});
