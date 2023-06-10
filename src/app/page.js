import Login from './components/loginForm'
import Dashboard from './dashboard/page';

export default function Home() {
  // return (<Login></Login>)
  let user = false;
  if (!user) {
    return (
      <Login></Login>
    )
  } else {
    return (<Dashboard></Dashboard>)
  }
}
