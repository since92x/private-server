import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class UploadService {
  constructor(private configService: ConfigService) {}

  handleUpload(file: Express.Multer.File) {
    try {
      // 确保上传目录存在
      const uploadDir = path.join(process.cwd(), 'uploads');
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      // 处理中文文件名乱码：从 latin1 转换为 utf8
      const decodedFileName = Buffer.from(file.originalname, 'latin1').toString(
        'utf8',
      );

      // 生成文件名
      const fileName = `${Date.now()}-${decodedFileName}`;
      const filePath = path.join(uploadDir, fileName);

      // 保存文件
      fs.writeFileSync(filePath, file.buffer);

      return {
        code: 100200,
        data: {
          fileUrl: 'https://p.gsxcdn.com/3297217710_w9ns3jjx.xlsx',
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
