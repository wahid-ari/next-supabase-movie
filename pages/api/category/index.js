import { supabase } from '@libs/supabase';

export default async function handler(req, res) {
  const { method, body, query } = req

  switch (method) {
    case "GET":
      if (!query.id) {
        const { data } = await supabase.from('categories')
          .select(`*`)
          .order('id');
        res.status(200).json(data);
      } else {
        const { data } = await supabase.from('categories')
          .select(`*, artists (*)`)
          .eq('id', query.id)
          .order('id');
        res.status(200).json(data);
      }
      break;

    case "POST":
      if (!body.name) {
        res.status(422).json({ error: "Name required" })
      } else {
        const { error } = await supabase.from('categories')
          .insert([{ name: body.name }])
        if (error) {
          res.status(422).json({ error: error.message })
        }
        res.status(200).json({ message: "Success add categories" });
      }
      break;

    case "PUT":
      if (!body.name) {
        res.status(422).json({ error: "Name required" })
      } else {
        const { error } = await supabase.from('categories')
          .update({ name: body.name })
          .eq('id', body.id)
        if (error) {
          res.status(422).json({ error: error.message })
        }
        res.status(201).json({ message: "Success update categories" });
      }
      break;

    case "DELETE":
      if (!query.id) {
        res.status(422).json({ error: "Id required" })
      } else {
        const { error } = await supabase.from('categories')
          .delete()
          .eq('id', query.id)
        if (error) {
          res.status(422).json({ error: error.message })
        }
        res.status(200).json({ message: "Success delete categories" });
      }
      break;

    default:
      res.status(200).json("Method required");
      break;
  }
}
