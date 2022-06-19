import type { NextApiRequest, NextApiResponse } from 'next'

const fetchData = async (requestURL: string) => {
  // const res = await fetch('https://esco.ec.europa.eu/sites/default/files/cosmologist.json')
  const res = await fetch(requestURL)
  const data = await res.json()
  return data;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { requestURL } = req.query
  try {
    const result = await fetchData(requestURL as string)
    res.status(200).json(result)
  } catch (err) {
    res.status(500).json({ error: 'Failed to load data' })
  }
}
