import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CreatureModule } from './creature/creature.module';

@Module({
  imports: [CreatureModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
