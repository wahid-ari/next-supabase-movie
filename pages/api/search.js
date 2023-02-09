import { supabase } from '@libs/supabase';

export default async function handler(req, res) {
  const { method, query } = req

  switch (method) {
    case "GET":
      if (!query.q) {
        res.status(200).json({ message: "Query Required" });
      }
      const { data: movies } = await supabase.from('movies')
        .select(`*`)
        .textSearch('name', `'${query.q}'`)
      const { data: actors } = await supabase.from('actors')
        .select(`*`)
        .textSearch('name', `'${query.q}'`)
      const { data: directors } = await supabase.from('directors')
        .select(`*`)
        .textSearch('name', `'${query.q}'`)
      const { data: studios } = await supabase.from('studios')
        .select(`*`)
        .textSearch('name', `'${query.q}'`)
      res.status(200).json({ movies, actors, directors, studios });
      break;

    default:
      res.status(200).json("Method required");
      break;
  }
}
