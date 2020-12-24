import { User } from "types/user.types";

export interface UserState {
	user: User | null;
	loading: boolean;
}
