import { AuthToken, User } from "tweeter-shared";
import { UserService } from "../../model/service/UserService";

export interface UserView {
    setUserIsFollower: (isFollower: boolean) => void;
    setUserFolloweeCount: (followeeCount: number) => void;
    setUserFollowerCount: (followerCount: number) => void;
    setUserIsLoading: (isLoading: boolean) => void;
    displayErrorMessage: (message: string) => void;
    displayInfoMessage: (message: string, duration: number) => void;
    clearLastInfoMessage: () => void;
}

export class UserPresenter {
    private view: UserView;
    private userService: UserService;

    public constructor(view: UserView) {
        this.view = view;
        this.userService = new UserService();
    }

    public async setIsFollowerStatus(
        authToken: AuthToken,
        currentUser: User,
        displayedUser: User
      ) {
        try {
          if (currentUser === displayedUser) {
            this.view.setUserIsFollower(false);
          } else {
            this.view.setUserIsFollower(
              await this.userService.getIsFollowerStatus(authToken!, currentUser!, displayedUser!)
            );
          }
        } catch (error) {
          this.view.displayErrorMessage(
            `Failed to determine follower status because of exception: ${error}`
          );
        }
      };

      public async setNumbFollowees(
        authToken: AuthToken,
        displayedUser: User
      ) {
        try {
            this.view.setUserFolloweeCount(await this.userService.getFolloweeCount(authToken, displayedUser));
        } catch (error) {
          this.view.displayErrorMessage(
            `Failed to get followees count because of exception: ${error}`
          );
        }
      };

      public async setNumbFollowers(
        authToken: AuthToken,
        displayedUser: User
      ) {
        try {
            this.view.setUserFollowerCount(await this.userService.getFollowerCount(authToken, displayedUser));
        } catch (error) {
          this.view.displayErrorMessage(
            `Failed to get followers count because of exception: ${error}`
          );
        }
      };

    public async followDisplayedUser(
        event: React.MouseEvent,
        authToken: AuthToken,
        displayedUser: User
      ): Promise<void> {
        event.preventDefault();
    
        try {
          this.view.setUserIsLoading(true);
          this.view.displayInfoMessage(`Following ${displayedUser.name}...`, 0);
    
          const [followerCount, followeeCount] = await this.follow(
            authToken,
            displayedUser
          );
    
          this.view.setUserIsFollower(true);
          this.view.setUserFollowerCount(followerCount);
          this.view.setUserFolloweeCount(followeeCount);
        } catch (error) {
            this.view.displayErrorMessage(
            `Failed to follow user because of exception: ${error}`
          );
        } finally {
            this.view.clearLastInfoMessage();
            this.view.setUserIsLoading(false);
        }
      };
    
      public async follow(
        authToken: AuthToken,
        userToFollow: User
      ): Promise<[followerCount: number, followeeCount: number]> {
        // Pause so we can see the follow message. Remove when connected to the server
        await new Promise((f) => setTimeout(f, 2000));
    
        // TODO: Call the server
    
        const followerCount = await this.userService.getFollowerCount(authToken, userToFollow);
        const followeeCount = await this.userService.getFolloweeCount(authToken, userToFollow);
    
        return [followerCount, followeeCount];
      };
    
      const unfollowDisplayedUser = async (
        event: React.MouseEvent
      ): Promise<void> => {
        event.preventDefault();
    
        try {
          setIsLoading(true);
          displayInfoMessage(
            `Unfollowing ${displayedUser!.name}...`,
            0
          );
    
          const [followerCount, followeeCount] = await unfollow(
            authToken!,
            displayedUser!
          );
    
          setIsFollower(false);
          setFollowerCount(followerCount);
          setFolloweeCount(followeeCount);
        } catch (error) {
          displayErrorMessage(
            `Failed to unfollow user because of exception: ${error}`
          );
        } finally {
          clearLastInfoMessage();
          setIsLoading(false);
        }
      };
    
      const unfollow = async (
        authToken: AuthToken,
        userToUnfollow: User
      ): Promise<[followerCount: number, followeeCount: number]> => {
        // Pause so we can see the unfollow message. Remove when connected to the server
        await new Promise((f) => setTimeout(f, 2000));
    
        // TODO: Call the server
    
        const followerCount = await getFollowerCount(authToken, userToUnfollow);
        const followeeCount = await getFolloweeCount(authToken, userToUnfollow);
    
        return [followerCount, followeeCount];
      };
}