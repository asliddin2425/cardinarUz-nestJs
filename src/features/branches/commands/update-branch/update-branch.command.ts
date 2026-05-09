import { UpdateBranchDto } from './update-branch.dto';
export class UpdateBranchCommand { constructor(public readonly id: number, public readonly dto: UpdateBranchDto) {} }
