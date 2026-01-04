import { Controller } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller()
export class AuthController {
  public constructor(private readonly authService: AuthService) {}
}
