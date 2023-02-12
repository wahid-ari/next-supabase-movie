import { supabase } from '@libs/supabase';

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET':
      const { data: movies } = await supabase
        .from('movies')
        .select(`*`)
        .order('id');
      const { data: directors } = await supabase
        .from('directors')
        .select(`*`)
        .order('id');
      // Make an array of object structure
      let items = [];
      for (const director of directors) {
        items.push({
          id: director.id,
          label: director.name,
          total: 0,
        });
      }
      // console.log(items)
      // Count total movie that have same director
      let result = [];
      for (const item of items) {
        for (const movie of movies) {
          if (movie.director_id == item.id) {
            let filtered = items.filter((i) => i.id == movie.director_id)[0];
            filtered.total += 1;
            result.push(filtered);
          }
        }
      }
      // console.log(result)
      // Remove duplicate values from an array of objects in javascript
      // https://stackoverflow.com/questions/45439961/remove-duplicate-values-from-an-array-of-objects-in-javascript
      let data = result.reduce((unique, o) => {
        if (!unique.some((obj) => obj.id === o.id)) {
          unique.push(o);
        }
        return unique;
      }, []);
      // console.log(data)
      let sortedData = data.sort((a, b) => b.total - a.total).slice(0, 10);
      res.status(200).json(sortedData);
      break;

    default:
      res.status(200).json('Method required');
      break;
  }
}
