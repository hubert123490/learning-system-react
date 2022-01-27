import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import StartingPage from "../../components/StartingPage/StartingPage";
import { act } from "react-dom/test-utils";

describe("StartingPage tests", () => {
  test("renders StartingPage", async () => {
    // Arrange
    const fakeCourse = {
      id: "1",
      name: "fake course",
      category: "fake category",
      person: {
        id: "1",
        firstName: "Jan",
        lastName: "Kowalski",
        title: "Bachelor",
      },
    };
    window.fetch = jest.fn();
    window.fetch.mockResolvedValueOnce({
      json: async () => fakeCourse
    })

   
    // Act
    await act(async () => {
      render(<BrowserRouter><StartingPage /></BrowserRouter>);
    });
   
    // Assert
    const filterButton = await screen.findByRole('button', { name :'Zamknji filter'})
    expect(filterButton).toBeEnabled();
  });
});
