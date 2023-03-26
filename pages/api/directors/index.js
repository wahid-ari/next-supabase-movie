import { supabase } from '@libs/supabase';

export default async function handler(req, res) {
  const { method, body, query } = req;

  switch (method) {
    case 'GET':
      const { data } = await supabase.from('directors').select(`*`).order('id');
      res.status(200).json(data);
      break;

    default:
      res.status(200).json('Method required');
      break;
  }
}
