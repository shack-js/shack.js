import { Client } from '@elastic/elasticsearch'

const node = process.env.ELASTICSEARCH || 'http://localhost:9200'
export const client = new Client({ node })

const INDEX = 'cat'

export const init = async () => {
  if (!client.indices.exists({ index: INDEX })) {
    await client.indices.create({
      index: INDEX,
    })
  }
}

export const add = async (item) => {
  await client.index({
    index: INDEX,
    body: item
  })
}

export const findOne = async () => {
  return (await client.search({
    index: INDEX,
    size: 1,
  })).body.hits.hits[0]._source
}