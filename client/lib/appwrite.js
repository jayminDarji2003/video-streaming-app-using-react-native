import { Account, Avatars, Client, Databases, ID, Query } from 'react-native-appwrite';
// 666560ec0007cf156fc0
// 666562e6001dbe8c4c87
// 6665632c000731addced
// 6665636d000b3b512068
// 666565f5000fb4afbf28

export const config = {
    endpoint: "https://cloud.appwrite.io/v1",
    platform: "com.jdtech.aora",
    projectId: "666560ec0007cf156fc0",
    databaseId: "666562e6001dbe8c4c87",
    userCollectionId: "6665632c000731addced",
    videoCollectionId: "6665636d000b3b512068",
    storageId: "666565f5000fb4afbf28",
}

// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(config.endpoint) // Your Appwrite Endpoint
    .setProject(config.projectId) // Your project ID
    .setPlatform(config.platform) // Your application ID or bundle ID.
    ;

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

// Register User
export const createUser = async (username, email, password) => {
    try {
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username,
        )

        if (!newAccount) throw Error;

        const avatarUrl = avatars.getInitials(username)

        // after registering, login user
        await signIn(email, password)

        const newUser = await databases.createDocument(
            config.databaseId,
            config.userCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                email: email,
                username: username,
                avatar: avatarUrl,
            }
        )

        return newUser;
    } catch (error) {
        console.log("ERROR WHILE CREATING USER")
        console.log(error)
        throw new Error(error)
    }
}

// login user
export async function signIn(email, password) {
    try {
        //console.log("Started sign in process => ", email, password)
        const session = await account.createEmailPasswordSession(email, password);
        // console.log("ended sign in process => ", session)
        return session;
    } catch (error) {
        console.error("SignIn Error: ", error);
        throw new Error(error.message || 'An error occurred during sign-in');
    }
}


// get data of current user
export const getCurrentUser = async () => {
    try {
        const currentAccount = await account.get();

        if (!currentAccount) throw Error;

        const currentUser = await databases.listDocuments(
            config.databaseId,
            config.userCollectionId,
            [Query.equal("accountId", currentAccount.$id)]
        )

        if (!currentUser) throw Error;

        return currentUser.documents[0];
    } catch (error) {
        console.log(error)
    }
}


// get all posts(fetch all posts)
export const getAllPosts = async () => {
    try {
        const posts = await databases.listDocuments(
            config.databaseId,
            config.videoCollectionId,
        )

        return posts.documents;
    } catch (error) {
        console.log("ERROR OCCURED WHILE FETCHING ALL POSTS")
        throw new Error(error);
    }
}

// get latest posts(fetch all posts)
export const getLatestPosts = async () => {
    try {
        const posts = await databases.listDocuments(
            config.databaseId,
            config.videoCollectionId,
            [Query.orderDesc('$createdAt', Query.limit(7))]
        )

        return posts.documents;
    } catch (error) {
        console.log("ERROR OCCURED WHILE FETCHING ALL POSTS")
        throw new Error(error);
    }
}

// get search posts(fetch all posts)
export const searchPosts = async (query) => {
    try {
        const posts = await databases.listDocuments(
            config.databaseId,
            config.videoCollectionId,
            [Query.search('title', query)]
        )

        return posts.documents;
    } catch (error) {
        console.log("ERROR OCCURED WHILE FETCHING ALL POSTS")
        throw new Error(error);
    }
}
// get user posts data
export const getUserPost = async (userId) => {
    try {
        const posts = await databases.listDocuments(
            config.databaseId,
            config.videoCollectionId,
            [Query.equal('creator', userId)]
        )

        return posts.documents;
    } catch (error) {
        console.log("ERROR OCCURED WHILE FETCHING ALL POSTS")
        throw new Error(error);
    }
}

// log out function
export const signOut = async () => {
    try {
        const session = await account.deleteSession("current");
        return session;
    } catch (error) {
        throw new Error(error);
        console.log("ERROR OCCURED WHILE LOGOUT USER.")
    }
}