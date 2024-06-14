// import { MemberTeam } from '@/shared/models/team.model';
// import Link from 'next/link';
// import { Card, CardContent } from '@/shared/ui/card';
// import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
// import { H4, P } from '@/shared/ui/typography';
// import { AbstractList } from '@/shared/ui/abstract-list';
// import { Skeleton } from '@/shared/ui/skeleton';
// import { useTeamCurrentQuery } from '@/entities/team/model/queries';
// import { ReactNode } from 'react';
//
import {MemberTeam} from "@/shared/api/models/team";
import {Link} from "expo-router";
import {Card, Center, Text} from "@gluestack-ui/themed";
import {ProfileAvatar} from "@/entities/user/ui/UserAvatar";

export const TeamMember = ({ member }: { member: MemberTeam }) => {
    return (
        <Link style={{margin:10}} href={`/user/${member.id}`}>
            <Card >
                <Center >
                    <ProfileAvatar avatar={member?.avatar||''}/>

                    <Text size='md'>{member?.username}</Text>
                    <Text size='sm' >{member.role || 'Участник'}</Text>
                </Center>
            </Card>
        </Link>
    );
};
// export const MemberAsTeamPartialList = ({ className, actions }: { className?: string; actions?: ReactNode }) => {
//     const { data: team, isLoading } = useTeamCurrentQuery();
//     const { members = [] } = team ?? {};
//     return (
//         <div className="mt-4 border rounded-lg pt-4 px-4">
//             <span className="flex justify-between">
//                 <H4 className="mb-4">Участники команды</H4>
//                 {actions}
//             </span>
//             {isLoading && <TeamListAsUserPartialSkeleton />}
//             {!isLoading && (
//                 <AbstractList
//                     className="flex flex-row flex-wrap gap-4 mb-4"
//                     isLoading={false}
//                     disableEmptyView={isLoading}
//                     data={members}
//                     renderItem={(item, index) => <TeamMember member={item} key={item.id} />}
//                 />
//             )}
//         </div>
//     );
// };
//
// export const TeamListAsUserPartialSkeleton = () => (
//     <div className="flex flex-row flex-wrap gap-4 mt-4 mb-4">
//         {new Array(4).map((v) => (
//             <Card className="w-[145px] max-w-[145px] h-[161px] flex items-center flex-col px-4 py-2">
//                 <CardContent className="flex flex-col items-center p-0">
//                     <Avatar className="rounded-lg w-[80px] h-[80px] mb-3">
//                         <AvatarImage className="rounded-lg" src={''} />
//                         <AvatarFallback>SN</AvatarFallback>
//                     </Avatar>
//                     <Skeleton className="w-[60px] h-[20px] mb-1 mt-1" />
//                     <Skeleton className="w-[40px] h-[15px]" />
//                 </CardContent>
//             </Card>
//         ))}
//     </div>
// );
