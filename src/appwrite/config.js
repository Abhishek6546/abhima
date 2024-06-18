import conf from "../conf/conf.js"
import {Client,ID,Databases,Storage,Query} from "appwrite";

export class Service{
    client = new Client;
    databases;
    bucket;
    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }
    //creating a post
    async createPost({title,slug,content,featuredImage,status, userId}){
        try{
          return await this.databases.createDocument(
            conf.appwritedatabaseId,
            conf.appwriteCollectionId,
            slug,
            {
                title,
                content,
                featuredImage,
                status,
                userId,
            }
          )
        }catch(error){
            console.log("appwrite service ::createPost::error ",error);
        }
    }

    //update post
    async updatePost(slug,{title,content,featuredImage,status}){
        try{
            return await this.databases.updateDocument(
              conf.appwritedatabaseId,
              conf.appwriteCollectionId,
              slug,
              {
                  title,
                  content,
                  featuredImage,
                  status,
              }
            )
          }catch(error){
              console.log("appwrite service ::updatepost::error ",error);
          }
    }

    //delete post
    async deletePost(slug){
        try{
          await this.databases.deleteDocument(
            conf.appwritedatabaseId,
            conf.appwriteCollectionId,
            slug
          )
          return true
        }catch(error){
            console.log("appwrite service ::deletepost::error ",error);
            return false
        }
    }
   //get single post
    async getPost(slug){
        try{
           return await this.databases.getDocument(
                conf.appwritedatabaseId,
                conf.appwriteCollectionId,
                slug
              )
        }catch(error){
            console.log("appwrite service ::getpost::error ",error);
            return false
        }
    }

    //get all posts
    async getPosts(queries=[Query.equal("status","active")]){
        try {
            return await this.databases.listDocuments(
                conf.appwritedatabaseId,
                conf.appwriteCollectionId,
                queries,
            )
        } catch (error) {
            console.log("appwrite service ::getposts::error ",error);
            return false
        }
    }

    //file upload service
    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("appwrite service ::uploadfile::error ",error);
            return false
        }
    }

    //delete file
    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
        } catch (error) {
            console.log("appwrite service ::deletefile::error ",error);
            return false
        }
    }

    //preview
    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }
}

const service = new Service()
export default service





