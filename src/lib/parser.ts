import type { TUser, TManager } from './types';

const generateInitials = (firstName: string, lastName: string) => {
	return `${firstName.charAt(0).toUpperCase()}${lastName.charAt(0).toUpperCase()}`;
}

export const parseData = (data: TUser[]): TManager[] => {
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
	
	
	const buildManagerHierarchy = (userId: number): TManager | null => {
		const user = userMap.get(userId);
		if (!user) return null;
		
		const initials = generateInitials(user.firstName, user.lastName);
		
		const subTeamMembers = data.filter(user => user.managerId === userId);
		
		const teamMembers: TManager[] = [];
		subTeamMembers.forEach(report => {
			if (managerIds.has(report.id)) {
				const subManager = buildManagerHierarchy(report.id);
				if (subManager) {
					teamMembers.push(subManager);
				}
			} else {
				teamMembers.push({
					id: report.id,
					firstName: report.firstName,
					lastName: report.lastName,
					email: report.email,
					photo: report.photo,
					initials: generateInitials(report.firstName, report.lastName),
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
			teamMembers: teamMembers
		};
	};
	
	const topLevelManagers: TManager[] = [];
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