import { UpdateBannerDto } from './update-banner.dto';
export class UpdateBannerCommand { constructor(public readonly id: number, public readonly dto: UpdateBannerDto) {} }
