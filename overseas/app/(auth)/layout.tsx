import { ReactNode } from "react";

const authlayout = ({children} : {children : React.ReactNode}) => {
    return ( <div className="bg-red-700">
        {children}
    </div> );
}
 
export default authlayout;