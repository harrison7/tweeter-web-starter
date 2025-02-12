import { useNavigate } from "react-router-dom";
import { UserService } from "../../model/service/UserService";
import { AuthToken, User } from "tweeter-shared";

export interface loginView {
    displayErrorMessage: (message: string) => void;
    setIsLoading: (isLoading: boolean) => void;
    updateUserInfo: (
        currentUser: User,
        diplayedUser: User | null,
        authToken: AuthToken,
        rememberMe: boolean
    ) => void;
}

export class loginPresenter {
    private view: loginView;
    private userService: UserService;

    private navigate = useNavigate();

    public constructor(view: loginView) {
        this.view = view;
        this.userService = new UserService();
    } 

    public async doLogin(alias: string, password: string, rememberMe: boolean, originalUrl: string | undefined) {
        try {
          this.view.setIsLoading(true);
    
          const [user, authToken] = await this.userService.login(alias, password);
    
          this.view.updateUserInfo(user, user, authToken, rememberMe);
    
          if (!!originalUrl) {
            this.navigate(originalUrl);
          } else {
            this.navigate("/");
          }
        } catch (error) {
            this.view.displayErrorMessage(
            `Failed to log user in because of exception: ${error}`
          );
        } finally {
            this.view.setIsLoading(false);
        }
      };
}