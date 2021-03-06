import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";


///This Pipe Should handle the create object if all fields optional
@Injectable()
export class ValidateCreatePagePipe implements PipeTransform {
    transform(value: any, metatype: ArgumentMetadata) {
        if (!Object.keys(value).length) {
            throw new BadRequestException('Body should not be empty without one of these fields: title or description');
        }

        return value;
    }

}

