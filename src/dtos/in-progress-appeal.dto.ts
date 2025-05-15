import {IsNotEmpty, IsString, IsUUID, Length} from 'class-validator';

export class InProgressAppealDto {
    @IsUUID()
    @IsNotEmpty()
    id: string;
}
