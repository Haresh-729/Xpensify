import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getDeteiledProfile } from "../../../services/repository/profileRepo";
import { getAfterFetchEmpty } from '../../../app/ProfileSlice';
import DynamicCard from "../../utils/TabCard";
import EventsGrid from '../finance/Events';

const tabs = ["Display Profile","Add Profile"];

const Profile = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(()=>{
        dispatch(getDeteiledProfile(navigate));
    }, []);

    const flag = true;//useSelector(getAfterFetchEmpty);

    const [activeTab, setActiveTab] = useState(tabs[0]);

    const [previewData, setPreviewData] = useState(null);
      const handlePreview = (data) => {
        setPreviewData(data);
        // You can now handle this data, e.g., show it in a modal, log it, etc.
      };
      const displayContent = () => {
        return(
          <div>Hello Display Card</div>
        );
      }

    const formData = [
        {
          tab: "Display Profile",
          isEdit: 0,
          sections: [],
          buttons: [],
          displayContent: EventsGrid
        },
        {
          tab: "Add Profile",
          isEdit: 1,
          sections: [
            {
              subHeading: "Personal Documents",
              rows: [
                {
                  colNos: 2,
                  smColNos: 1,
                  cols: [
                    {
                      label: "Aadhar No.:",
                      placeholder: "Ex. 1234 4567 8901 2345...",
                      element: "input",
                      type: "text",
                    },
                    {
                      label: "PAN No.:",
                      placeholder: "Ex. ABC458OX45PX...",
                      element: "input",
                      type: "text",
                    },
                  ],
                },
              ],
            },
            {
              subHeading: "Bank Information",
              rows: [
                {
                  colNos: 3,
                  smColNos: 1,
                  cols: [
                    {
                      label: "IFC:",
                      placeholder: "Ex.ICIC02343...",
                      type: "text",
                      element: "input",
                    },
                    {
                      label: "Bank Name:",
                      placeholder: "Ex.ICIC Bank",
                      type: "text",
                      element: "input",
                    },
                    {
                      label: "Branch Name:",
                      placeholder: "Ex.Thane",
                      type: "text",
                      element: "input",
                    },
                  ],
                },
              ],
            },
            {
              subHeading: "Address",
              rows: [
                {
                  colNos: 3,
                  smColNos: 1,
                  cols: [
                    {
                      label: "Room No. Building:",
                      placeholder: "Ex.001, Ramkunj CHS...",
                      type: "text",
                      element: "input",
                    },
                    {
                      label: "Area, Street:",
                      placeholder: "Ex. Amar Nagar, AP Road...",
                      type: "text",
                      element: "input",
                    },
                    {
                      label: "Landmark, City:",
                      placeholder: "Ex.Opp. VP tower, Andheri...",
                      type: "text",
                      element: "input",
                    },
                  ],
                },
                {
                  colNos: 2,
                  smColNos: 1,
                  cols: [
                    {
                      label: "Pin Code:",
                      placeholder: "Ex. 458234...",
                      type: "number",
                      element: "input",
                    },
                    {
                      label: "State:",
                      placeholder: "Ex. Maharashtra...",
                      type: "text",
                      element: "input",
                    },
                  ],
                },
              ],
            },
          ],
          buttons: [
            {
              text: "Preview",
              styling: "bg-green text-white px-2 py-1 rounded-[.5rem]",
            },
            {
              text: "Add",
              styling: "bg-dark-blue text-yellow px-2 py-1 rounded-[.5rem]",
            },
          ],
        },
      ];
    
  return (
    <>
        {flag ? <div>
            <>
      <DynamicCard
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        content={formData}
        onPreview={handlePreview}
      />

      {previewData && (
        <div className="preview-modal">
          <h3>Preview Data:</h3>
          <pre>{JSON.stringify(previewData, null, 2)}</pre>
        </div>
      )}
    </>
        </div> : <div>Data Available Display card.</div>}
    </>
  )
}

export default Profile