import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { AccountController } from "./account.controller";
import { AccountRepository } from "./account.repository";

@Module({
  imports: [CqrsModule],
  controllers: [AccountController],
  providers: [AccountRepository]
})
export class AccountModule {}
