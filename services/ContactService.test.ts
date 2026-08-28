import { describe, expect, it, vi } from "vitest";
import { ContactServiceImpl } from "./ContactServiceImpl";

describe("ContactServiceImpl", () => {
    it("trims the model before sending it to the repository", async () => {
        const repositoryMock = {
            sendMessage: vi.fn().mockResolvedValue({ success: true }),
        };
        const service = new ContactServiceImpl();
        (service as unknown as { contactRepository: typeof repositoryMock }).contactRepository = repositoryMock;

        const response = await service.sendMessage({
            name: " Ana ",
            email: " ana@example.com ",
            message: " Hola ",
        });

        expect(response).toEqual({ success: true });
        expect(repositoryMock.sendMessage).toHaveBeenCalledWith({
            name: "Ana",
            email: "ana@example.com",
            message: "Hola",
        });
    });

    it("rejects empty contact fields", async () => {
        const service = new ContactServiceImpl();

        await expect(
            service.sendMessage({
                name: " ",
                email: "ana@example.com",
                message: "Hola",
            })
        ).rejects.toThrow("Faltan campos requeridos.");
    });
});
