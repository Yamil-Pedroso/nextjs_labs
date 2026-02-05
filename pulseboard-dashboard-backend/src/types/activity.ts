export interface ActivitySnapshot {
  current_period: {
    active_users: number;
    new_users: number;
    active_subscriptions: number;
    pending_subscriptions: number;
    transactions_count: number;
  };
  previous_period: {
    active_users: number;
    new_users: number;
    active_subscriptions: number;
    pending_subscriptions: number;
    transactions_count: number;
  };
  type: "activity";
  period: string;
}
