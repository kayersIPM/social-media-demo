import { DataStore, Auth, API, Hub } from 'aws-amplify';
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
  async function checkUser() {
    let user = await Auth.currentAuthenticatedUser()
    if(user) {
      console.log(user.attributes)
      return user.attributes
    }
       
   }
   async function postData() { 
     const apiName = 'testAuthChargeAPI';
     const path = '/charge';
     const myInit = { // OPTIONAL
         body: {
           "ptnum": checkUser()['sub']
         }
       };
     
     setCharges(await API.post(apiName, path, myInit));
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
    Hub.listen('auth', (data) => {
      const { payload } = data
      console.log('A new auth event has happened: ', data)
       if (payload.event === 'signIn') {
         console.log('a user has signed in!')
         checkLoginState()
          postData()
          Hub.remove('auth')
       }
       if (payload.event === 'signOut') {
         console.log('a user has signed out!')
       }
    })
  }, [])
  

  
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
