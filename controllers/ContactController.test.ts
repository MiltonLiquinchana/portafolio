import { describe, expect, it, vi } from "vitest";
import { ContactController } from "./ContactController";

describe("ContactController", () => {
    it("delegates valid messages to the service", async () => {
        const controller = new ContactController(vi.fn());

        // Mock del servicio interno o inyectado
        const serviceMock = {
            sendMessage: vi.fn().mockResolvedValue({ success: true }),
        };
        (controller as unknown as { service: typeof serviceMock }).service = serviceMock;

        const response = await controller.sendMessage({
            name: "Ana",
            email: "ana@example.com",
            message: "Hola",
        });

        expect(response).toEqual({ success: true });
        expect(serviceMock.sendMessage).toHaveBeenCalledOnce();
    });

    it("rethrows service errors after registering them", async () => {
        const error = new Error("Falló el servicio");
        const onError = vi.fn();
        const controller = new ContactController(onError);

        const serviceMock = { sendMessage: vi.fn().mockRejectedValue(error) };
        (controller as unknown as { service: typeof serviceMock }).service = serviceMock;

        await expect(
            controller.sendMessage({ name: "Ana", email: "ana@example.com", message: "Hola" })
        ).rejects.toThrow(error);
        expect(onError).toHaveBeenCalledWith(
            "No se pudo completar la operación. Intenta nuevamente."
        );
    });
});
