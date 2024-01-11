import { fireEvent, render, screen } from "@testing-library/react";
import App from "../App";

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
});
