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
import MainCompany from "../components/protected/company/Main";
import MainSA from "../components/protected/superAdmin/Main";
import Orders from "../components/protected/all/Orders";
import UserProfile from "../components/protected/user/Profile";
import CompanyProfile from "../components/protected/company/Profile";
//userROles = "user", "company", "superAdmin"
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
    allowedRoles: ["company"],
    logoUsed: UserIcon,
    page: MainCompany,
  },
  {
    featureName: "Orders",
    displayName: "Orders",
    allowedRoles: ["user", "company", "superAdmin"],
    logoUsed: UserIcon,
    page: Orders,
  },
  {
    featureName: "Main",
    displayName: "Home",
    allowedRoles: ["superAdmin"],
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
    allowedRoles: ["company"],
    logoUsed: UserIcon,
    page: CompanyProfile,
  },
];

export { features };
