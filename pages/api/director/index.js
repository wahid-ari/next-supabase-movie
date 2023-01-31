import { supabase } from '@libs/supabase';

export default async function handler(req, res) {
  const { method, body, query } = req

  switch (method) {
    case "GET":
      if (!query.id) {
        const { data } = await supabase.from('directors')
          .select(`*, countries (*)`)
          .order('id');
        res.status(200).json(data);
      } else {
        const { data } = await supabase.from('directors')
          .select(`*, countries (*)`)
          .eq('id', query.id)
          .order('id');
        res.status(200).json(data);
      }
      break;

    case "POST":
      if (!body.name) {
        res.status(422).json({ error: "Name required" })
      } else {
        const { error } = await supabase.from('directors')
          .insert([
            {
              name: body.name,
              image_url: body.image_url,
              gender: body.gender,
              biography: body.biography,
              country_id: body.country_id
            }
          ])
        if (error) {
          res.status(422).json({ error: error.message })
        }
        res.status(200).json({ message: "Success add directors" });
      }
      break;

    case "PUT":
      if (!body.name) {
        res.status(422).json({ error: "Name required" })
      } else {
        const { error } = await supabase.from('directors')
          .update({
            name: body.name,
            image_url: body.image_url,
            gender: body.gender,
            biography: body.biography,
            country_id: body.country_id
          })
          .eq('id', body.id)
        if (error) {
          res.status(422).json({ error: error.message })
        }
        res.status(201).json({ message: "Success update directors" });
      }
      break;

    case "DELETE":
      if (!query.id) {
        res.status(422).json({ error: "Id required" })
      } else {
        const { error } = await supabase.from('directors')
          .delete()
          .eq('id', query.id)
        if (error) {
          res.status(422).json({ error: error.message })
        }
        res.status(200).json({ message: "Success delete directors" });
      }
      break;

    default:
      res.status(200).json("Method required");
      break;
  }
}
