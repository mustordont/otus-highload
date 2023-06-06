import { Controller, Get, HttpStatus } from '@nestjs/common';
import { name, version } from '../package.json';
import { ApiOperation, ApiProperty, ApiResponse } from '@nestjs/swagger';

class AppInfo {
    @ApiProperty()
    name: string;
    @ApiProperty()
    version: string;
}

@Controller()
export class AppController {
    @ApiOperation({ summary: 'Service version' })
    @ApiResponse({
        status: HttpStatus.OK,
        type: AppInfo,
    })
    @Get('version')
    public root(): AppInfo {
        return {
            name,
            version,
        };
    }
}
