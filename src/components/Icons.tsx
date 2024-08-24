import { Icon } from "@ui-kitten/components";
import { ActivityIndicator } from "react-native";

export const plusIcon = (props: any) => <Icon {...props} name={'plus'} />

export const saveIcon = (props: any) => <Icon {...props} name={'save'} />

export const logoutIcon = (props: any) => <Icon {...props} name={'log-out-outline'} />

export const personIcon = (props: any) => <Icon {...props} name={'person'} />

export const closeIcon = (props: any) => <Icon {...props} name={'close-circle'} />

export const moreIcon = (props: any) => <Icon {...props} name={'more-horizontal'} />

export const editIcon = (props: any) => <Icon {...props} name={'edit'} />

export const deleteIcon = (props: any) => <Icon {...props} name={'trash'} />

export const activityIcon = (props: any) => <ActivityIndicator size={'small'} color={props.style.tintColor} />