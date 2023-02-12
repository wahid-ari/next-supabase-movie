import { supabase } from '@libs/supabase';

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET':
      const { data: categories } = await supabase
        .from('categories')
        .select(`*`)
        .order('id');
      const { data: movie_categories } = await supabase
        .from('movie_categories')
        .select(`*`)
        .order('id');

      // console.log(categories)
      let items = [];
      for (const x of categories) {
        items.push({
          id: x.id,
          name: x.name,
          total: 0,
        });
      }
      // console.log(items)
      let categories_movie_count = [];
      for (const a of items) {
        for (const b of movie_categories) {
          if (a.id == b.category_id) {
            let filtered = items.filter((i) => i.id == b.category_id)[0];
            filtered.total += 1;
            categories_movie_count.push(filtered);
          }
        }
      }
      // console.log(categories_movie_count)
      // Remove duplicate values from an array of objects in javascript
      // https://stackoverflow.com/questions/45439961/remove-duplicate-values-from-an-array-of-objects-in-javascript
      let data = categories_movie_count.reduce((unique, o) => {
        if (!unique.some((obj) => obj.id === o.id)) {
          unique.push(o);
        }
        return unique;
      }, []);

      data.sort((a, b) => b.total - a.total);

      res.status(200).json(data);

      break;

    default:
      res.status(200).json('Method required');
      break;
  }
}
