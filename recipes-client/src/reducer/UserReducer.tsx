import { createContext, Dispatch } from "react";
export type UserType={
    id: string,
    firstName?:string,
    lastName?:string,
    email:string,
    password:string,
    address?:string,
    phone?:string
}
type Action={
    type: "CREATE_USER"|"UPDATE_USER"|"GET_USER"|"DELETE_USER",
    data: UserType;
}
export const UserContext=createContext<{
    user: UserType,
    userDispatch: Dispatch<Action>;
}>({
    user:{
        id: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        address:"",
        phone:""
    },
    userDispatch:()=>null
});
export default (state: UserType, action: Action): UserType => {
    switch (action.type) {
        case "CREATE_USER":
        return {
              id: action.data.id,
              firstName: action.data.firstName?action.data.firstName:"",
              lastName: action.data.lastName?action.data.lastName:"",
              email: action.data.email,
              password: action.data.password,
              address:action.data.address?action.data.address:"",
              phone:action.data.phone?action.data.phone:""
        };      
        case "UPDATE_USER":
        return action.data;
        default:
        return state
    }
}