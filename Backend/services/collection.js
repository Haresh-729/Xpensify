
const { supabase } = require("../config/config");
const { DateTime } = require("luxon");
const { CollectionsPDF } = require("./pdfGenerator/CollectionsPDF");

const createCollections = async (user_id, name, description, users) => {
  console.log("from services ", name, users, user_id);

  try {
    // Step 1: Insert into exp_collections
    const { data: collection, error: collectionError } = await supabase
      .from("exp_collections")
      .insert([{ name, description, created_by: user_id }])
      .select("ec_id")
      .single();

    if (collectionError) throw collectionError;

    const ec_id = collection.ec_id;
    console.log("Collection created with ID:", ec_id);

    // Step 2: Insert Participants into exp_collection_participants
    const participants = users.map((participantId) => ({
      ec_id,
      added_by: user_id,
      u_id: participantId
    }));

    const { error: participantsError } = await supabase
      .from("exp_collection_participants")
      .insert(participants);

    if (participantsError) throw participantsError;

    return { success: true, ec_id };
  } catch (error) {
    console.error("Error creating collection:", error);
    return { success: false, error };
  }
};

const getCollections = async () => {
  try {
    // Step 1: Fetch collections
    const { data: collections, error: collectionsError } = await supabase
      .from("exp_collections")
      .select("ec_id, name, description, created_by, created_at, status, approved_by, approved_at");

    if (collectionsError) throw collectionsError;

    // Step 2: Fetch participants for each collection
    const { data: participants, error: participantsError } = await supabase
      .from("exp_collection_participants")
      .select("ec_id, u_id, added_by, added_at, is_active");

    if (participantsError) throw participantsError;

    // Step 3: Combine collections with participants
    const collectionsWithParticipants = collections.map((collection) => ({
      ...collection,
      participants: participants.filter((p) => p.ec_id === collection.ec_id),
    }));

    return { success: true, data: collectionsWithParticipants };
  } catch (error) {
    console.error("Error fetching collections:", error);
    return { success: false, error };
  }
};

const getCreatedCollections = async (user_id) => {
  try {
    // Step 1: Fetch collections where the user is the creator
    const { data: createdCollections, error: createdError } = await supabase
      .from("exp_collections")
      .select("ec_id, name, description, created_by, created_at, status, approved_by, approved_at")
      .eq("created_by", user_id);

    if (createdError) throw createdError;

    // Step 2: Fetch collections where the user is a participant
    const { data: participantCollections, error: participantError } = await supabase
      .from("exp_collection_participants")
      .select("ec_id")
      .eq("u_id", user_id);

    if (participantError) throw participantError;

    // Extract collection IDs from the participant data
    const participantCollectionIds = participantCollections.map((p) => p.ec_id);

    // Step 3: Fetch full details of those collections (excluding already fetched ones)
    let additionalCollections = [];
    if (participantCollectionIds.length > 0) {
      const { data: extraCollections, error: extraError } = await supabase
        .from("exp_collections")
        .select("ec_id, name, description, created_by, created_at, status, approved_by, approved_at")
        .in("ec_id", participantCollectionIds)
        .neq("created_by", user_id); // Exclude if user is also the creator

      if (extraError) throw extraError;
      additionalCollections = extraCollections;
    }

    // Merge both sets of collections
    const allCollections = [...createdCollections, ...additionalCollections];

    if (allCollections.length === 0) {
      return { success: true, data: [], message: "No collections found for this user." };
    }

    // Step 4: Fetch participants for all retrieved collections
    const collectionIds = allCollections.map((c) => c.ec_id);
    const { data: participants, error: participantsError } = await supabase
      .from("exp_collection_participants")
      .select("ec_id, u_id, added_by, added_at, is_active")
      .in("ec_id", collectionIds);

    if (participantsError) throw participantsError;

    // Step 5: Attach participants to collections
    const collectionsWithParticipants = allCollections.map((collection) => ({
      ...collection,
      participants: participants.filter((p) => p.ec_id === collection.ec_id),
    }));

    return collectionsWithParticipants;
  } catch (error) {
    console.error("Error fetching user-specific collections:", error);
    return { success: false, error };
  }
};


const getUserParticipant = async (user_id) => {
  try {
    // Step 1: Fetch collections where the user is a participant (but NOT the creator)
    const { data: participantCollections, error: participantError } = await supabase
      .from("exp_collection_participants")
      .select("ec_id")
      .eq("u_id", user_id);

    if (participantError) throw participantError;

    if (participantCollections.length === 0) {
      return { success: true, data: [], message: "No collections found where the user is a participant." };
    }

    // Extract collection IDs
    const collectionIds = participantCollections.map((p) => p.ec_id);

    // Step 2: Fetch collection details where the user is a participant but NOT the creator
    const { data: collections, error: collectionsError } = await supabase
      .from("exp_collections")
      .select("ec_id, name, description, created_by, created_at, status, approved_by, approved_at")
      .in("ec_id", collectionIds)
      .neq("created_by", user_id); // Ensure user is not the creator

    if (collectionsError) throw collectionsError;

    // Step 3: Fetch participants for these collections
    const { data: participants, error: participantsError } = await supabase
      .from("exp_collection_participants")
      .select("ec_id, u_id, added_by, added_at, is_active")
      .in("ec_id", collectionIds);

    if (participantsError) throw participantsError;

    // Step 4: Attach participants to the collections
    const collectionsWithParticipants = collections.map((collection) => ({
      ...collection,
      participants: participants.filter((p) => p.ec_id === collection.ec_id),
    }));

    return { success: true, data: collectionsWithParticipants };
  } catch (error) {
    console.error("Error fetching participant-only collections:", error);
    return { success: false, error };
  }
};


// const getCollectionsTrigger = async (days, detailed) => {
//   try {
//     const pastDate = DateTime.now().minus({ days: Number(days) }).toISO();

//     // Step 1: Fetch collections
//     const { data: collections, error: collectionsError } = await supabase
//       .from("exp_collections")
//       .select("ec_id, name, description, created_by, created_at, status, approved_by, approved_at")
//       .gte("created_at", pastDate);

//     if (collectionsError) throw collectionsError;

//     if (collections.length === 0) return { success: true, data: [] };

//     // Step 2: Fetch participants
//     const collectionIds = collections.map((c) => c.ec_id);
//     const { data: participants, error: participantsError } = await supabase
//       .from("exp_collection_participants")
//       .select("*") // Fetching all columns for debugging
//       .in("ec_id", collectionIds);

//     if (participantsError) throw participantsError;

//     console.log("🔍 Fetched Participants:", JSON.stringify(participants, null, 2));

//     // Step 3: Combine collections with participants
//     const collectionsWithParticipants = collections.map((collection) => ({
//       ...collection,
//       participants: participants.filter((p) => p.ec_id === collection.ec_id) || [],
//     }));

//     console.log("✅ Final Output:", JSON.stringify(collectionsWithParticipants, null, 2));
//     return { success: true, data: collectionsWithParticipants };

//   } catch (error) {
//     console.error("❌ Error fetching collections:", error);
//     return { success: false, error: error.message };
//   }
// };

const getCollectionsTrigger = async (days, detailed) => {
  try {
    const interval = `${days} days`; // Dynamic interval

    const query = `
      SELECT 
          ec.ec_id, 
          ec.name, 
          ec.description, 
          ec.created_at, 
          ec.status, 
          ec.approved_by, 
          ec.approved_at, 
          u.name AS created_by_name, 
          COALESCE(
              JSONB_AGG(DISTINCT up.name) FILTER (WHERE up.name IS NOT NULL), '[]'
          ) AS participants
      FROM 
          exp_collections ec
      JOIN 
          users u ON ec.created_by = u.u_id
      LEFT JOIN 
          exp_collection_participants ep ON ec.ec_id = ep.ec_id
      LEFT JOIN 
          users up ON ep.u_id = up.u_id
      WHERE 
          ec.created_at >= NOW() - INTERVAL '${interval}'
      GROUP BY 
          ec.ec_id, u.name
      ORDER BY 
          ec.created_at DESC;
    `;

    const { data, error } = await supabase.rpc('execute_raw_sql', { query });

    if (error) throw error;

    console.log("✅ Final Output:", JSON.stringify(data, null, 2));

    return { success: true, data };

  } catch (error) {
    console.error("❌ Error fetching collections:", error);
    return { success: false, error };
  }
};


const reportTriggering = async (days, detailed) => {
  try {
    console.log(days, detailed);
    const { success, data } = await getCollectionsTrigger(days, detailed);

    if (!success) throw new Error("Failed to fetch collections");

    // Save PDF inside ./services/generatedReports with correct naming
    const pdfPath = await CollectionsPDF(data, days);

    return { success: true, pdfPath }; // Return PDF file path
  } catch (error) {
    console.error("Error Generating PDF collections:", error);
    return { success: false, error };
  }
};

module.exports = {
    createCollections, getCollections, getCreatedCollections, getUserParticipant, getCollectionsTrigger, reportTriggering 

}