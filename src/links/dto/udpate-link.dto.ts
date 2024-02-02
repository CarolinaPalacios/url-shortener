import { IsNotEmpty, IsUrl } from 'class-validator';

export class UpdateLinkDto {
  @IsNotEmpty()
  name: string;

  @IsUrl()
  @IsNotEmpty()
  url: string;
}
