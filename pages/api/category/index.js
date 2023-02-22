import { supabase } from '@libs/supabase';

export default async function handler(req, res) {
  const { method, body, query } = req;

  switch (method) {
    case 'GET':
      if (!query.id) {
        const { data } = await supabase.from('categories').select(`*`).order('id');
        res.status(200).json(data);
      } else {
        const { data: categories } = await supabase.from('categories').select(`*`).eq('id', query.id).order('id');
        const { data: movie_categories } = await supabase
          .from('movie_categories')
          .select(`*`)
          .eq('category_id', query.id)
          .order('id');
        const { data: movies } = await supabase.from('movies').select(`*`).order('id');

        let movie_by_category = [];
        for (const a of movie_categories) {
          for (const b of movies) {
            if (a.movie_id == b.id) {
              movie_by_category.push({
                ...b,
              });
            }
          }
        }
        const data = categories[0];
        // https://nextjs.org/docs/api-reference/next.config.js/headers#cache-control
        res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59');
        res.status(200).json({ ...data, movies: movie_by_category });
      }
      break;

    case 'POST':
      if (!body.name) {
        res.status(422).json({ error: 'Name required' });
      } else {
        const { error } = await supabase.from('categories').insert([{ name: body.name }]);
        if (error) {
          res.status(422).json({ error: error.message });
        }
        res.status(200).json({ message: 'Success add categories' });
      }
      break;

    case 'PUT':
      if (!body.name) {
        res.status(422).json({ error: 'Name required' });
      } else {
        const { error } = await supabase.from('categories').update({ name: body.name }).eq('id', query.id);
        if (error) {
          res.status(422).json({ error: error.message });
        }
        res.status(201).json({ message: 'Success update categories' });
      }
      break;

    case 'DELETE':
      if (!query.id) {
        res.status(422).json({ error: 'Id required' });
      } else {
        const { error } = await supabase.from('categories').delete().eq('id', query.id);
        if (error) {
          res.status(422).json({ error: error.message });
        }
        res.status(200).json({ message: 'Success delete categories' });
      }
      break;

    default:
      res.status(200).json('Method required');
      break;
  }
}
