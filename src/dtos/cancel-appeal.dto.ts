import {IsNotEmpty, IsString, IsUUID, Length} from 'class-validator';

export class CancelAppealDto {
    @IsUUID()
    @IsNotEmpty()
    id: string;

    @IsString()
    @IsNotEmpty()
    @Length(10, 1000)
    cancellationReason: string;
}
