import React, {useRef} from "react";
import {StyleSheet} from "react-native";
import {RichEditor, RichEditorProps, RichToolbar} from "react-native-pell-rich-editor";
import {FormControl, FormControlError, FormControlErrorIcon, FormControlErrorText, View} from "@gluestack-ui/themed";
import {Controller, ControllerProps, FieldName} from "react-hook-form";
import {FieldValues} from "react-hook-form/dist/types";
import {AlertTriangle} from "lucide-react-native";

export const EditorText =(props:RichEditorProps) => {
    const richText = useRef<RichEditor>();

    return (
        <View style={[styles.container]}>
            <RichToolbar selectedIconTint={'#2095F2'}
                         disabledIconTint={'#bfbfbf'} editor={richText}/>
            {/*//@ts-ignore*/}
            <RichEditor  ref={richText} {...props}/>
        </View>
    )
}
export const EditorTextControl = <Fields extends FieldValues = FieldValues>({isReq,control, name, isError, msg}:{control:ControllerProps<Fields>, name:FieldName<Fields>, isError?:boolean, msg?:string, isReq?:boolean}) => {
    return <FormControl isRequired={isReq} isInvalid={isError}>
        {/*//@ts-ignore*/}
        <Controller control={control}  render={({field}) => {
            return (
                <EditorText {...field} onChange={(html:string) => {
                    field.onChange(html)
                }}/>
            )
        }} name={name}/>
        <FormControlError>
            <FormControlErrorIcon size="md" as={AlertTriangle} />
            <FormControlErrorText>
                {msg}
            </FormControlErrorText>
        </FormControlError>
    </FormControl>
}
const styles = StyleSheet.create({
    container: {
    },
    nav: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 5,
    },
    rich: {
        minHeight: 300,
        flex: 1,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: '#e3e3e3',
    },
    topVi: {
        backgroundColor: '#fafafa',
    },
    richBar: {
        borderColor: '#efefef',
        borderTopWidth: StyleSheet.hairlineWidth,
    },
    richBarDark: {
        backgroundColor: '#191d20',
        borderColor: '#696969',
    },
    scroll: {
        backgroundColor: '#ffffff',
    },
    scrollDark: {
        backgroundColor: '#2e3847',
    },
    darkBack: {
        backgroundColor: '#191d20',
    },
    item: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: '#e8e8e8',
        flexDirection: 'row',
        height: 40,
        alignItems: 'center',
        paddingHorizontal: 15,
    },

    input: {
        flex: 1,
    },

    tib: {
        textAlign: 'center',
        color: '#515156',
    },

    flatStyle: {
        paddingHorizontal: 12,
    },
});
