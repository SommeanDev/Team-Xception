import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import ViewPost from "../components/ViewPost";


const router=createBrowserRouter([
    {
        path:"/",
        element:<App/>,
        children:[
            {
                path:"",
                element:<Home/>
            },
            {
                path:"/posts/:id",
                element:<ViewPost/>
            },
        ]
    }
])

export default router