export interface ICodesContext {
  showRuleModal: boolean;
  inviteCodes: any;
  tradeInviteCodes: any;
  inviteRecords: any;
  claimLoading: boolean;
  inviteCodesLoading: boolean;
  inviteRecordsLoading: boolean;
  handleClaim: () => void;
  setShowRuleModal: (show: boolean) => void;
  handleGetInviteCodes: () => Promise<any>;
}