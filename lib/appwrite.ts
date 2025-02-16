import {Account, Avatars, Client, OAuthProvider} from 'react-native-appwrite';
import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser'

export const config = {
    Platform: 'com.shivam.restate',
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID
}

export const client = new Client();
client.setEndpoint(config.endpoint!).setProject(config.projectId!).setPlatform(config.Platform!)


export const avatar = new Avatars(client);
export const account = new Account(client);

export async function login() {
    try {
        const redirecturi = Linking.createURL('/');
        const responce = await account.createOAuth2Token(OAuthProvider.Google, redirecturi);
        if(!responce) throw new Error('Failed to Login')

        const browserresult = await WebBrowser.openAuthSessionAsync(responce.toString(), redirecturi)

        if(browserresult.type !== 'success') throw new Error('Failed to Login')
        
        const url = new URL(browserresult.url);
        const secreat = url.searchParams.get('secret')?.toString();
        const userid = url.searchParams.get('userId')?.toString();

        if(!secreat || !userid) throw new Error('Failed to Login')

        const session = await account.createSession(userid, secreat)
        if (!session) throw new Error('Failed to create session')

        return true;

    } catch (error) {
        console.log(error)
        return false;
    }
}

export async function logout() {
    try {
        await account.deleteSession('current');
        return true
    } catch (error) {
        console.log(error)
        return false
    }
}

export async function getuser() {
    try {
        const responce = await account.get();
        if(responce.$id) {
            const useravatar = avatar.getInitials(responce.name);
            return {
                ...responce,
                avatar: useravatar.toString()
            }
        }
    } catch (error) {
        console.log(error)
        return null
    }
}