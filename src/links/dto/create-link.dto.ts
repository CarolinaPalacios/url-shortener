import { IsNotEmpty, IsUrl } from 'class-validator';

export class CreateLinkDto {
  @IsNotEmpty()
  name: string;

  @IsUrl()
  @IsNotEmpty()
  url: string;
}
