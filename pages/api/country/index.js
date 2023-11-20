import { supabase } from '@libs/supabase';

export default async function handler(req, res) {
  const { method, body, query } = req;

  switch (method) {
    case 'GET':
      if (!query.id) {
        const { data } = await supabase.from('countries').select(`*`).order('id');
        res.status(200).json(data);
        return;
      } else {
        const { data } = await supabase
          .from('countries')
          .select(`*, actors (*), directors (*), studios (*)`)
          .eq('id', query.id)
          .order('id');
        // https://nextjs.org/docs/api-reference/next.config.js/headers#cache-control
        res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59');
        res.status(200).json(data[0]);
      }
      break;

    case 'POST':
      if (!body.name) {
        res.status(422).json({ error: 'Name required' });
        return;
      } else {
        const { error } = await supabase.from('countries').insert([{ name: body.name }]);
        if (error) {
          res.status(422).json({ error: error.message });
          return;
        }
        res.status(200).json({ message: 'Success add countries' });
      }
      break;

    case 'PUT':
      if (!body.name) {
        res.status(422).json({ error: 'Name required' });
        return;
      } else {
        const { error } = await supabase.from('countries').update({ name: body.name }).eq('id', query.id);
        if (error) {
          res.status(422).json({ error: error.message });
          return;
        }
        res.status(201).json({ message: 'Success update countries' });
      }
      break;

    case 'DELETE':
      if (!query.id) {
        res.status(422).json({ error: 'Id required' });
        return;
      } else {
        const { error } = await supabase.from('countries').delete().eq('id', query.id);
        if (error) {
          res.status(422).json({ error: error.message });
          return;
        }
        res.status(200).json({ message: 'Success delete countries' });
      }
      break;

    default:
      res.status(200).json('Method required');
      break;
  }
}
