import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SingleDetailFilm from "../Components/SingleDetailFilm";

/* describe("render a different page when click a button", () => {
    it("checks if in detail single film after the fetch the button is loaded", async () => {
        render(<SingleDetailFilm />);

        const image = await screen.findByRole("img");
        expect(image).toBeInTheDocument();
    });
}); */
