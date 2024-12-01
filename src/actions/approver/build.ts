import { PostApproverDTO } from '@/types/approvers/approvers';

export const buildPostData = (data: PostApproverDTO): PostApproverDTO => {
  return {
    ...data,
    userId: Number(data.userId),
    level: Number(data.level),
    competence: Number(data.competence),
  };
};
