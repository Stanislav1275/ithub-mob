import {FlatList, View} from "@gluestack-ui/themed";
import {useProjectFeedQuery} from "@/entities/project/model/queries";
import {ProjectCardDetailPreview} from "@/entities/project/ui/ProjectCard";

export default function ProjectsPage (){
    const {data:{projects = []} = {} } = useProjectFeedQuery()
    console.log(projects)
    return <View>
        <FlatList data={projects}
                  renderItem={(project) => (
                      <ProjectCardDetailPreview project={project}/>
                  )}
        />
    </View>
}
