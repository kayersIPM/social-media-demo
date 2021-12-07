import { DataStore } from 'aws-amplify';

function PostView({ post, currentUser }) {
    let showDeleteButton = false

    // if (currentUser) {
    //     showDeleteButton = currentUser.signInUserSession.accessToken.payload['cognito:groups'].includes('Admins')
    // }
    return <div className="post">
        <div className="content">
            {post.content}
        </div>
        <div>
            {showDeleteButton && <button onClick={async () => {
                await DataStore.delete(post)
            }}>Delete</button>}
        </div>
    </div>
}

export default PostView