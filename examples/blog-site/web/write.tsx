import { Link, Redirect, useHistory } from "react-router-dom";
import { Button, Loader } from "semantic-ui-react";
import { user } from './stores'
import "react-mde/lib/styles/css/react-mde-all.css"
import ReactMde from "react-mde"
import { useState } from "react"
import * as Showdown from "showdown"
import { add } from '../apis/authed/article'

const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true
})

export default () => {
  const [userObj] = user.use()
  const [value, setValue] = useState("**Hello world!!!**");
  const [selectedTab, setSelectedTab] = useState<"write" | "preview">("write");
  const history = useHistory()
  const [loading, setLoading] = useState(false)

  if (!userObj) return <Redirect to="/" />

  return <>
    <ReactMde
      value={value}
      onChange={setValue}
      selectedTab={selectedTab}
      onTabChange={setSelectedTab}
      generateMarkdownPreview={markdown =>
        Promise.resolve(converter.makeHtml(markdown))
      }
    />
    <div>
      {loading ? <Loader /> : <Button onClick={async () => {
        try {
          setLoading(true)
          await add(value)
          history.push('/')
        } catch (e) {
          alert(e.toString())
        } finally {
          setLoading(false)
        }
      }} >save</Button>}
      <Link to="/">back to home</Link>
    </div>
  </>
}