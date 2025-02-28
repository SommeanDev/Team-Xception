import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import ViewPost from "../components/ViewPost";
import CreatePost from "../pages/CreatePost";


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
            {
                path:"/create",
                element:<CreatePost/>
            }
        ]
    }
])

export default router