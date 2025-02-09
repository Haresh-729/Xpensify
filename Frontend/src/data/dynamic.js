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


import MainUser from "../components/protected/user/Main";
import MainFinance from "../components/protected/finance/Main";
import MainManager from "../components/protected/manager/Main";

import ScanBill from "../components/protected/all/ScanBill";
import Reports from "../components/protected/all/Reports";
import Collections from "../components/protected/all/Collections";


import UserProfile from "../components/protected/user/Profile";
import FinanceProfile from "../components/protected/finance/Profile";
import ManagerProfile from "../components/protected/manager/Profile";
import CollectionListForReports from "../components/protected/all/CollectionListForReports";
import { CalendarRange, ClipboardList, House, IndianRupee, ReceiptIndianRupee } from "lucide-react";
//userROles = "manager", "finance", "employee"
const features = [
  {
    featureName: "Main",
    displayName: "Home",
    allowedRoles: ["employee"],
    logoUsed: House,
    page: MainUser,
  },
  {
    featureName: "Main",
    displayName: "Home",
    allowedRoles: ["finance"],
    logoUsed: House,
    page: MainFinance,
  },
  {
    featureName: "Main",
    displayName: "Home",
    allowedRoles: ["manager"],
    logoUsed: House,
    page: MainManager,
  },

  // following can be assigned to multiple users

  {
    featureName: "Scan",
    displayName: "Create Expense",
    allowedRoles: ["employee", "finance", "manager"],
    logoUsed: IndianRupee,
    page: ScanBill,
  },
  {
    featureName: "Report",
    displayName: "Reports",
    allowedRoles: ["finance", "manager"],
    logoUsed: ClipboardList,
    page: CollectionListForReports,
  },
  {
    featureName: "Collections",
    displayName: "Collections",
    allowedRoles: ["finance", "manager"],
    logoUsed: CalendarRange,
    page: Collections,
  },

  //Profile Page Should be last and can be assigned to only one role per feature...
  {
    featureName: "Profile",
    displayName: "Profile",
    allowedRoles: ["employee"],
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
  {
    featureName: "Profile",
    displayName: "Profile",
    allowedRoles: ["manager"],
    logoUsed: UserIcon,
    page: ManagerProfile,
  },
];

export { features };