import React from "react";
import { Navbar } from "./src/components/navbar/Navbar";
import { Footer} from "./src/components/footer/Footer";
import {Home} from "./src/pages/home/Home";
import {Gigs} from "./src/pages/gigs/Gigs";
import {Gig} from "./src/pages/gig/Gig";
import {Orders} from "./src/pages/orders/Orders";
import {MyGigs} from "./src/pages/myGigs/MyGigs";
import {Add} from "./src/pages/add/Add";
import {Messages} from "./src/pages/messages/Messages";
import {Message} from "./src/pages/message/Message";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  Outlet,
} from "react-router-dom";
import { Login } from "./src/pages/login/Login";
import { Register } from "./src/pages/register/Register";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'

function App() {
  const queryClient = new QueryClient()
  const Layout=()=>{
    return(
      <div className="app">
        <Navbar/>
        <Outlet/>
        <Footer/>
      </div>
    )
  }
  const router = createBrowserRouter([
    {
      path:"/",
      element:<Layout/>,
      children:[
        {
          path:"/",
          element:<Home/>
        },
        {
          path:"/gigs",
          element:<Gigs/>
        },
        {
          path:"/gigs/single/:id",
          element:<Gig/>
        },
        {
          path:"/orders",
          element:<Orders/>
        },
        {
          path:"/mygigs",
          element:<MyGigs/>
        },
        {
          path:"/add",
          element:<Add/>
        },
        {
          path:"/messages",
          element:<Messages/>
        },
        {
          path:"/message/:id",
          element:<Message/>
        },
        {
          path:"/login",
          element:<Login/>
        }
        ,
        {
          path:"/register",
          element:<Register/>
        }
      ]
    }
  ])
  return (
    <div>
      <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}/>
      </QueryClientProvider>
    </div>
  );
}

export default App;
