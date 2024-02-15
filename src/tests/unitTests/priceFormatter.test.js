import { describe, it, expect } from "vitest";
import { formatPrice } from "../../utils/priceFormatter";

describe("test price formatter", () => {
  it("price should be format with $XX", () => {
    expect(formatPrice(15)).toBe("$15");
  });
});
