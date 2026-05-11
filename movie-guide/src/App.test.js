import { render, screen } from "@testing-library/react";
import SearchBar from "./components/SearchBar";

test("renders movie search input", () => {
  render(<SearchBar search="" setSearch={() => {}} />);
  expect(screen.getByPlaceholderText(/search movies/i)).toBeInTheDocument();
});
