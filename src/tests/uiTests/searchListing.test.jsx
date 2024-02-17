/** Test detail for search listing
 * - test clicking product button
 * - test searching query
 * - test click add to cart
 * - test click see details
 * - test error page
 */
import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchListing from "../../components/routes/searchListing";

const mockData = [
  {
    id: 1,
    title: "test1",
    price: 10,
    category: "food",
    description: "lorem ipsum",
    image: "www.example.com",
  },
  {
    id: 30,
    title: "test2",
    price: 20,
    category: "toys",
    description: "lorem ipsum",
    image: "www.example.com",
  },
];
const mockedUsedNavigate = vi.fn();

vi.mock("react-router-dom", () => ({
  ...vi.importActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
  Link: () => vi.fn(),
}));

describe("verify items on product page", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it("fetch for data success", async () => {
    fetch.mockResponseOnce(JSON.stringify(mockData));

    const searchQuery = "";
    let itemsInCart = [];
    const setItemsInCart = (items) => {
      itemsInCart = [...items];
    };

    render(
      <SearchListing
        searchQuery={searchQuery}
        itemsInCart={itemsInCart}
        setItemsInCart={setItemsInCart}
      />
    );

    await waitFor(() => {
      const menuItems = screen.getAllByTestId("menu-item");
      expect(menuItems.length).toBe(2);
    });
  });

  it("fetch for data failed", async () => {
    fetch.mockRejectOnce(new Error("test error message"));

    const searchQuery = "";
    let itemsInCart = [];
    const setItemsInCart = (items) => {
      itemsInCart = [...items];
    };

    render(
      <SearchListing
        searchQuery={searchQuery}
        itemsInCart={itemsInCart}
        setItemsInCart={setItemsInCart}
      />
    );

    await waitFor(() => {
      const error = screen.getByTestId("error-page-message");
      expect(error.textContent).toContain("test error message");
    });
  });
});

describe("query items on product page", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it("query for item", async () => {
    fetch.mockResponseOnce(JSON.stringify(mockData));

    const searchQuery = mockData[0].title;
    let itemsInCart = [];
    const setItemsInCart = (items) => {
      itemsInCart = [...items];
    };

    render(
      <SearchListing
        searchQuery={searchQuery}
        itemsInCart={itemsInCart}
        setItemsInCart={setItemsInCart}
      />
    );

    await waitFor(() => {
      const menuItems = screen.getAllByTestId("menu-item");
      expect(menuItems.length).toBe(1);
    });
  });
});

describe("click buttons on product page", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it("click add to cart button", async () => {
    fetch.mockResponseOnce(JSON.stringify(mockData));
    const user = userEvent.setup();

    const searchQuery = "";
    let itemsInCart = [];
    const setItemsInCart = (items) => {
      itemsInCart = [...items];
    };

    render(
      <SearchListing
        searchQuery={searchQuery}
        itemsInCart={itemsInCart}
        setItemsInCart={setItemsInCart}
      />
    );

    await waitFor(() => {
      const menuItems = screen.getAllByTestId("menu-item");
      const button = within(menuItems[0]).getByTestId("add-to-cart-button");

      user.click(button);

      expect(itemsInCart.length).toBe(1);
    });
  });
});
