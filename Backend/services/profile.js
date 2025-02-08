const { supabase } = require("../config/config");
const { DateTime } = require("luxon");

const getProfileDetails = async (user_id) => {
  // Fetch the user by user_id
//   console.log(user_id);
  const { data, error } = await supabase
    .from("user_details")
    .select("ud_id, aadhar_no, pan, account, ifsc, bank_name, branch, add_1, add_2, add_3, pin_code, state")
    .eq("u_id", user_id);

  if (error) throw error;
  let status = false;
  let profileData;

  if (!data.length) {
    status = false;
  }else{
    status = true;
    profileData = data[0];
  }

  // console.log(user);
  return {status, profileData};
};

module.exports = {
    getProfileDetails,

}