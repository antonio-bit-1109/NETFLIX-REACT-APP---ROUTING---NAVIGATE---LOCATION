import { fireEvent, render, screen } from "@testing-library/react";
import App from "../App";

import FilmsSection from "../Components/FilmsSection";

/* cartella contenente i test  */

describe("correct mounting of h1", () => {
    it("mount the h1 correctly", () => {
        /* ub quale componente si trova l'elemento da testare? */
        render(<App />);

        /* lo acchiappo dal virtual DOM */
        const h1Prova = screen.getByText(/Sempre/i);

        /* cosa mi aspetto ?? */
        expect(h1Prova).toBeInTheDocument();
    });

    it("check if route exist", () => {
        render(<App />);

        const element = screen.getByTestId("ELEMENT-TEST");

        expect(element).toBeInTheDocument();
    });
});

describe("check if all the films are correctly rendered", () => {
    it("checks if is the row existing and initially empty ", () => {
        render(<FilmsSection />);

        const row = screen.getByTestId("ROW-ID");

        expect(row).toBeInTheDocument();
        expect(row).toBeEmpty();
    });
});

describe("check if the img exist in the main page", () => {
    it("cheks if the img isnt existing at the beginning", () => {
        render(<FilmsSection />);

        const image = screen.queryByAltText("img-film");

        expect(image).not.toBeInTheDocument();
    });

    it("check if the img is visible on the screen", async () => {
        render(<FilmsSection />);
        const images = await screen.findAllByTestId("IMG-TEST");

        expect(images.length > 0).toBeTruthy();
    });
});
