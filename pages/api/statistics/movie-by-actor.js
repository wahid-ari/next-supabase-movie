import { supabase } from '@libs/supabase';

export default async function handler(req, res) {
  const { method } = req

  switch (method) {
    case "GET":
      const { data: movie_actors } = await supabase.from('movie_actors')
        .select(`*`)
        .order('id');
      const { data: actors } = await supabase.from('actors')
        .select(`*`)
        .order('id');
      // Make an array of object structure
      let items = []
      for (const actor of actors) {
        items.push({
          id: actor.id,
          label: actor.name,
          total: 0
        })
      }
      // console.log(items)
      // Count total movie that have same actor
      let result = []
      for (const item of items) {
        for (const movie of movie_actors) {
          if (movie.actor_id == item.id) {
            let filtered = items.filter(i => i.id == movie.actor_id)[0]
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