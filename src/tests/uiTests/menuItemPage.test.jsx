/** Test details for menu detail page
 * - verify data on page
 * - test add to cart
 * - test back button
 * - test error page
 */

import { describe, it, expect, beforeEach } from "vitest";
import { render } from "@testing-library/react";

const mockError = new Error("test error");
const mockData = {
  id: 1,
  title: "test1",
  price: "10",
  category: "food",
  description: "lorem ipsum",
  image: "www.example.com",
};
