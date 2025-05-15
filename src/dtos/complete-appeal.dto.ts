import {IsNotEmpty, IsString, IsUUID, Length} from 'class-validator';

export class CompleteAppealDto {
    @IsUUID()
    @IsNotEmpty()
    id: string;

    @IsString()
    @IsNotEmpty()
    @Length(10, 1000)
    responseText: string;
}
