import {IsDate, IsNotEmpty, IsOptional, IsString, IsUUID, Length} from 'class-validator';

export class ListAppealDto {
    @IsDate()
    @IsOptional()
    date?: Date;

    @IsDate()
    @IsOptional()
    from?: Date;

    @IsDate()
    @IsOptional()
    to?: Date;
}
