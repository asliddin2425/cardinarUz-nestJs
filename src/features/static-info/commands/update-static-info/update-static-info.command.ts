// import { UpdateStaticInfoDto } from './update-static-info.dto';
// export class UpdateStaticInfoCommand { constructor(public readonly dto: UpdateStaticInfoDto) {} }

export class UpdateStaticInfoCommand {
  constructor(
    public readonly address?: string,
    public readonly phoneNumber?: string,
    public readonly workingHours?: string,
    public readonly email?: string,
  ) {}
}