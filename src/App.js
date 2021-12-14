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
  // const checkUser = async () => {
  //   let user = await Auth.currentAuthenticatedUser()
  //   if(user) {
  //     console.log(user.attributes)
  //     return user.attributes['preferred_username']
  //   }
       
  //  }

   const postData = async () => {
     console.log('post')
     const currentUser = await Auth.currentAuthenticatedUser();
     const apiName = 'testAuthChargeAPI';
     const path = '/charge';
     const myInit = { // OPTIONAL
         body: {
           ptnum: currentUser.attributes.preferred_username
         },
         headers: {
           "x-api-key": "SK1mOvYZ621rewLSB3Tshaoc2J7J2hbu3A13oqNJ"
         }
       };
     
     return API.post(apiName, path, myInit);
   }
   const getCharges = async () => {
    let r = await postData()
    console.log(r)
    if(r) {
      let fn, mn, ln, bday = ''
      let a = r[0].split("', '")
      console.log(a)
      fn = a[1]
      mn = a[2].split("', ")[0]
      let bday1 = a[2].split("', ")[1].split(", '")[0].split(',')
      bday = bday1[1] + '/' + bday1[2].replace(')', '') + '/' + bday1[0].split('(')[1]
      let b = a[0].split(', ')
      console.log(b)
      ln = b[2].replace("'", "")
      let c = b[1].split("'")
      console.log(c)
      setCharges(c[1])
      if(currentUser){
        if(!currentUser.attributes["custom:fullname"] ) { 
          currentUser.attributes["custom:fullname"]= fn + ' ' + mn + ' ' + ln
          currentUser.attributes['custom:bday']= bday
         
          setCurrentUser(await Auth.updateUserAttributes(currentUser, {
            ["custom:fullname"]: fn + ' ' + mn + ' ' + ln,
            ['custom:bday']: bday
          }))
        }
      }
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
    getCharges()
    Hub.listen('auth', async(data) => {
      const { payload } = data
      console.log('A new auth event has happened: ', data)
       if (payload.event === 'signIn') {
         console.log('a user has signed in!')
        //  checkLoginState()
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
      { currentUser && charges &&
      <div className="posts">
        <h1>Total Charge Due</h1>
        {<ChargeView charge={charges} currentUser={currentUser}/>}
      </div> }
      {showAuthenticator && 
        <LoginPopup
        onAuthStateChange={(nextAuthState) => { if (nextAuthState === AuthState.SignedIn) { checkLoginState() } }}
          onCancel={() => setShowAuthenticator(false)}/>}
    </div>
  );
  
}

export default App;
