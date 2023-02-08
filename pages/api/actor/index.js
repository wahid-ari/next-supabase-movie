import { supabase } from '@libs/supabase';

export default async function handler(req, res) {
  const { method, body, query } = req

  switch (method) {
    case "GET":
      if (!query.id) {
        const { data } = await supabase.from('actors')
          .select(`*, countries (*)`)
          .order('id');
        res.status(200).json(data);
      } else {
        const { data: actors } = await supabase.from('actors')
          .select(`*, countries (*)`)
          .eq('id', query.id)
          .order('id');
        const { data: movie_actors } = await supabase.from('movie_actors')
          .select(`*`)
          .eq('actor_id', query.id)
          .order('id');
        const { data: movies } = await supabase.from('movies')
          .select(`*`)
          .order('id');

        let movie_by_actor = []
        for (const a of movie_actors) {
          for (const b of movies) {
            if (a.movie_id == b.id) {
              movie_by_actor.push({
                ...b
              })
            }
          }
        }
        const data = actors[0]
        res.status(200).json({ ...data, movies: movie_by_actor });
      }
      break;

    case "POST":
      if (!body.name) {
        res.status(422).json({ error: "Name required" })
      } else {
        const { error } = await supabase.from('actors')
          .insert([
            {
              name: body.name,
              image_url: body.image_url,
              gender: body.gender,
              biography: body.biography,
              birthday: body.birthday,
              instagram_url: body.instagram_url,
              twitter_url: body.twitter_url,
              country_id: body.country_id
            }
          ])
        if (error) {
          res.status(422).json({ error: error.message })
        }
        res.status(200).json({ message: "Success add actors" });
      }
      break;

    case "PUT":
      if (!body.name) {
        res.status(422).json({ error: "Name required" })
      } else {
        const { error } = await supabase.from('actors')
          .update({
            name: body.name,
            image_url: body.image_url,
            gender: body.gender,
            biography: body.biography,
            birthday: body.birthday,
            instagram_url: body.instagram_url,
            twitter_url: body.twitter_url,
            country_id: body.country_id
          })
          .eq('id', query.id)
        if (error) {
          res.status(422).json({ error: error.message })
        }
        res.status(201).json({ message: "Success update actors" });
      }
      break;

    case "DELETE":
      if (!query.id) {
        res.status(422).json({ error: "Id required" })
      } else {
        const { error } = await supabase.from('actors')
          .delete()
          .eq('id', query.id)
        if (error) {
          res.status(422).json({ error: error.message })
        }
        res.status(200).json({ message: "Success delete actors" });
      }
      break;

    default:
      res.status(200).json("Method required");
      break;
  }
}
