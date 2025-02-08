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
import MainManager from "../components/protected/finance/Main";
import MainSA from "../components/protected/manager/Main";
import Orders from "../components/protected/all/Orders";
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
    page: MainManager,
  },
  {
    featureName: "Orders",
    displayName: "Orders",
    allowedRoles: ["user", "finance", "manager"],
    logoUsed: UserIcon,
    page: Orders,
  },
  {
    featureName: "Main",
    displayName: "Home",
    allowedRoles: ["manager"],
    logoUsed: UserIcon,
    page: MainSA,
  },

  //Profile Page Should be last...
  {
    featureName: "Profile",
    displayName: "Profile",
    allowedRoles: ["user"],
    logoUsed: UserIcon,
    page: UserProfile,
  },
  {
    featureName: "Profile",
    displayName: "Profile",
    allowedRoles: ["finance"],
    logoUsed: UserIcon,
    page: FinanceProfile,
  },
];

export { features };
