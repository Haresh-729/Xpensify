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

// userRoles = "manager", "finance", "employee"
const features = [
  {
    featureName: "Main",
    displayName: "Home",
    allowedRoles: ["employee"],
    logoUsed: HomeIcon,
    page: MainUser,
  },
  {
    featureName: "Main",
    displayName: "Home",
    allowedRoles: ["finance"],
    logoUsed: HomeIcon,
    page: MainFinance,
  },
  {
    featureName: "Main",
    displayName: "Home",
    allowedRoles: ["manager"],
    logoUsed: HomeIcon,
    page: MainManager,
  },

  // Features assigned to multiple roles
  {
    featureName: "Scan",
    displayName: "Create Expense",
    allowedRoles: ["employee", "finance", "manager"],
    logoUsed: CreditCardIcon,
    page: ScanBill,
  },
  {
    featureName: "Report",
    displayName: "Reports",
    allowedRoles: ["finance", "manager"],
    logoUsed: ChartBarIcon,
    page: CollectionListForReports,
  },
  {
    featureName: "Collections",
    displayName: "Collections",
    allowedRoles: ["finance", "manager"],
    logoUsed: ClipboardDocumentListIcon,
    page: Collections,
  },
  {
    featureName: "ChatBot",
    displayName: "ChatBot",
    allowedRoles: ["finance", "manager","employee"],
    logoUsed: UserIcon,
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
