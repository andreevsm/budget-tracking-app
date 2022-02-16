import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountModule } from './account/account.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    AccountModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1q2w3e4r5t6y',
      database: 'budget',
      entities: [__dirname + '/entities/*.entity{.ts,.js}'],
      synchronize: false, // set false for production
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
