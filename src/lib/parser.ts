import type { TUser, TParsedUser } from './types';

const generateInitials = (firstName: string, lastName: string) => {
	return `${firstName.charAt(0).toUpperCase()}${lastName.charAt(0).toUpperCase()}`;
}

export const parseData = (data: TUser[]): TParsedUser[] => {
	if (!data.length) return [];
	
	const userMap = new Map<number, TUser>();
	const managerIds = new Set<number>();

	data.forEach(user => {
		userMap.set(user.id, user);
		if (user.managerId) {
			managerIds.add(user.managerId);
		} else {
			managerIds.add(user.id);
		}
	});
	
	
	const buildManagerHierarchy = (userId: number): TParsedUser | null => {
		const user = userMap.get(userId);
		if (!user) return null;
		
		const initials = generateInitials(user.firstName, user.lastName);
		
		const subTeamMembers = data.filter(user => user.managerId === userId);
		
		const teamMembers: TParsedUser[] = [];
		subTeamMembers.forEach(subTeamMember => {
			if (managerIds.has(subTeamMember.id)) {
				const subManager = buildManagerHierarchy(subTeamMember.id);
				if (subManager) {
					teamMembers.push(subManager);
				}
			} else {
				teamMembers.push({
					id: subTeamMember.id,
					firstName: subTeamMember.firstName,
					lastName: subTeamMember.lastName,
					email: subTeamMember.email,
					photo: subTeamMember.photo,
					initials: generateInitials(subTeamMember.firstName, subTeamMember.lastName),
					teamMembers: []
				});
			}
		});
		
		return {
			id: user.id,
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email,
			photo: user.photo,
			initials: initials,
			managerId: user.managerId,
			teamMembers: teamMembers
		};
	};
	
	const topLevelManagers: TParsedUser[] = [];
	data.forEach(user => {
		if (!user.managerId && managerIds.has(user.id)) {
			const manager = buildManagerHierarchy(user.id);
			if (manager) {
				topLevelManagers.push(manager);
			}
		}
	});
	
	return topLevelManagers;
}