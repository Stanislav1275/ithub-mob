import { useQuery } from 'react-query';
import { TagRepo } from './repo';
import { TagsKeys } from './keys';

export const useTagsQuery = () =>
  useQuery({
    queryFn: () => TagRepo.getAllTags(),
    queryKey: TagsKeys.getAllTags(),
    staleTime: Infinity,
  });
