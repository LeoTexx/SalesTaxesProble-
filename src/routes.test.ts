import { isImported, isException, standardizeString, getTaxes } from "./routes";

describe("Testing isImported() ", () => {
  it("Should return a boolean", () => {
    expect(isImported("1 pack of imported chocolates")).toBeTruthy();
    expect(isImported("5 boxes of toys")).toBeFalsy();
    expect(isImported("import jwt from jwt.client")).toBeFalsy();
  });
});

describe("Testing isException() ", () => {
  it("Should return a boolean", () => {
    expect(isException("1 glass of water")).toBeFalsy();
    expect(isException("5 boxes of chocolates")).toBeTruthy();
    expect(isException("A bag full of pills")).toBeTruthy();
    expect(isException("Just one pill")).toBeTruthy();
  });
});

describe("Testing standardizeString()", () => {
  it("Should return an array of strings", () => {
    expect(
      standardizeString(
        "2 book at 12.49 1 music CD at 14.99 1 chocolate bar at 0.85"
      )
    ).toEqual(
      expect.arrayContaining([expect.arrayContaining([expect.any(String)])])
    );
  });
});

describe("Testing getTaxes()", () => {
  it("Should return a string if the price paid per item, the total taxes paid and the total price", () => {
    expect(
      getTaxes("2 book at 12.49 1 music CD at 14.99 1 chocolate bar at 0.85")
    ).toEqual(expect.arrayContaining([expect.any(String)]));
  });
});
