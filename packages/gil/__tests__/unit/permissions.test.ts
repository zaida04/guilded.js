import { describe, expect, test } from "bun:test";
import { StoredRoleType } from "../../lib/adapters/db/DatabaseAdapter";
import CommandMessageListener from "../../lib/listeners/CommandMessageListener";

// biome-ignore lint:
const listener = new CommandMessageListener({} as any);
const minimodRole = { role_id: "role_1", type: StoredRoleType.Minimod, server_id: "MOCK_SERVER" };
const modRole = { role_id: "role_2", type: StoredRoleType.Mod, server_id: "MOCK_SERVER" };
const adminRole = { role_id: "role_3", type: StoredRoleType.Admin, server_id: "MOCK_SERVER" };

describe("Permissions", () => {
	test("Allow user with exact required role", () => {
		const result = listener.userPermissionsCheck({
			userRoles: ["role_1"],
			serverRoles: [minimodRole],
			requiredRoleType: StoredRoleType.Minimod,
		});
		expect(result).toBe(true);
	});

	test("Deny user with too low role", () => {
		const result = listener.userPermissionsCheck({
			userRoles: ["role_1"],
			serverRoles: [minimodRole],
			requiredRoleType: StoredRoleType.Mod,
		});
		expect(result).toBe(false);
	});

	test("Allow user with higher role than required", () => {
		const result = listener.userPermissionsCheck({
			userRoles: ["role_3"],
			serverRoles: [adminRole],
			requiredRoleType: StoredRoleType.Minimod,
		});
		expect(result).toBe(true);
	});

	test("Deny user with no required roles", () => {
		const result = listener.userPermissionsCheck({
			userRoles: [],
			serverRoles: [minimodRole, modRole, adminRole],
			requiredRoleType: StoredRoleType.Admin,
		});
		expect(result).toBe(false);
	});

	test("Deny server has no roles", () => {
		const result = listener.userPermissionsCheck({
			userRoles: ["role_1"],
			serverRoles: [],
			requiredRoleType: StoredRoleType.Admin,
		});
		expect(result).toBe(false);
	});

	test("Allow user with multiple roles", () => {
		const result = listener.userPermissionsCheck({
			userRoles: ["role_1", "role_2"],
			serverRoles: [minimodRole, modRole],
			requiredRoleType: StoredRoleType.Minimod,
		});
		expect(result).toBe(true);
	});
});
