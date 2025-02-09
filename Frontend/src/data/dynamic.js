// All the data required to make the website dynamic will be stored here. 
// This will not be dummy data. Without this, the website will not work... 
// i.e., this is the most important of all.

import {
  HomeIcon,
  UserIcon,
  DocumentTextIcon,
  CreditCardIcon,
  ClipboardDocumentListIcon,
  ChartBarIcon,
  ReceiptRefundIcon,
  UserCircleIcon,
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
import Chatbot from "../components/common/ChatBot";
//userROles = "manager", "finance", "user"
import CollectionListForReports from "../components/protected/all/CollectionListForReports";
<<<<<<< HEAD
import { Bot, CalendarRange, ClipboardList, House, IndianRupee, Plus, ReceiptIndianRupee } from "lucide-react";
import CreateEvents from "../components/protected/finance/CreateEvents";
import CollectionsBillList from "../components/protected/all/CollectionsBillList";
import UserHome from "../components/protected/user/UserHome";
//userROles = "manager", "finance", "employee"
=======

// userRoles = "manager", "finance", "employee"
>>>>>>> 159d3f11f6934ba319408c51f240cd64311e48a6
const features = [
  {
    featureName: "Main",
    displayName: "Home",
    allowedRoles: ["employee"],
    logoUsed: House,
    page: UserHome,
  },
  {
    featureName: "Main",
    displayName: "Home",
    allowedRoles: ["finance"],
<<<<<<< HEAD
    logoUsed: House,
=======
    logoUsed: HomeIcon,
>>>>>>> 159d3f11f6934ba319408c51f240cd64311e48a6
    page: MainFinance,
  },
  {
    featureName: "Main",
    displayName: "Home",
    allowedRoles: ["manager"],
<<<<<<< HEAD
    logoUsed: House,
=======
    logoUsed: HomeIcon,
>>>>>>> 159d3f11f6934ba319408c51f240cd64311e48a6
    page: MainManager,
  },

  // Features assigned to multiple roles
  {
    featureName: "Scan",
    displayName: "Create Expense",
    allowedRoles: ["employee", "finance", "manager"],
<<<<<<< HEAD
    logoUsed: IndianRupee,
=======
    logoUsed: CreditCardIcon,
>>>>>>> 159d3f11f6934ba319408c51f240cd64311e48a6
    page: ScanBill,
  },
  {
    featureName: "Report",
    displayName: "Reports",
    allowedRoles: ["finance", "manager"],
<<<<<<< HEAD
    logoUsed: ClipboardList,
=======
    logoUsed: ChartBarIcon,
>>>>>>> 159d3f11f6934ba319408c51f240cd64311e48a6
    page: CollectionListForReports,
  },
  {
    featureName: "Create Events",
    displayName: "Create Event",
    allowedRoles: ["finance", "manager"],
    logoUsed: Plus,
    page: CreateEvents,
  },
  {
    featureName: "Collections",
    displayName: "Collections",
    allowedRoles: ["finance", "manager"],
<<<<<<< HEAD
    logoUsed: CalendarRange,
=======
    logoUsed: ClipboardDocumentListIcon,
>>>>>>> 159d3f11f6934ba319408c51f240cd64311e48a6
    page: Collections,
  },
  {
    featureName: "All Bills",
    displayName: "All Bills",
    allowedRoles: ["finance", "manager"],
    logoUsed: ClipboardList,
    page: CollectionsBillList,
  },
  {
    featureName: "ChatBot",
    displayName: "ChatBot",
    allowedRoles: ["finance", "manager", "employee"],
    logoUsed: Bot,
    page: Chatbot,
  },

  // Profile Page (should be last and assigned to only one role per feature)
  {
    featureName: "Profile",
    displayName: "Profile",
    allowedRoles: ["employee"],
    logoUsed: UserCircleIcon,
    page: UserProfile,
  },
  {
    featureName: "Profile",
    displayName: "Profile",
    allowedRoles: ["finance"],
    logoUsed: UserCircleIcon,
    page: FinanceProfile,
  },
  {
    featureName: "Profile",
    displayName: "Profile",
    allowedRoles: ["manager"],
    logoUsed: UserCircleIcon,
    page: ManagerProfile,
  },
];

export { features };
