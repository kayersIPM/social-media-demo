import { DataStore, Auth, API } from 'aws-amplify';
import { Post } from './models'
import PostView from './PostView';
import ChargeView from './ChargeView';
import { useEffect, useState, componentDidMount } from 'react';
import './App.css';
import LoginButton from './LoginButton';
import LoginPopup from './LoginPopup';
import ProfileView from './ProfileView';
import { AuthState } from '@aws-amplify/ui-components';

function App() {
  // const [posts, setPosts] = useState([])
  const [charges, setCharges] = useState([])
  const [currentUser, setCurrentUser] = useState()
  const [showAuthenticator, setShowAuthenticator] = useState(false)

  const checkLoginState = async () => {
    try {
      const currentUser = await Auth.currentAuthenticatedUser()
      if (currentUser) {
        setCurrentUser(currentUser)
        setShowAuthenticator(false)
      }
    } catch (e) {
      setCurrentUser(null)
    }
  }

  // useEffect(async () => {
  //   checkLoginState()
  //   const loadPosts = async () => {
  //     setPosts(await DataStore.query(Post))
  //   }
  //   loadPosts()

  //   const subscription = DataStore.observe(Post).subscribe(() => {
  //     loadPosts()
  //   })

  //   return () => subscription.unsubscribe()
  // }, [])
  componentDidMount( async () => {
    checkLoginState()
    const postData = async () => { 
      const apiName = 'testAuthChargeHandler';
      const path = '/charge';
      const myInit = { // OPTIONAL
          body: {
            "ptnum": currentUser.attributes.sub
          }
        };
  
      return await API.post(apiName, path, myInit);
    }
    if(currentUser) loadCharges()
    const loadCharges = async () => {
      setCharges(postData)
    }
  })
//{posts.map(post => <PostView post={post} currentUser={currentUser}/>)}
  return (
    <div className="App">
      <nav>
        <LoginButton
          onLogin={() => setShowAuthenticator(true)}
          currentUser={currentUser}
          onLogout={async () => {
            await Auth.signOut()
            checkLoginState()
          }} />
        {currentUser &&
          // <button onClick={() => {
          //   DataStore.save(new Post({
          //     content: window.prompt('New post:')
          //   }))
          // }}>
          //   ? Add a new post
          // </button>
          <ProfileView currentUser={currentUser}/>
        }
      </nav>
      { currentUser && 
      <div className="posts">
        <h1>Total Charge Due</h1>
        {charges.map(charge => <ChargeView charge={charge} currentUser={currentUser}/>)}
      </div> }
      {showAuthenticator && 
        <LoginPopup
        onAuthStateChange={(nextAuthState) => { if (nextAuthState === AuthState.SignedIn) { checkLoginState() } }}
          onCancel={() => setShowAuthenticator(false)}/>}
    </div>
  );
}

export default App;
