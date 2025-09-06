export interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  is_active: boolean;
  is_staff: boolean;
  date_joined: string;
  last_login: string;
  profile: UserProfile;
}

export interface UserProfile {
  id: number;
  user: number;
  organization: Organization;
  position: string;
  phone_number: string;
  signature: string;
  can_approve: boolean;
  approval_limit: number;
  organization_logo?: string;
}

export interface Organization {
  id: number;
  name: string;
  code: number;
  isHead: boolean;
  parent: number | null;
  created: string;
  updated: string;
  logo?: string;  
  logo_url?: string;  
}

export interface Stage {
  id: number;
  name: string;
  level: number;
  needs_approval: boolean;
  approval_role: string;
  description: string;
}

export interface Order {
  id: number;
  title: string;
  description: string;
  current_stage: number;
  current_stage_name: string;
  created_by: number;
  created_by_name: string;
  organization: number;
  organization_name: string;
  status: string;
  priority: number;
  is_urgent: boolean;
  deadline: string;
  submitted_date: string;
  approved_date: string;
  created: string;
  updated: string;
  approvals: OrderApproval[];
  history: OrderHistory[];
}

export interface OrderApproval {
  id: number;
  order: number;
  stage: number;
  stage_name: string;
  approver: number;
  approver_name: string;
  decision: string;
  comments: string;
  requested_date: string;
  decided_date: string;
}

export interface OrderHistory {
  id: number;
  order: number;
  action: string;
  user: number;
  user_name: string;
  description: string;
  timestamp: string;
  old_value: string;
  new_value: string;
}

export interface AuthTokens {
  access: string;
  refresh: string;
}

export interface LoginData {
  username: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  phone_number: string;
}