import { UpdateMaterialDto } from './update-material.dto';
export class UpdateMaterialCommand { constructor(public readonly id: number, public readonly dto: UpdateMaterialDto) {} }
