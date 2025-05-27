import { useRouteError } from "react-router-dom"

export default function Error() {
  const error = useRouteError()
  return (
    <h1>Something Went Wrong <br />{error.data}</h1>
  )
}
