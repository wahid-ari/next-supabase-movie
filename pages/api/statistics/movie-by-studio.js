import { supabase } from '@libs/supabase';

export default async function handler(req, res) {
  const { method } = req

  switch (method) {
    case "GET":
      const { data: movies } = await supabase.from('movies')
        .select(`*`)
        .order('id');
      const { data: studios } = await supabase.from('studios')
        .select(`*`)
        .order('id');
      // Make an array of object structure
      let items = []
      for (const studio of studios) {
        items.push({
          id: studio.id,
          label: studio.name,
          total: 0
        })
      }
      // console.log(items)
      // Count total movie that have same studio
      let result = []
      for (const item of items) {
        for (const movie of movies) {
          if (movie.studio_id == item.id) {
            let filtered = items.filter(i => i.id == movie.studio_id)[0]
            filtered.total += 1
            result.push(filtered)
          }
        }
      }
      // console.log(result)
      // Remove duplicate values from an array of objects in javascript
      // https://stackoverflow.com/questions/45439961/remove-duplicate-values-from-an-array-of-objects-in-javascript
      let data = result.reduce((unique, o) => {
        if (!unique.some(obj => obj.id === o.id)) {
          unique.push(o);
        }
        return unique;
      }, []);
      // console.log(data)
      res.status(200).json(data);
      break;

    default:
      res.status(200).json("Method required");
      break;
  }
}