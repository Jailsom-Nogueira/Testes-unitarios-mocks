import { validateEmptyProperties } from "../src/validateEmptyProperties";

describe("Testando a validateEmptyProperties", ()=>{

    test("Deve retornar erro ao receber string vazia", ()=>{
        expect.assertions(2);
        const input = {
            name: ""
        };

        const output = validateEmptyProperties(input);

        expect(output.isValid).toBe(false);
        expect(output.errors).toContainEqual({key: "name", value: ""});
    });

    test("Deve retornar erro ao receber número 0", ()=>{
        expect.assertions(3);
        const input = {
            name: "João",
            age: 0
        }

        const output = validateEmptyProperties(input);

        expect(output.isValid).toBe(false);
        expect(output.errors.length).toBe(1);
        expect(output.errors).toContainEqual({key: "age", value: 0});
    });

    test("Deve retornar um erro caso receba valor undefined", ()=>{

        const input = {
            name: "João",
            age: 23,
            username: undefined
        }

        const output = validateEmptyProperties(input);

        expect(output.isValid).not.toBe(true);
        expect(output.errors.length).toBeLessThanOrEqual(1);
        expect(output.errors[0].key).toEqual("username");
    });

    test("Deve retornar um erro caso receba um valor null", ()=>{

        const input = {
            name: "João",
            username: null
        }

        const output = validateEmptyProperties(input);

        expect(output.isValid).toBe(false);
        expect(output.errors.length).toBeGreaterThan(0);
        expect(output.errors[0].value).toBe(null);
    });

    test("Deve retornar erros para propriedades erradas, mesmo com valor certo junto", ()=>{

        const input ={
            name: "João",
            age: 0,
            username: undefined,
            email: null,
            role: ""
        }

        const output = validateEmptyProperties(input);

        expect(output.isValid).toBe(false);
        expect(output.errors.length).toBe(4);
        expect(output.errors).toContainEqual({key: "age", value: 0});
        expect(output.errors).toContainEqual({key: "username", value: undefined});

    });

    test("Deve retornar sucesso caso os valores sejam válidos", ()=>{

        const input = {
            name: "João",
            age: 23,
            username: "joao",
            email: "joao@email.com",
            role: "NORMAL"
        }

        const output = validateEmptyProperties(input);

        expect(output.isValid).toBe(true);
        expect(output.errors.length).toBe(0);
    })

});