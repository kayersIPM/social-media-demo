import { DataStore } from 'aws-amplify';

function ProfileView({ currentUser }) {
    let showDeleteButton = false

    // if (currentUser) {
    //     showDeleteButton = currentUser.signInUserSession.accessToken.payload['cognito:groups'].includes('Admins')
    // }
   
    
    return <div className="profile">
        <div className="content">
            <p>Email: {currentUser.attributes.email}</p>
            
        </div>
        {/* <div>
            {showDeleteButton && <button onClick={async () => {
                await DataStore.delete(post)
            }}>Delete</button>}
        </div> */}
    </div>
}

export default ProfileView