import {Text, View} from "@gluestack-ui/themed";
import {useLocalSearchParams} from "expo-router";

export default function TeamDetail (){
    const {id} = useLocalSearchParams() as {id:string}
    return <View>
        <Text>1</Text>
    </View>
}
