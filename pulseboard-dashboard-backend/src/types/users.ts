export interface UsersSnapshot {
  type: "users";
  period: string;
  current_period: {
    total_users: number;
    new_users: number;
    active_users: number;
  };
  previous_period: {
    total_users: number;
    new_users: number;
    active_users: number;
  };
}
