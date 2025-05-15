import {IsNotEmpty, IsString, Length} from 'class-validator';

export class CreateAppealDto {
    @IsString()
    @IsNotEmpty()
    @Length(3, 100)
    subject: string;

    @IsString()
    @IsNotEmpty()
    @Length(10, 1000)
    description: string;
}
