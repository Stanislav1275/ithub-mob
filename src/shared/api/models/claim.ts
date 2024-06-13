import {TeamPartialAsUser} from './team';

export type CreateClaim = {
  resume_id: number;
  team_id: number;
};
export type ResumeAsClaimResponse = {
  id: number;
  title: string;
};
export type ClaimSchema = {
  id: number;
  team: Pick<TeamPartialAsUser, 'id' | 'name' | 'avatar'>;
  resume: ResumeAsClaimResponse;
  created_at: string;
  updated_at: string;
  accepted: boolean | null;
};
export type ClaimUserListSchema = {
  claims: ClaimSchema[];
};
