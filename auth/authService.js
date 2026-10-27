const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const BaseModel = require('../model/AppModel');
const UserModel = require('../modules/Users/UserModel') 

const userModel = BaseModel(UserModel);

const AuthService = {

  // ✅ REGISTER
  async register(data) {
  try{
    const { organization, businesses, subscription } = data;
    console.log("check comes: ",organization, businesses, subscription)
    if (
      !organization ||
      !Array.isArray(businesses) ||
      businesses.length === 0 ||
      !subscription
    ) {
      throw new Error("Invalid registration data");
    }

    const {
      organizationName,
      firstName,
      lastName,
      email,
      mobile,
      address,
      password,
    } = organization;

    if (
      !organizationName ||
      !firstName ||
      !lastName ||
      !email ||
      !password
    ) {
      throw new Error("Please provide all required organization details");
    }

    if (!Array.isArray(businesses) || businesses.some(
      (business) =>
        !business.businessName ||
        !business.businessType ||
        !Array.isArray(business.branches) ||
        business.branches.length === 0
    )) {
      throw new Error("Each business must have a name, type, and at least one branch");
    }

    /*
     * 1. Check duplicate email.
     */

    const existingUsers = await userModel.query(
      `SELECT id
       FROM ${UserModel.table}
       WHERE email = ?
         AND active = 1
         AND deleted = 0`,
      [email]
    );

    if (existingUsers.length > 0) {
      throw new Error("Email is already registered");
    }

    /*
     * 2. Find the subscription plan from the database.
     * Never trust the price or limits sent by the frontend.
     */
    const plans = await userModel.query(
      `SELECT id, plan_code, plan_name, price, billing_cycle,
              duration_days, max_users, max_branches
       FROM subscription_plans
       WHERE id = ?
         AND plan_code = ?
         AND active = 1
         AND deleted = 0`,
      [subscription.planId, subscription.planCode]
    );

    if (!plans.length) {
      throw new Error("Selected subscription plan is invalid or inactive");
    }

    const plan = plans[0];

    if (
      subscription.billingCycle &&
      subscription.billingCycle !== plan.billing_cycle
    ) {
      throw new Error("Subscription billing cycle does not match the selected plan");
    }

    /*
     * 3. Validate the admin role exists.
     */
    const roleTypes = await userModel.query(
      `SELECT id, role_code, role_name,description
       FROM role_types
       WHERE role_code = ?
         AND active = 1
         AND deleted = 0`,
      ["organization_admin"]
    );

    if (!roleTypes.length) {
      throw new Error(
        "Admin role type not found. Insert an active 'admin' record into role_types."
      );
    }

    const adminRoleType = roleTypes[0];

    /*
     * 4. Validate business types before inserting records.
     */
    const businessTypeIds = {};

    for (const business of businesses) {
      const typeCode = business.businessType;

      if (businessTypeIds[typeCode]) {
        continue;
      }

      const types = await userModel.query(
        `SELECT id, type_code, type_name
         FROM business_types
         WHERE type_code = ?
           AND active = 1
           AND deleted = 0`,
        [typeCode]
      );

      if (!types.length) {
        throw new Error(`Invalid or inactive business type: ${typeCode}`);
      }

      businessTypeIds[typeCode] = types[0].id;
    }

    /*
     * 5. Calculate subscription dates.
     */
    const startDate = new Date();
    const endDate = new Date(startDate);

    if (plan.duration_days != null) {
      endDate.setDate(endDate.getDate() + Number(plan.duration_days));
    } else if (plan.billing_cycle === "monthly") {
      endDate.setMonth(endDate.getMonth() + 1);
    } else if (plan.billing_cycle === "yearly") {
      endDate.setFullYear(endDate.getFullYear() + 1);
    } else {
      throw new Error("Invalid subscription duration configuration");
    }

    const toSqlDate = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");

      return `${year}-${month}-${day}`;
    };

    /*
     * IMPORTANT:
     * This implementation uses your existing userModel.query() method.
     * It assumes INSERT queries return an insertId or a result containing
     * insertId. Adjust getInsertId() to match your AppModel implementation.
     */
    const getInsertId = (result) => {
      if (result?.insertId) {
        return result.insertId;
      }

      if (result?.[0]?.insertId) {
        return result[0].insertId;
      }

      throw new Error(
        "Could not get inserted record ID. Check the return value of userModel.query()."
      );
    };

    /*
     * 6. Hash the password.
     */
    const passwordHash = await bcrypt.hash(password, 10);

    /*
     * 7. Create company / organization.
     */
    const companyResult = await userModel.query(
      `INSERT INTO companies
        (company_name, first_name, last_name, email, phone, address,
         active, deleted, created, modified)
       VALUES (?, ?, ?, ?, ?, ?, 1, 0, NOW(), NOW())`,
      [
        organizationName,
        firstName,
        lastName,
        email,
        mobile || null,
        address || null,
      ]
    );

    const companyId = getInsertId(companyResult);

    /*
     * 8. Create businesses, branches, roles, and access records.
     */
    const createdBusinesses = [];
    const createdBranches = [];

    let ownerBranchId = null;
    let ownerRoleId = null;
    let totalBranches = 0;

    for (const business of businesses) {
      const businessTypeId = businessTypeIds[business.businessType];

      const businessResult = await userModel.query(
        `INSERT INTO businesses
          (company_id, business_type_id, business_name,
           active, deleted, created, modified)
         VALUES (?, ?, ?, 1, 0, NOW(), NOW())`,
        [companyId, businessTypeId, business.businessName]
      );

      const businessId = getInsertId(businessResult);

      createdBusinesses.push({
        id: businessId,
        businessName: business.businessName,
        businessType: business.businessType,
      });

      for (const branch of business.branches) {
        totalBranches += 1;

        if (
          plan.max_branches != null &&
          totalBranches > Number(plan.max_branches)
        ) {
          throw new Error(
            `Your ${plan.plan_name} plan allows a maximum of ${plan.max_branches} branches`
          );
        }

        const branchResult = await userModel.query(
          `INSERT INTO branches
            (business_id, company_id, branch_name, address,
             district, taluk, active, deleted, created, modified)
           VALUES (?, ?, ?, ?, ?, ?, 1, 0, NOW(), NOW())`,
          [
            businessId,
            companyId,
            branch.branchName,
            branch.address || null,
            branch.district || null,
            branch.taluk || null,
          ]
        );

        const branchId = getInsertId(branchResult);
console.log("check role data: ",adminRoleType)
        /*
         * Create an admin role for this branch.
         */
        const roleResult = await userModel.query(
          `INSERT INTO roles
              (company_id, branch_id, role_type_id, role_name, description,
               active, deleted, created, modified)
           VALUES (?, ?, ?, ?, ?, 1, 0, NOW(), NOW())`,
          [
            companyId,
            branchId,
            adminRoleType.id,
            adminRoleType.role_code,
            adminRoleType.description
          ]
        );

        const roleId = getInsertId(roleResult);

        createdBranches.push({
          id: branchId,
          businessId,
          branchName: branch.branchName,
          district: branch.district || null,
          taluk: branch.taluk || null,
          roleId,
        });

        /*
         * The first branch and role become the owner's default access.
         */
        if (ownerBranchId === null) {
          ownerBranchId = branchId;
          ownerRoleId = roleId;
        }
      }
    }

    /*
     * 9. Check the user limit.
     *
     * This registration flow creates one owner/admin user.
     * If your plan limits are intended to include additional users,
     * enforce the same limit when inviting or creating users later.
     */
    if (plan.max_users != null && Number(plan.max_users) < 1) {
      throw new Error(
        `Your ${plan.plan_name} plan does not allow user accounts`
      );
    }

    /*
     * 10. Create the owner user.
     *
     * The schema uses users.user_name and users.password_hash.
     * Do not store the password in a plain-text password column.
     */
    const userResult = await userModel.query(
      `INSERT INTO users
        (company_id, branch_id, role_id, user_name, email,
         password_hash, active, deleted, created, modified)
       VALUES (?, ?, ?, ?, ?, ?, 1, 0, NOW(), NOW())`,
      [
        companyId,
        ownerBranchId,
        ownerRoleId,
        `${firstName} ${lastName}`.trim(),
        email,
        passwordHash,
      ]
    );

    const userId = getInsertId(userResult);

    /*
     * 11. Grant the owner access to every branch.
     */
    for (const branch of createdBranches) {
      await userModel.query(
        `INSERT INTO user_access
          (user_id, company_id, branch_id, role_id,
           active, deleted, created, modified)
         VALUES (?, ?, ?, ?, 1, 0, NOW(), NOW())`,
        [
          userId,
          companyId,
          branch.id,
          branch.roleId,
        ]
      );
    }

    /*
     * 12. Create the company subscription.
     *
     * Free trial: active immediately.
     * Paid plan: pending until payment is confirmed.
     *
     * Confirm your product's policy before enabling paid subscriptions.
     */
    const isFreeTrial =
      plan.billing_cycle === "trial" && Number(plan.price) === 0;

    const subscriptionStatus = isFreeTrial ? "active" : "pending";

    const subscriptionResult = await userModel.query(
      `INSERT INTO company_subscriptions
        (company_id, plan_id, start_date, end_date, status,
         active, deleted, created, modified)
       VALUES (?, ?, ?, ?, ?, 1, 0, NOW(), NOW())`,
      [
        companyId,
        plan.id,
        toSqlDate(startDate),
        toSqlDate(endDate),
        subscriptionStatus,
      ]
    );

    const companySubscriptionId = getInsertId(subscriptionResult);

    /*
     * Do not insert subscription_payments here.
     * Paid plans should create payment records only after a real
     * payment attempt and its gateway result are available.
     */

    return {
      success: true,
      message: "Registration completed successfully",
      data: {
        companyId,
        userId,
        organizationName,
        email,
        businesses: createdBusinesses,
        branches: createdBranches,
        subscription: {
          id: companySubscriptionId,
          planId: plan.id,
          planCode: plan.plan_code,
          planName: plan.plan_name,
          price: plan.price,
          billingCycle: plan.billing_cycle,
          startDate: toSqlDate(startDate),
          endDate: toSqlDate(endDate),
          status: subscriptionStatus,
        },
      },
    }
   }catch(error){
     console.log("check error: ",error)
   }
  },

  // ✅ LOGIN
// AuthService.js

async login(email, password) {
  // 1. Find and validate user
  const users = await userModel.query(
    `SELECT id, company_id, branch_id, role_id, user_name,
            email, password_hash, active, deleted
     FROM users
     WHERE email = ?
       AND active = 1
       AND deleted = 0
     LIMIT 1`,
    [email]
  );

  if (!users.length) {
    throw new Error("Invalid email or password");
  }

  const user = users[0];

  const passwordMatches = await bcrypt.compare(
    password,
    user.password_hash
  );

  if (!passwordMatches) {
    throw new Error("Invalid email or password");
  }

  // 2. Check company subscription
  const subscriptions = await userModel.query(
    `SELECT cs.id AS subscription_id,
            cs.plan_id,
            cs.start_date,
            cs.end_date,
            cs.status AS subscription_status,
            sp.plan_code,
            sp.plan_name,
            sp.max_users,
            sp.max_branches
     FROM company_subscriptions cs
     INNER JOIN subscription_plans sp
       ON sp.id = cs.plan_id
      AND sp.active = 1
      AND sp.deleted = 0
     WHERE cs.company_id = ?
       AND cs.active = 1
       AND cs.deleted = 0
       AND cs.status = 'active'
       AND cs.start_date <= CURDATE()
       AND cs.end_date >= CURDATE()
     ORDER BY cs.end_date DESC
     LIMIT 1`,
    [user.company_id]
  );

  if (!subscriptions.length) {
    throw new Error(
      "Your company's subscription is inactive or expired"
    );
  }

  const subscription = subscriptions[0];

  // 3. Resolve accessible branches and branch-specific roles
  const branchAccess = await userModel.query(
    `SELECT ua.branch_id,
            ua.role_id,
            b.branch_name,
            r.role_type_id,
            rt.role_code,
            rt.role_name
     FROM user_access ua
     INNER JOIN branches b
       ON b.id = ua.branch_id
      AND b.company_id = ua.company_id
      AND b.active = 1
      AND b.deleted = 0
     INNER JOIN roles r
       ON r.id = ua.role_id
      AND r.company_id = ua.company_id
      AND r.branch_id = ua.branch_id
      AND r.active = 1
      AND r.deleted = 0
     INNER JOIN role_types rt
       ON rt.id = r.role_type_id
      AND rt.active = 1
      AND rt.deleted = 0
     WHERE ua.user_id = ?
       AND ua.company_id = ?
       AND ua.active = 1
       AND ua.deleted = 0`,
    [user.id, user.company_id]
  );

  if (!branchAccess.length) {
    throw new Error("No active branch access is assigned to this user");
  }

  // 4. Organization Admin has unrestricted role-level menu access.
  // Subscription restrictions still apply.
  const isOrganizationAdmin = branchAccess.some(
    (branch) => branch.role_code === "organization_admin"
  );

  // 5. Get the menus included in the subscribed plan

// 1. Load all menus enabled for this company.
const companyMenus = await userModel.query(
  `SELECT DISTINCT
      m.id,
      m.key_name AS menu_code,
      m.label AS menu_name,
      m.icon,
      m.image_url,
      m.route,
      m.parent_id,
      m.menu_category_id,
      m.is_default
   FROM company_menus cm
   INNER JOIN menus m
     ON m.id = cm.menu_id
    AND m.company_id = cm.company_id
    AND m.active = 1
    AND m.deleted = 0
   WHERE cm.company_id = ?
     AND cm.active = 1
     AND cm.deleted = 0
   ORDER BY m.parent_id, m.id`,
  [user.company_id]
);

// 2. Build menu permissions for every accessible branch.
const branches = [];

for (const branch of branchAccess) {
  let allowedMenus;

  if (branch.role_code === "organization_admin") {
    // Organization Admin gets all menus enabled for the company.
    allowedMenus = companyMenus;
  } else {
    // Other roles get only menus granted to their branch role.
    allowedMenus = await userModel.query(
      `SELECT DISTINCT
          m.id,
          m.key_name AS menu_code,
          m.label AS menu_name,
          m.icon,
          m.image_url,
          m.route,
          m.parent_id,
          m.menu_category_id,
          m.is_default,
          rma.can_view,
          rma.can_edit
       FROM role_menu_access rma
       INNER JOIN menus m
         ON m.id = rma.menu_id
        AND m.company_id = rma.company_id
        AND m.active = 1
        AND m.deleted = 0
       INNER JOIN company_menus cm
         ON cm.company_id = rma.company_id
        AND cm.menu_id = m.id
        AND cm.active = 1
        AND cm.deleted = 0
       WHERE rma.company_id = ?
         AND rma.role_id = ?
         AND rma.active = 1
         AND rma.deleted = 0
         AND rma.can_view = 1
       ORDER BY m.parent_id, m.id`,
      [user.company_id, branch.role_id]
    );
  }

  branches.push({
    branchId: branch.branch_id,
    branchName: branch.branch_name,
    roleId: branch.role_id,
    roleCode: branch.role_code,
    roleName: branch.role_name,
    menus: allowedMenus,
  });
}

  // 7. Create a JWT containing identity only.
  // Re-check permissions and subscription in protected APIs.
  const token = jwt.sign(
    {
      id: user.id,
      companyId: user.company_id,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  // 8. Return session information to the frontend
  return {
    success: true,
    message: "Login successful",
    token,
    data: {
      user: {
        id: user.id,
        userName: user.user_name,
        email: user.email,
        companyId: user.company_id,
        isOrganizationAdmin,
      },
      subscription: {
        id: subscription.subscription_id,
        planId: subscription.plan_id,
        planCode: subscription.plan_code,
        planName: subscription.plan_name,
        status: subscription.subscription_status,
        startDate: subscription.start_date,
        endDate: subscription.end_date,
      },
      branches,
      defaultBranchId: branches.some(
        (branch) => branch.branchId === user.branch_id
      )
        ? user.branch_id
        : branches[0].branchId,
    },
  };
}

};

module.exports = AuthService;