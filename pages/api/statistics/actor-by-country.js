import { supabase } from '@libs/supabase';

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET':
      const { data: actors } = await supabase.from('actors').select(`*`).order('id');
      const { data: countries } = await supabase.from('countries').select(`*`).order('id');
      // Make an array of object structure
      let items = [];
      for (const country of countries) {
        items.push({
          id: country.id,
          label: country.name,
          total: 0,
        });
      }
      // console.log(items)
      // Count total actor that have same country
      let result = [];
      for (const item of items) {
        for (const actor of actors) {
          if (actor.country_id == item.id) {
            let filtered = items.filter((i) => i.id == actor.country_id)[0];
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
