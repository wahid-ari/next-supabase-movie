import useSWR from 'swr';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const API_URL = `${process.env.API_ROUTE}/api`;

export function useMovieData(id) {
  const { data, error, isLoading } = useSWR(id ? `${API_URL}/movie?id=${id}` : `${API_URL}/movie`, fetcher);
  return { data, error, isLoading };
}

export function useActorData(id) {
  const { data, error, isLoading } = useSWR(id ? `${API_URL}/actor?id=${id}` : `${API_URL}/actor`, fetcher);
  return { data, error, isLoading };
}

export function useDirectorData(id) {
  const { data, error, isLoading } = useSWR(id ? `${API_URL}/director?id=${id}` : `${API_URL}/director`, fetcher);
  return { data, error, isLoading };
}

export function useCategoryData(id) {
  const { data, error, isLoading } = useSWR(id ? `${API_URL}/category?id=${id}` : `${API_URL}/category`, fetcher);
  return { data, error, isLoading };
}

export function useCountryData(id) {
  const { data, error, isLoading } = useSWR(id ? `${API_URL}/country?id=${id}` : `${API_URL}/country`, fetcher);
  return { data, error, isLoading };
}

export function useStudioData(id) {
  const { data, error, isLoading } = useSWR(id ? `${API_URL}/studio?id=${id}` : `${API_URL}/studio`, fetcher);
  return { data, error, isLoading };
}
