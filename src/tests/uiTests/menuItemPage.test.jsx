/** Test details for menu detail page
 * - verify data on page
 * - test add to cart
 * - test back button
 * - test error page
 */

import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { formatPrice } from "../../utils/priceFormatter";
import MenuItemPage from "../../components/routes/menuItemPage";
import { useNavigate } from "react-router-dom";

const mockError = new Error("test error");
const mockData = {
  id: 1,
  title: "test1",
  price: 10,
  category: "food",
  description: "lorem ipsum",
  image: "www.example.com",
};

const mockedUsedNavigate = vi.fn();
vi.mock("react-router-dom", () => ({
  ...vi.importActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
  Link: () => vi.fn(),
  useParams: () => vi.fn(),
}));

describe("verify data on page", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it("fetch success", async () => {
    fetch.mockResponseOnce(JSON.stringify(mockData));

    let itemsInCart = [];
    const setItemsInCart = (items) => {
      itemsInCart = [...items];
    };

    render(
      <MenuItemPage itemsInCart={itemsInCart} setItemsInCart={setItemsInCart} />
    );

    await waitFor(() => {
      const title = screen.getByTestId("item-title");
      const category = screen.getByTestId("item-category");
      const price = screen.getByTestId("item-price");
      const description = screen.getByTestId("item-description");
      const image = screen.getByTestId("item-image");
      const addToCartButton = screen.getByTestId("item-add-to-cart-button");
      const backButton = screen.getByTestId("item-back-button");

      expect(title.textContent).toBe(mockData.title);
      expect(category.textContent).toBe(mockData.category);
      expect(price.textContent).toBe(formatPrice(mockData.price));
      expect(description.textContent).toBe(mockData.description);
      expect(image.src).toContain(mockData.image);
      expect(addToCartButton).toBeDefined();
      expect(backButton).toBeDefined();
    });
  });
  it("fetch error", async () => {
    fetch.mockRejectOnce(new Error("test error message"));

    let itemsInCart = [];
    const setItemsInCart = (items) => {
      itemsInCart = [...items];
    };

    render(
      <MenuItemPage itemsInCart={itemsInCart} setItemsInCart={setItemsInCart} />
    );

    await waitFor(() => {
      const error = screen.getByTestId("error-page-message");
      expect(error.textContent).toContain("test error message");
    });
  });
});

describe("click actions on page", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it("click add to cart button", async () => {
    fetch.mockResponseOnce(JSON.stringify(mockData));
    const user = userEvent.setup();

    let itemsInCart = [];
    const setItemsInCart = (items) => {
      itemsInCart = [...items];
    };

    render(
      <MenuItemPage itemsInCart={itemsInCart} setItemsInCart={setItemsInCart} />
    );

    await waitFor(() => {
      const addToCartButton = screen.getByTestId("item-add-to-cart-button");

      user.click(addToCartButton);

      expect(itemsInCart.length).toBe(1);
    });
  });
  it("click back button", async () => {
    fetch.mockResponseOnce(JSON.stringify(mockData));
    const user = userEvent.setup();

    let itemsInCart = [];
    const setItemsInCart = (items) => {
      itemsInCart = [...items];
    };

    render(
      <MenuItemPage itemsInCart={itemsInCart} setItemsInCart={setItemsInCart} />
    );

    await waitFor(() => {
      const backButton = screen.getByTestId("item-back-button");

      user.click(backButton);

      expect(mockedUsedNavigate).toBeCalled();
    });
  });
});
