const { supabase } = require("../config/config");

const getEventPolicies = async (event_id) => {
  const { data, error } = await supabase
    .from("policies")
    .select("*")
    .eq("ec_id", event_id);

  if (error) throw error;
  if (!data.length) throw new Error("No policies found");
  return data;
};

const getCatagory = async (cat_id) => {
  const { data, error } = await supabase.from("categories").select("*");
  // .eq("c_id", cat_id);

  if (error) throw error;
  if (!data.length) throw new Error("No category found");
  return data;
};

const createPolicy = async (eventData) => {
  const { ec_id, name, c_id, category, amount } = eventData;

  const { data, error } = await supabase
    .from("policies")
    .insert([
      {
        ec_id: ec_id,
        c_id: c_id,
        category: category,
        data: amount,
        name: name,
      },
    ])
    .select("ec_id, c_id, category, data")
    .single();
  console.log(data);

  if (error) throw error;

  return data;
};

const deletePolicyById = async (policy_id) => {
  console.log(policy_id);

  const { error } = await supabase
    .from("policies")
    .delete()
    .eq("p_id", policy_id); // Match the policy by ID

  if (error) throw error;
};

const getEventPoliciesFormatted = async (req, res) => {
  // try {
  // Fetch policies for the given event_id
  //   const { data: policies, error: policyError } = await supabase
  //     .from("policies")
  //     .select("*")

  //   if (policyError) throw policyError;
  //   if (!policies.length) throw new Error("No policies found");

  //   let event_policies = {};

  //   for (const policy of policies) {
  //     const eventName = policy.name; // Assuming 'name' is the event name in the policies table

  //     if (!event_policies[eventName]) {
  //       event_policies[eventName] = {
  //         allowed_categories: [],
  //         category_limits: {},
  //         required_fields: ["reason"], // Default required field
  //       };
  //     }

  //     // Fetch category details
  //     const { data: categoryData, error: categoryError } = await supabase
  //       .from("categories")
  //       .select("*")
  //       .eq("c_id", policy.c_id)
  //       .single();

  //     if (categoryError) throw categoryError;

  //     // Add category data
  //     event_policies[eventName].allowed_categories.push(categoryData.name);
  //     event_policies[eventName].category_limits[categoryData.name] = policy.data; // Assuming 'data' stores the limit
  //   }

  //   return event_policies;
  // } catch (err) {
  //   console.error("Error fetching event policies:", err.message);
  //   throw err;
  // }

  const { ec_id } = req.query;

  if (!ec_id) {
    return "ec_id is required";
  }

    // Fetch the event name for the given ec_id from events table
    const { data: eventData, error: eventError } = await supabase
      .from("exp_collections")
      .select("name")
      .eq("ec_id", ec_id)
      .single();

    if (eventError) throw eventError;

    const eventName = eventData?.name;

    // Fetch policies data
    const { data: policiesData, error: policiesError } = await supabase
      .from("policies")
      .select("ec_id, name, category, data")
      .eq("ec_id", ec_id);

    if (policiesError) throw policiesError;

    const policiesResponse = {};
    policiesData.forEach((policy) => {
      if (!policiesResponse[policy.ec_id]) {
        policiesResponse[policy.ec_id] = {
          allowed_categories: [],
          category_limits: [],
        };
      }
      policiesResponse[policy.ec_id].allowed_categories.push(policy.category);
      policiesResponse[policy.ec_id].category_limits.push(policy.data);
    });

    // Fetch bills for the ec_id
    const { data: billsData, error: billsError } = await supabase
      .from("bills")
      .select("b_id")
      .eq("ec_id", ec_id);

    if (billsError) throw billsError;

    const billIds = billsData.map((bill) => bill.b_id);

    // Fetch bill items and their associated category names
    const { data: billItemsData, error: billItemsError } = await supabase
      .from("bill_items")
      .select(
        `
      name, 
      c_id, 
      amount, 
      reason, 
      predicted_cat, 
      categories(name)
    `
      )
      .in("b_id", billIds);

    if (billItemsError) throw billItemsError;

    const billItemsResponse = billItemsData.map((item) => ({
      event: eventName || ec_id,
      category:
        item.categories?.name ||item.predicted_cat,
      amount: item.amount,
      remarks: item.reason,
    }));

    // Combine and return both responses
    return {
      policies: policiesResponse,
      billItems: billItemsResponse,
    };

};

module.exports = {
  getEventPolicies,
  createPolicy,
  getCatagory,
  deletePolicyById,
  getEventPoliciesFormatted,
};
