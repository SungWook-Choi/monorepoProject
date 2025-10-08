import { Injectable } from '@nestjs/common';
import { join } from 'path';
import { randomUUID } from 'crypto';
import * as fs from 'node:fs';

@Injectable()
export class FilesService {
  private base = join(process.cwd(), 'uploads');

  async save(file: Express.Multer.File) {
    const id = randomUUID();
    const fileName = `${id}-${file.originalname}`;
    const fullFilePath = join(this.base, fileName);
    await fs.promises.mkdir(this.base, { recursive: true });
    await fs.promises.writeFile(fullFilePath, file.buffer);
    return { id, fileName };
  }
}
