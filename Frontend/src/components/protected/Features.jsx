import { useSelector } from "react-redux";
import { dashboardFeature, selectRole } from "../../app/DashboardSlice.js";
import { features } from "../../data/dynamic.js";

const Features = ({ healthData, recentRecords, ...ordersProps }) => {
  const role = useSelector(selectRole);
  const DFeatureState = useSelector(dashboardFeature);

  return (
    <>
      {features.map(
        (items, index) =>
          items.allowedRoles.includes(role) &&
          DFeatureState == items.featureName && (
            <div
              key={index}
              className={`flex items-start justify-center text-xl font-bold h-[87vh] overflow-y-auto scrollbar-hide pt-3`}
            >
              {<items.page />}
            </div>
          )
      )}
    </>
  );
};

export default Features;
