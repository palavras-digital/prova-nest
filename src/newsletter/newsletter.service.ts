import { Injectable } from '@nestjs/common';
import { Newsletter } from './newsletter.entity';

@Injectable()
export class NewsletterService {
  async findAll(): Promise<Newsletter[]> {
    const newsLetters: Newsletter[] = [
      {
        email: 'jose@gmail.com',
        id: 1,
        name: 'José',
      },
      {
        email: 'maria@gmail.com',
        id: 2,
        name: 'Maria',
      },
      {
        email: 'joao@gmail.com',
        id: 3,
        name: 'João',
      },
      {
        email: 'madalena@gmail.com',
        id: 4,
        name: 'Madalena',
      },
    ];

    return newsLetters;
  }
}
