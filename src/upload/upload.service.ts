import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import * as path from 'path';
import { UploadVideoDto } from './upload.dto';

@Injectable()
export class UploadService {
  constructor(private configService: ConfigService) {}

  handleUpload(file: Express.Multer.File, uploadDto: UploadVideoDto) {
    try {
      // 确保上传根目录存在
      const uploadDir = path.join(process.cwd(), 'uploads');
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      // 创建一级目录：recordId
      const recordDir = path.join(uploadDir, uploadDto.learnRecordId);
      if (!fs.existsSync(recordDir)) {
        fs.mkdirSync(recordDir, { recursive: true });
      }

      // 创建二级目录：taskId
      const taskDir = path.join(recordDir, String(uploadDto.sectionTaskId));
      if (!fs.existsSync(taskDir)) {
        fs.mkdirSync(taskDir, { recursive: true });
      }

      // 处理中文文件名乱码：从 latin1 转换为 utf8
      const decodedFileName = Buffer.from(file.originalname, 'latin1').toString(
        'utf8',
      );

      // 获取文件扩展名
      const ext = path.extname(decodedFileName);

      // 生成文件名：taskSpeakerIndex_speakerRole_sliceIndex_sliceTotal
      const fileName = `${uploadDto.taskSpeakerIndex}_${uploadDto.speakerRole}_${uploadDto.sliceIndex}_${uploadDto.sliceTotal}${ext}`;
      const filePath = path.join(taskDir, fileName);

      // 保存文件
      fs.writeFileSync(filePath, file.buffer);

      return {
        code: 0,
        data: {
          success: true,
          fileUrl: filePath,
          fileName: fileName,
          filePath: filePath,
        },
        msg: '文件上传成功',
      };
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : '未知错误';
      return {
        code: 1,
        data: {},
        msg: `文件上传失败: ${errorMessage}`,
      };
    }
  }
}
