export const ROLES = {
  SUPER_ADMIN: 'SUPER_ADMIN',
  WORKSPACE_ADMIN: 'WORKSPACE_ADMIN',
  HR: 'HR',
  INTERVIEWER: 'INTERVIEWER',
  CANDIDATE: 'CANDIDATE'
};

export const ACCESS_MATRIX = {
  [ROLES.SUPER_ADMIN]: {
    all: ['create', 'read', 'update', 'delete'], // Full Access
  },
  [ROLES.HR]: {
    JOBPOSTS: ['create', 'read', 'update'],
    CANDIDATES: ['read', 'update'],
    BILLINGS: ['read'],
    TESTS: ['read'],
    // Baaki 36 entities yahan define hongi
  },
  [ROLES.INTERVIEWER]: {
    JOBPOSTS: ['create', 'read', 'update'],
    CANDIDATES: ['create', 'read', 'update'],
    BILLINGS: ['create', 'read'],
    TESTS: [], // No access
  }
};