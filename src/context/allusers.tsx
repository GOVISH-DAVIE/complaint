import { createContext } from "react";
import { UserInterface } from "../interfaces/user";
export interface IAllUsers {
    value :UserInterface[]
    update:(value:UserInterface[])=>void
}
export const defaultUser :IAllUsers = {
    value:[],
    update:(value:UserInterface[])=>{

    }


}

export const AllUsersContext = createContext<IAllUsers>(defaultUser)