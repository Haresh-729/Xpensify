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
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    // .eq("c_id", cat_id);

  if (error) throw error;
  if (!data.length) throw new Error("No category found");
  return data;
};

const createPolicy = async (eventData) => {

  const { event_id, event_name,cat_id,category, amount } = eventData;

  const { data, error } = await supabase
      .from("policies")
      .insert([
        {
          ec_id: event_id,
          c_id: cat_id,
          category: category, 
          data: amount ,
          name: event_name
        },
      ])
      .select("ec_id, c_id, category, data")
      .single();
    console.log(data);

    if (error) 
      throw error;
     
    return data;
};

const deletePolicyById = async (policy_id) => {

  const { error } = await supabase
      .from("policies")
      .delete()
      .eq("id", policy_id); // Match the policy by ID

    if (error) throw error;

};


const  getEventPoliciesFormatted = async () => {
  try {
    // Fetch policies for the given event_id
    const { data: policies, error: policyError } = await supabase
      .from("policies")
      .select("*")

    if (policyError) throw policyError;
    if (!policies.length) throw new Error("No policies found");

    let event_policies = {};

    for (const policy of policies) {
      const eventName = policy.name; // Assuming 'name' is the event name in the policies table

      if (!event_policies[eventName]) {
        event_policies[eventName] = {
          allowed_categories: [],
          category_limits: {},
          required_fields: ["reason"], // Default required field
        };
      }

      // Fetch category details
      const { data: categoryData, error: categoryError } = await supabase
        .from("categories")
        .select("*")
        .eq("c_id", policy.c_id)
        .single();

      if (categoryError) throw categoryError;

      // Add category data
      event_policies[eventName].allowed_categories.push(categoryData.name);
      event_policies[eventName].category_limits[categoryData.name] = policy.data; // Assuming 'data' stores the limit
    }

    return event_policies;
  } catch (err) {
    console.error("Error fetching event policies:", err.message);
    throw err;
  }
};



module.exports = {
  getEventPolicies,
  createPolicy,
  getCatagory,
  deletePolicyById,
  getEventPoliciesFormatted
};
