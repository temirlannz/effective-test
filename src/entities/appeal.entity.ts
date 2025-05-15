import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn, UpdateDateColumn,
} from "typeorm";
import { AppealStatusEnum } from "../enums/appeal-status.enum";

@Entity()
export class Appeal {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    subject: string;

    @Column()
    description: string;

    @Column({ type: 'enum', enum: AppealStatusEnum, default: AppealStatusEnum.NEW })
    status: AppealStatusEnum;

    @Column({ nullable: true })
    response_text?: string;

    @Column({ nullable: true })
    cancellation_reason?: string;

    @CreateDateColumn({
        name: 'created_at',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
    })
    created_at: Date

    @UpdateDateColumn({
        name: 'updated_at',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
        onUpdate: 'CURRENT_TIMESTAMP(6)',
    })
    updated_at: Date
}
