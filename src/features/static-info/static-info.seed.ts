import { DataSource } from 'typeorm';
import { StaticInfo } from './static-info.entity';

export async function seedStaticInfo(dataSource: DataSource): Promise<void> {
  const repo = dataSource.getRepository(StaticInfo);

  const exists = await repo.findOne({ where: { id: 1 } });
  if (exists) {
    console.log('[Seed] StaticInfo already seeded, skipping.');
    return;
  }

  await repo.insert({
    id:           1,
    address:      'Toshkent, Chilonzor tumani, 3-mavze',
    phoneNumber:  '+998901234567',
    workingHours: 'Dushanba-Shanba: 09:00-18:00',
    email:        'info@company.uz',
  });

  console.log('[Seed] StaticInfo singleton created.');
}