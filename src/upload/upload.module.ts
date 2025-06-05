import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';

@Module({
  imports: [
    ConfigModule,
    MulterModule.register({
      storage: undefined, // 使用内存存储
    }),
  ],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
