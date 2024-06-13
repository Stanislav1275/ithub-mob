import {FlatList, VStack} from "@gluestack-ui/themed";
import {useProjectFeedQuery} from "@/entities/project/model/queries";
import {ProjectCardDetailPreview} from "@/entities/project/ui/ProjectCard";
import {useSafeAreaInsets} from "react-native-safe-area-context";

export default function ProjectsPage (){
    const {data:{projects = []} = {} } = useProjectFeedQuery();
    const insets = useSafeAreaInsets();
    return (
        <FlatList   data={projects} keyExtractor={(d)=>d.id}
                  renderItem={({item:project, index}) => (
                      <VStack $mt={index?'$1':''}>
                          <ProjectCardDetailPreview project={project}/>

                      </VStack>
                  )}
        />
            )
}
