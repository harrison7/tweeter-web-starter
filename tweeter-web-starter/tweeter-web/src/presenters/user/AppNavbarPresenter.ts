import { AuthToken } from "tweeter-shared";
import { UserService } from "../../model/service/UserService";

export interface AppNavbarView {
    displayInfoMessage: (message: string, duration: number) => void;
    displayErrorMessage: (message: string) => void;
    clearLastInfoMessage: () => void;
    clearUserInfo: () => void;
}

export class AppNavbarPresenter {
    private userService: UserService;
    private view: AppNavbarView;

    public constructor(view: AppNavbarView) {
        this.userService = new UserService();
        this.view = view;
    }

    public async logOut(authToken: AuthToken) {
        this.view.displayInfoMessage("Logging Out...", 0);
    
        try {
          await this.logout(authToken);
    
          this.view.clearLastInfoMessage();
          this.view.clearUserInfo();
        } catch (error) {
            this.view.displayErrorMessage(
            `Failed to log user out because of exception: ${error}`
          );
        }
      };
    
      public async logout(authToken: AuthToken): Promise<void> {
        // Pause so we can see the logging out message. Delete when the call to the server is implemented.
        await new Promise((res) => setTimeout(res, 1000));
      };
}