import { AmplifyAuthenticator, AmplifySignIn } from '@aws-amplify/ui-react'

function LoginPopup({onAuthStateChange, onCancel}) {
    return <div className="authenticator">
        <button className="close-login" onClick={onCancel}>Cancel login</button>
        <AmplifyAuthenticator handleAuthStateChange={onAuthStateChange}>
        <AmplifySignIn
            headerText="Please login with provided information"
            slot="sign-in"
            hideSignUp='true'
        ></AmplifySignIn>
        </AmplifyAuthenticator>
    </div>
}

export default LoginPopup