const pool = require('../config/db');

const AdminAuditLogModel = {
    create: async ({ adminUserId = null, action, resource, resourceId = null, status = 'success', ipAddress = null, userAgent = null, details = null }) => {
        await pool.query(
            `INSERT INTO admin_audit_log (admin_user_id, action, resource, resource_id, status, ip_address, user_agent, details)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
            [adminUserId, action, resource, resourceId, status, ipAddress, userAgent, details]
        );
    }
};

module.exports = AdminAuditLogModel;
