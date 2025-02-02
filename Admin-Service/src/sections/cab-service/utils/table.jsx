import { Typography } from "@mui/material";

export function RenderUserName(userProfile){
    const firstName = userProfile?.firstName && userProfile?.firstName ;
    const middleName = userProfile?.middleName && userProfile?.middleName ;
    const lastName = userProfile?.lastName && userProfile?.lastName ;

    return <Typography> {firstName && firstName} {middleName && middleName} {lastName && lastName}</Typography>
}