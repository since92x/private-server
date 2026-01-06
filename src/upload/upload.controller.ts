import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Body,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { UploadService } from './upload.service';
import { UploadVideoDto } from './upload.dto';

@ApiTags('upload')
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: { type: 'string', format: 'binary' },
        learnRecordId: { type: 'string' },
        sectionTaskId: { type: 'number' },
        taskSpeakerIndex: { type: 'number' },
        speakerRole: { type: 'number' },
        sliceIndex: { type: 'number' },
        sliceTotal: { type: 'number' },
        mediaType: { type: 'number' },
      },
    },
  })
  uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: Record<string, string | number>,
  ) {
    if (!file) {
      throw new Error('No file uploaded');
    }
    // 将表单字段转换为 DTO
    const uploadDto: UploadVideoDto = {
      learnRecordId: String(body.learnRecordId),
      sectionTaskId: Number(body.sectionTaskId),
      taskSpeakerIndex: Number(body.taskSpeakerIndex),
      speakerRole: Number(body.speakerRole),
      sliceIndex: Number(body.sliceIndex),
      sliceTotal: Number(body.sliceTotal),
      mediaType: Number(body.mediaType),
    };
    return this.uploadService.handleUpload(file, uploadDto);
  }
}
