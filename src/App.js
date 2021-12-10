import { DataStore, Auth, API } from 'aws-amplify';
import { Post } from './models'
import PostView from './PostView';
import ChargeView from './ChargeView';
import { useEffect, useState } from 'react';
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
  useEffect(() => {
    checkLoginState()
    let ignore = false
    async function postData() { 
      const apiName = 'testAuthChargeAPI';
      const path = '/charge';
      const myInit = { // OPTIONAL
          body: {
            "ptnum": currentUser.attributes.sub
          }
        };
      
      if(!ignore) setCharges(await API.post(apiName, path, myInit));
    }
    
    if(currentUser) postData();
    return () => { ignore = true; }
   
  }, []);
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
       
      </div> }
      {showAuthenticator && 
        <LoginPopup
        onAuthStateChange={(nextAuthState) => { if (nextAuthState === AuthState.SignedIn) { checkLoginState() } }}
          onCancel={() => setShowAuthenticator(false)}/>}
    </div>
  );
}

export default App;
