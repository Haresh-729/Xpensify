const { supabase } = require("../config/config");

require("dotenv").config();

const uploadBills = async (id,req) => {    
  const {
    vendor_name,
    date,
    final_amount,
    items,
    added_by,
    status,
    verified_by,
    verified_at,
    ed_id,
  } = req.body;
  

  const { data: billData, error: billError } = await supabase
    .from("bills")
    .insert([
      {
        vendor: vendor_name,
        date,
        final_amount,
        added_by,
        status: status || 0,
        remark: null,
        verified_by: verified_by,
        verified_at: verified_at,
        created_at: new Date(),
        ec_id: ed_id,
      },
    ])
    .select();

  if (billError) {
    throw billError;
  }

  const billId = billData[0].b_id;

  const billItems = [];

  for (const item of items) {
    let categoryId = null;

    if (item.category != 'N/A') {
      const { data: categoryData, error: categoryError } = await supabase
        .from("categories")
        .select("c_id")
        .eq("name", item.category)
        .single();

      if (categoryError) {
        console.error(`Category "${item.category}" not found.`, categoryError);
      } else {
        categoryId = categoryData?.c_id;
      }
    }
    console.log(item.category);
    

    // Push the item with the resolved category ID
    billItems.push({
      name: item.item_name,
      c_id: categoryId,
      qty: item.quantity,
      rate: item.price,
      unit_id: 1, // Static or pre-defined value as per your requirement
      b_id: billId,
      reason: item.remark || null,
      is_cat_gen: !!item.predicted_cat,
      predicted_cat: item.predicted_cat || null,
      created_at: new Date(),
    });
  }
  // Insert into the `bill_items` table
  const { error: itemError } = await supabase
    .from("bill_items")
    .insert(billItems);

  if (itemError) {
    throw itemError;
  }

  return billData;
};

module.exports = {
  uploadBills,
};
