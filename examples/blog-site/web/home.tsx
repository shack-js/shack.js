import { Segment } from "semantic-ui-react"
import InfiniteScroll from 'react-infinite-scroll-component'
import { useEffect, useState } from "react"
import { list } from '../apis/article'
import MarkdownView from 'react-showdown'

const mdOptions = {
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true
}

export default () => {
  const [items, setItems] = useState([])
  const [hasMore, setHasMore] = useState(true)
  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    let before = items.length ? items[items.length - 1].created : new Date()
    let data = await list(before)
    if (data && data.length) {
      setItems(items.concat(data))
    }
    if (items.length < 10) {
      setHasMore(false)
    }
  }

  return <InfiniteScroll
    dataLength={items.length} //This is important field to render the next data
    next={fetchData}
    hasMore={hasMore}
    loader={<h4>Loading...</h4>}
    endMessage={
      <p style={{ textAlign: 'center' }}>
        <b>Yay! You have seen it all</b>
      </p>
    }
  >
    {items.map(row => {
      let { content, created, id } = row
      return <Segment key={id}>
        <h3>by {row['User.account'] || 'unknown'} at {created}</h3>
        <MarkdownView
          markdown={content}
          options={mdOptions}
        />
      </Segment>
    })}
  </InfiniteScroll>
}