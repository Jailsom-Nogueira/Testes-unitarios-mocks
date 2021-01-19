import { ValidateEmptyPropertiesOutput } from "./validateEmptyProperties";
import { calculateEmployeeSalary } from "./calculateEmployeeSalary";

const employee = {
    employeeName: "Astrodev",
    baseSalary: 20000,
    benefits: [400, 500],
    extraHours: 1100,
  }

const fakeValidator = jest.fn((input: any): ValidateEmptyPropertiesOutput => {
    return {isValid: true, errors: []}
})

calculateEmployeeSalary(
    employee,
    fakeValidator
  );