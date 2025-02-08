//all the data required to make the website dynamic will be stored here this will not be the dummy data. Without this the website will not work...i.e. this is the most important of all....
import {
  HomeIcon,
  UserIcon,
  BellAlertIcon,
  EnvelopeOpenIcon,
  BuildingStorefrontIcon,
  Bars4Icon,
  ArrowLeftIcon,
  ChevronDoubleLeftIcon,
  GlobeEuropeAfricaIcon,
} from "@heroicons/react/24/solid";

import Main from "../components/protected/user/Main";
import policies from "../components/protected/finance/Events";

import MainManager from "../components/protected/finance/Main";
import MainSA from "../components/protected/manager/Main";
import Report from "../components/protected/manager/AllBills";
import Approval from "../components/protected/manager/Approval";


import UserProfile from "../components/protected/user/Profile";
import FinanceProfile from "../components/protected/finance/Profile";

//userROles = "manager", "finance", "user"
const features = [
  {
    featureName: "Main",
    displayName: "Home",
    allowedRoles: ["user"],
    logoUsed: HomeIcon,
    page: Main,
  },
  {
    featureName: "Main",
    displayName: "Home",
    allowedRoles: ["finance"],
    logoUsed: UserIcon,
    page: policies,
  },
  {
    featureName: "Main",
    displayName: "Home",
    allowedRoles: ["manager"],
    logoUsed: UserIcon,
    page: MainSA,
  },
  {
    featureName: "Report",
    displayName: "Report",
    allowedRoles: ["manager"],
    logoUsed: UserIcon,
    page: Report,
  },
  {
    featureName: "Approval",
    displayName: "Approvals",
    allowedRoles: ["manager"],
    logoUsed: UserIcon,
    page: Approval,
  },



  //Profile Page Should be last...
  {
    featureName: "Profile",
    displayName: "Profile",
    allowedRoles: ["user", "finance"],
    logoUsed: UserIcon,
    page: UserProfile,
  },
  {
    featureName: "Profile",
    displayName: "Profile",
    allowedRoles: ["user"],
    logoUsed: UserIcon,
    page: FinanceProfile,
  },
];

export { features };
