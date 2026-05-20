import { UpdateColorDto } from './update-color.dto';
export class UpdateColorCommand { 
    constructor(
        public readonly id: number, public readonly dto: UpdateColorDto) {} }
