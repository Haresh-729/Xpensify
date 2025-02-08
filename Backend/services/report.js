const { supabase } = require("../config/config");

const listBills = async (id, req) => {
  const { ec_id } = req.query;

  const { data: bills, error: billError } = await supabase
    .from("bills")
    .select(
      `
          b_id,
          vendor,
          date,
          final_amount,
          status,
          added_by,
          created_at,
          added_by_user:users!bills_added_by_fkey(name)
        `
    )
    .eq("ec_id", ec_id);

  if (billError) throw billError;

  const billsWithUserName = bills.map((bill) => {
    let statusText;
    if (bill.status === 0) {
      statusText = "Pending";
    } else if (bill.status === 1) {
      statusText = "Accepted";
    } else {
      statusText = "Rejected";
    }
    return {
      ...bill,
      status: statusText,
    };
  });

  return billsWithUserName;
};
const listUserBills = async (id, req) => {
  const { ec_id } = req.query;

  const { data: bills, error: billError } = await supabase
    .from("bills")
    .select(
      `
          b_id,
          vendor,
          date,
          final_amount,
          status,
          added_by,
          created_at,
          added_by_user:users!bills_added_by_fkey(name)
        `
    )
    .eq("ec_id", ec_id)
    .eq("added_by", id);

  if (billError) throw billError;

  const billsWithUserName = bills.map((bill) => {
    let statusText;
    if (bill.status === 0) {
      statusText = "Pending";
    } else if (bill.status === 1) {
      statusText = "Accepted";
    } else {
      statusText = "Rejected";
    }
    return {
      ...bill,
      status: statusText,
    };
  });

  return billsWithUserName;
};

const getBillDetails = async (id, req) => {
  const { b_id } = req.query;

    const { data: billData, error: billError } = await supabase
      .from("bills")
      .select("*")
      .eq("b_id", b_id)
      .single();

    if (billError || !billData) {
      return billError
    }

    // Fetch bill items
    const { data: billItems, error: billItemsError } = await supabase
      .from("bill_items")
      .select("*, category:categories(name)")
      .eq("b_id", b_id);

    if (billItemsError) {
      return billItemsError;
    }

    // Combine bill and items
    const response = {
      ...billData,
      items: billItems,
    };

    return response;
};

module.exports = {
  listBills,
  getBillDetails,
  listUserBills
};
