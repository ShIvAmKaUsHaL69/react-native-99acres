import {Account, Avatars, Client, Databases, OAuthProvider, Query} from 'react-native-appwrite';
import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser'

export const config = {
    Platform: 'com.shivam.restate',
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
    databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,
    galleriesCollectionId: process.env.EXPO_PUBLIC_APPWRITE_GALLERIES_COLLECTION_ID,
    reviewsCollectionId: process.env.EXPO_PUBLIC_APPWRITE_REVIEWS_COLLECTION_ID,
    propertiesCollectionId: process.env.EXPO_PUBLIC_APPWRITE_PROPERTIES_COLLECTION_ID,
    agentsCollectionId: process.env.EXPO_PUBLIC_APPWRITE_AGENTS_COLLECTION_ID,
}

export const client = new Client();
client.setEndpoint(config.endpoint!).setProject(config.projectId!).setPlatform(config.Platform!)


export const avatar = new Avatars(client);
export const account = new Account(client);
export const databases = new Databases(client);

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

export async function getLatestProperties() {
    try {
        const result = await databases.listDocuments(config.databaseId!, config.propertiesCollectionId!, [
        Query.orderDesc('$createdAt'), Query.limit(5)]);
        return result.documents;
    } catch (error) {
        console.log(error)
        return [];
    }
}
export async function getProperties({ filter, query, limit } : { filter: string, query: string, limit?: number }) {
    try {
        const BuildQuery = [Query.orderDesc('$createdAt')];

        if(filter && filter !== 'All') BuildQuery.push(Query.equal('type', filter));

        if(query) BuildQuery.push(Query.or([ Query.search('name', query), Query.search('address', query), Query.search('type', query) ]));

        if(limit) BuildQuery.push(Query.limit(limit));
        
        const result = await databases.listDocuments(config.databaseId!, config.propertiesCollectionId!, BuildQuery);
            return result.documents;
    } catch (error) {
        console.log(error)
        return [];
    }
}

export async function getPropertyById({ id }: { id: string }) {
    try {
      const result = await databases.getDocument(
        config.databaseId!,
        config.propertiesCollectionId!,
        id,
      );
      return result;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
