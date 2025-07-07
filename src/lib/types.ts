export enum ERequestStatus {
	INIT = "INIT",
	PENDING = "PENDING",
	FULFILLED = "FULFILLED",
	REJECTED = "REJECTED"
}

export enum EInputKind {
	DEFAULT = "DEFAULT",
	ERROR = "ERROR",
	SUCCESS = "SUCCESS",
}

export type TUser = {
	id: number;
	firstName: string;
	lastName: string;
	email: string;
	managerId?: number;
	photo?: string;
	initials?: string;
}

export type TManager = {
	teamMembers: TUser[];
} & Omit<TUser, 'managerId'>;

export type TData = {
	secrets: Record<string, string>;
	users: TUser[];
}
