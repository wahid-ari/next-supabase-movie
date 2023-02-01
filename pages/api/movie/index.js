import { supabase } from '@libs/supabase';

export default async function handler(req, res) {
  const { method, body, query } = req

  switch (method) {
    case "GET":
      if (!query.id) {
        const { data } = await supabase.from('movies')
          .select(`*, directors (*), studios (*), movie_categories (*)`)
          .order('id');
        res.status(200).json(data);
      } else {
        const { data } = await supabase.from('movies')
          .select(`*, directors (*), studios (*), movie_categories (*)`)
          .eq('id', query.id)
          .order('id');
        res.status(200).json(data);
      }
      break;

    case "POST":
      if (!body.name) {
        res.status(422).json({ error: "Name required" })
      } else {
        // insert a movie
        const { data, error } = await supabase.from('movies')
          .insert([
            {
              name: body.name,
              description: body.description,
              image_url: body.image_url,
              video_url: body.video_url,
              release_date: body.release_date,
              language: body.language,
              status: body.status,
              director_id: body.director_id,
              studio_id: body.studio_id,
            }
          ])
          .select()
        if (error) {
          res.status(422).json({ error: error.message })
        }
        // get movie id after inserting
        const movieId = data[0].id

        // if new movie have categories 
        if (body.categories?.length > 0) {
          // create array of categories of a movie
          let categories = []
          body.categories.forEach(item => {
            categories.push({
              movie_id: movieId,
              category_id: item.value
            })
          })
          // insert categories of a movie to movie_categories table
          const { error } = await supabase.from('movie_categories')
            .insert(categories)
          if (error) {
            res.status(422).json({ error: error.message })
          }
        }

        // if new movie have actors 
        if (body.actors?.length > 0) {
          // create array of actors of a movie
          let actors = []
          body.actors.forEach(item => {
            actors.push({
              movie_id: movieId,
              category_id: item.value
            })
          })
          // insert actors of a movie to movie_actors table
          const { error } = await supabase.from('movie_actors')
            .insert(actors)
          if (error) {
            res.status(422).json({ error: error.message })
          }
        }

        res.status(200).json({ message: "Success add movies" });
      }
      break;

    case "PUT":
      if (!body.name) {
        res.status(422).json({ error: "Name required" })
      } else {
        // edit a movie
        const { error } = await supabase.from('movies')
          .update({
            name: body.name,
            description: body.description,
            image_url: body.image_url,
            video_url: body.video_url,
            release_date: body.release_date,
            language: body.language,
            status: body.status,
            director_id: body.director_id,
            studio_id: body.studio_id,
          })
          .eq('id', query.id)
        if (error) {
          res.status(422).json({ error: error.message })
        }

        // delete categories related to edited movie
        const { error: errorMovieCategory } = await supabase.from('movie_categories')
          .delete()
          .eq('movie_id', query.id)
        if (errorMovieCategory) {
          res.status(422).json({ error: errorMovieCategory.message })
        }

        // if edited movie have categories 
        if (body.categories?.length > 0) {
          // create array of categories of a edited movie
          let categories = []
          body.categories.forEach(item => {
            categories.push({
              movie_id: query.id,
              category_id: item.value
            })
          })
          // insert categories of a edited movie to movie_categories table
          const { error } = await supabase.from('movie_categories')
            .insert(categories)
          if (error) {
            res.status(422).json({ error: error.message })
          }
        }

        // delete categories related to edited movie
        const { error: errorMovieActor } = await supabase.from('movie_actors')
          .delete()
          .eq('movie_id', query.id)
        if (errorMovieActor) {
          res.status(422).json({ error: errorMovieActor.message })
        }

        // if edited movie have actors 
        if (body.actors?.length > 0) {
          // create array of actors of a edited movie
          let actors = []
          body.actors.forEach(item => {
            actors.push({
              movie_id: movieId,
              category_id: item.value
            })
          })
          // insert actors of a edited movie to movie_actors table
          const { error } = await supabase.from('movie_actors')
            .insert(actors)
          if (error) {
            res.status(422).json({ error: error.message })
          }
        }

        res.status(201).json({ message: "Success update movies" });
      }
      break;

    case "DELETE":
      if (!query.id) {
        res.status(422).json({ error: "Id required" })
      } else {
        // delete categories related to movie in movie_categories table
        const { error: errorMovieCategory } = await supabase.from('movie_categories')
          .delete()
          .eq('movie_id', query.id)
        // delete actors related to movie in movie_actors table
        const { error: errorMovieActor } = await supabase.from('movie_actors')
          .delete()
          .eq('movie_id', query.id)
        // finally delete movie
        const { error } = await supabase.from('movies')
          .delete()
          .eq('id', query.id)
        if (error || errorMovieCategory || errorMovieActor) {
          res.status(422).json({ error: error.message })
        }
        res.status(200).json({ message: "Success delete movies" });
      }
      break;

    default:
      res.status(200).json("Method required");
      break;
  }
}
