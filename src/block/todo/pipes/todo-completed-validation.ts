import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments, ValidationOptions, registerDecorator } from 'class-validator';

/**
 * this code should handle true or false else error
 * */
@ValidatorConstraint({ name: 'IsCompleted', async: false })
export class IsCompletedConstraint implements ValidatorConstraintInterface {
  
  validate(value: string, args: ValidationArguments) {
    return value.toLowerCase() === 'true' || value.toLowerCase() === 'false'; 
  }

  defaultMessage(args: ValidationArguments) {
    // here you can provide default error message if validation failed
    return '($value) is not boolean values true or false !';
  }

}

/**
 * this code should handle true or false else error
 * */
export function IsCompleted(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsCompletedConstraint,
    });
  };
}