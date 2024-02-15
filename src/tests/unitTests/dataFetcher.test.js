import { useDataFetching } from "../../utils/dataFetcher";
import { renderHook, waitFor } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";

describe("test data fetching hook", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });
  it("fetch success", async () => {
    fetch.mockResponseOnce(JSON.stringify({ value: "12345" }));

    const { result } = renderHook(() => useDataFetching("https://example.com"));
    await waitFor(() => {
      expect(result.current.data.value).toBe("12345");
      expect(result.current.error).toBeNull();
      expect(result.current.loading).toBeFalsy();
    });
  });

  it("fetch failed", async () => {
    fetch.mockRejectOnce(new Error("error message"));

    const { result } = renderHook(() => useDataFetching("https://example.com"));
    await waitFor(() => {
      expect(result.current.error.message).toBe("error message");
      expect(result.current.loading).toBeFalsy();
      expect(result.current.data).toBeNull();
    });
  });
});
