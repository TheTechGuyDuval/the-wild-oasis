
import supabase, { supabaseUrl } from "./supabase";

//function to get all cabins
export async function getCabins() {
  let { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }
  return data;
}

export async function deletecabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.error(error);
    throw new Error("Cabins could not be deleted");
  }

  return data;
}

export async function createEditCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  // https://vlrkgbehrmwtkoyykgas.supabase.co/storage/v1/object/public/cabin-images/0.19252513450266506-cabin-008.jpg
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  //1) create/edit cabin if no id or id
  let query = supabase.from("cabins");
  //A) create
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  //B) Edit
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

  const { error, data } = await query.select().single();
  if (error) {
    console.error(error);
    throw new Error("Cabins could not be created");
  }

  //2) upload image if no error
  if (hasImagePath) return data;

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  //Delete cabin if there was an error uploading image
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.log(storageError);
    throw new Error(
      "Cabin could not be uploaded and the cabin was not created"
    );
  }
  return data;
}
