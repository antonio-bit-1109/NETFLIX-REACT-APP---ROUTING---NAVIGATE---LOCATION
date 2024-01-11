import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import App from "../App";

import FilmsSection from "../Components/FilmsSection";

/* cartella contenente i test  */

describe("correct mounting of h1", () => {
    it("mount the h1 correctly", () => {
        render(<App />);

        const h1Prova = screen.getByText(/Sempre/i);

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

        expect(row).toBeEmptyDOMElement();
    });
});

describe("check if the img exist in the main page", () => {
    it("cheks if the img isnt existing at the beginning", () => {
        render(<FilmsSection />);
        const image = screen.queryByAltText("img-film");
        expect(image).not.toBeInTheDocument();
    });

    it("check if the botton exist on a card", async () => {
        render(<App />);

        const button = await screen.findAllByTestId("TEST-BUTTON");
        expect(button.length).toBeGreaterThan(4);
    });

    /*  it("checks what happens when the btn is clicked", () => {}); */
});
