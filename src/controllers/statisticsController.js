import db from "../models";

export default class StatisticsController {
    
    static async getAllUsers(req, res) {
        const roleCounts = {}; // Object to store the counts for each role
    
        const response = await db.User.findAndCountAll();
        const beneficialResponse = await db.beneficial.findAndCountAll();
    
        for (let resp of response.rows) {
            const role = resp.role;
            roleCounts[role] = (roleCounts[role] || 0) + 1;
        }
    
        for (let beneficial of beneficialResponse.rows) {
            const role = 'beneficial'; // Assuming 'beneficial' role for beneficial users
            roleCounts[role] = (roleCounts[role] || 0) + 1;
        }
    
        // const users = Object.keys(roleCounts).map((role) => ({
        //     role,
        //     count: roleCounts[role],
        // }));

        const users = [["Users", "System Users"]];
        for (const role in roleCounts) {
            users.push([role, roleCounts[role]]);
        }
    
        return res.status(200).json({ users });
    }
}
