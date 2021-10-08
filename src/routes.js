import Shifts from "./pages/BrowserShift/Shifts";
import Compliance from "./pages/Compliance/Compliance";
import ComplianceDetail from "./pages/Compliance/ComplianceDetail";
import MyShift from "./pages/MyShift/MyShift";
import Notification from "./pages/Notification/Notification";
import Profile from "./pages/Profile/Profile";

const Routes = [
    {
        name:"Shift",
        path:"shifts",
        component:Shifts,
    },
    {
        name:"My Shifts",
        path:"my-shifts",
        component:MyShift
    },
    {
        name:"My Shifts",
        path:"profile/documents",
        component:Compliance
    },
    {
        name:"My Shifts",
        path:"profile/documents/:id",
        component:ComplianceDetail
    },
    {
        name:"Profile",
        path:"profile",
        component:Profile
    },
    {
        name:"Notification",
        path:"notification",
        component:Notification
    }
]

export default Routes