import { CalculateEmployeeSalaryInput, calculateEmployeeSalary } from "../src/calculateEmployeeSalary";

describe("Testando o calculateEmployeeSalary", ()=>{
   
    test("Deve retornar erro ao não receber valores preenchidos", ()=>{
        expect.assertions(2);
        const validatorMock = jest.fn(()=>{return {isValid: false}});
        try {
    
            const input: CalculateEmployeeSalaryInput =  {
                employeeName: "João",
                baseSalary: 20000,
                benefits: [400, 500],
                extraHours: 1100,
              }
    
            

              const result = calculateEmployeeSalary(input, validatorMock as any);
    
        } catch (error) {
            //expects
            expect(error.message).toBe("Missing Properties");
            expect(validatorMock).toHaveBeenCalled();
        }
    });

    test("Deve retornar erro ao receber salário base negativo", ()=>{
        expect.assertions(3);
        const validatorMock = jest.fn(()=>{return {isValid: true}});

        const input: CalculateEmployeeSalaryInput =  {
            employeeName: "João",
            baseSalary: -500,
            benefits: [100],
            extraHours: 1100,
        }

        try{
            
            const result = calculateEmployeeSalary(input, validatorMock as any);

        }catch(error){
            expect(error.message).toEqual("Invalid BaseSalary");
            expect(validatorMock).toHaveBeenCalledTimes(1);
            expect(validatorMock).toHaveBeenCalledWith(input);
        }
    });

    test("Deve retornar erro ao receber benefício inválido (negativo)", ()=>{
        expect.assertions(4);
        const validatorMock = jest.fn(()=>{return {isValid: true}});
        try{
            const input: CalculateEmployeeSalaryInput =  {
                employeeName: "João",
                baseSalary: 20000,
                benefits: [-200],
                extraHours: 1100,
            }
            
            
            
            const result = calculateEmployeeSalary(input, validatorMock as any);

        }catch(error){
            expect(error.message).toEqual("Invalid Benefit");
            expect(validatorMock).toHaveReturned();
            expect(validatorMock).toHaveReturnedTimes(1);
            expect(validatorMock).toHaveReturnedWith({isValid: true});
        }
    });

    test("Deve retornar cálculo efetuado ao passar valores corretos", ()=>{

        const input: CalculateEmployeeSalaryInput =  {
            employeeName: "João",
            baseSalary: 20000,
            benefits: [200, 700],
            extraHours: 1100,
        }
        const validatorMock = jest.fn(()=>{return {isValid: true}});

        const result = calculateEmployeeSalary(input, validatorMock as any);

        expect(result).toBe(22000);

    });


});