import type { TUser, TManager } from './types';

const generateInitals = (firstName: string, lastName: string) => {
	return `${firstName.charAt(0).toUpperCase()}${lastName.charAt(0).toUpperCase()}`;
}

export const parseData = (data: TUser[]) => {
	if (!data.length) return [];
	
	const managers: TManager[] = [];

	data.forEach(user => {
		if (!user.managerId) {
			const initials = generateInitals(user.firstName, user.lastName);
			managers.push({
				id: user.id,
				firstName: user.firstName,
				lastName: user.lastName,
				email: user.email,
				photo: user.photo,
				initials: initials,
				teamMembers: []
			});
		}
	});

	data.forEach(user => {
		const initials = generateInitals(user.firstName, user.lastName);
		const existingManager = managers.find(m => m.id === user.id);

		if (existingManager) {
			return;
		}

		if (user.managerId) {
			const manager = managers.find(manager => manager.id === user.managerId);
			if (manager) {
				manager.teamMembers.push({
					id: user.id,
					firstName: user.firstName,
					lastName: user.lastName,
					email: user.email,
					photo: user.photo,
					initials: initials
				});
			}
		} else {
			const manager = managers.find(m => m.id === user.id);
			if (manager) {
				manager.initials = initials;
			}
		}
	});

	return managers.map(manager => ({
		...manager,
		initials: manager.initials || generateInitals(manager.firstName, manager.lastName)
	}));
}