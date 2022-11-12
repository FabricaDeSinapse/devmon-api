import { Controller, Get, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

@Controller()
@ApiTags('status')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({
    summary: 'Status da aplicação',
  })
  getAppStatus(@Req() req: Request) {
    const fullUrl = req.protocol + '://' + req.get('host'); // http://localhost:3333
    return this.appService.getAppStatus(fullUrl);
  }
}
