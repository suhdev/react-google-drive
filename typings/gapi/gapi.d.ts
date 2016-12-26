declare namespace gapi {
    interface Dictionary<T>{
        [idx:string]:T;
    }
    namespace auth {
        interface AuthParams{
            client_id:string;
            immediate:boolean;
            response_type:string;
            scope:string;
        }

        interface OAuthResponse{
            access_token:string;
            error:string;
            expires_in:string;
            state:string;
        }

        interface AuthCallback{
            (resp:OAuthResponse):void;
        }
        function authorize(params:AuthParams,callback:AuthCallback):void;
    }

    namespace client {
        interface RequestCallback {
            (jsonResp:any,rawResp:any):void;
        }

        interface BatchCallback {
            (individualResponse:any,rawBatchResponse:any):void;
        }

        interface OptionalParams{
            id:string;
            callback:BatchCallback;
        }
        class Request<T> extends Promise<T>{
            execute(callback:RequestCallback);
        }

        class Batch extends Promise<any>{
            add<T>(request:Request<T>,opt_params:OptionalParams);
            execute(responseMap:any,rawBatchResponse:any):void;

        }

        interface RequestArgs{
            path:string;
            method:string;
            params:any;
            headers:any;
            body:string|Object; 

        }

        function request<T>(args:RequestArgs):Request<T>;

        function newBatch(args:RequestArgs):Batch;

        function load(name:string,version:string,callback:Function):void;
        function load(name:string,version:string):Promise<void>;

        function setApiKey(key:string):void;

    }

    namespace drive{

        interface FileOwner {
            kind: "drive#user";
            displayName: string;
            photoLink: string;
            me: boolean;
            permissionId: string;
            emailAddress: string;      
        }

        interface Capabilities {
            canEdit: boolean;
            canComment: boolean;
            canShare: boolean;
            canCopy: boolean;
            canReadRevisions: boolean;
        }

        interface Permission {
            kind: "drive#permission";
            id: string;
            type: string;
            emailAddress: string;
            domain: string;
            role: string;
            allowFileDiscovery: boolean;
            displayName: string;
            photoLink: string;
        }

        interface User {
            kind: "drive#user";
            displayName: string;
            photoLink: string;
            me: boolean;
            permissionId: string;
            emailAddress: string
        }

        interface ContentHints{
            thumbnail: {
                image: number[];
                mimeType: string;
            };
            indexableText: string;
        }

        interface VideoMediaMetadata{
            width: number;
            height: number;
            durationMillis: number;        
        }

        interface ImageMediaMetadata{
            width: number;
            height: number;
            rotation: number;
            location: {
                latitude: number;
                longitude: number;
                altitude: number
            };
            time: string;
            cameraMake: string;
            cameraModel: string;
            exposureTime: number;
            aperture: number;
            flashUsed: boolean;
            focalLength: number;
            isoSpeed: number;
            meteringMode: string;
            sensor: string;
            exposureMode: string;
            colorSpace: string;
            whiteBalance: string;
            exposureBias: number;
            maxApertureValue: number;
            subjectDistance: number;
            lens: string
        }
         interface GoogleDriveFile{
            kind: "drive#file";
            id: string;
            name: string;
            mimeType: string;
            description: string;
            starred: boolean;
            trashed: boolean;
            explicitlyTrashed: boolean;
            parents: string[];
            properties: Dictionary<string>;
            appProperties: Dictionary<string>;
            spaces: string[];
            version: number;
            webContentLink: string;
            webViewLink: string;
            iconLink: string;
            thumbnailLink: string;
            viewedByMe: boolean;
            viewedByMeTime: Date;
            createdTime: Date;
            modifiedTime: Date;
            modifiedByMeTime: Date;
            sharedWithMeTime: Date;
            sharingUser: User;
            owners: FileOwner[];
            lastModifyingUser: User;
            shared: boolean;
            ownedByMe: boolean;
            capabilities: Capabilities;
            viewersCanCopyContent: boolean;
            writersCanShare: boolean;
            permissions: Permission[];
            folderColorRgb: string;
            originalFilename: string;
            fullFileExtension: string;
            fileExtension: string;
            md5Checksum: string;
            size: number;
            quotaBytesUsed: number;
            headRevisionId: string;
            contentHints: ContentHints,
            imageMediaMetadata:ImageMediaMetadata;
            videoMediaMetadata: VideoMediaMetadata;
            isAppAuthorized: boolean;
        }

        namespace files {
            interface ListParams{
                corpus:"domain"|"user",
                orderBy:string;
                pageSize:number;
                pageToken:string;
                q:string;
                spaces:"drive"|"appDataFolder"|"photos";
            }

           

            interface ListFilesResp{
                kind:string;
                nextPageToken:string;
                files:GoogleDriveFile[];
            }

            interface GetParams{
                fileId:string;
                acknowledgeAbuse?:boolean;
            }

            interface GetFileResp{
                
            }

            function list(params:ListParams):client.Request<ListFilesResp>;

            function get(params:GetParams):client.Request<GetFileResp>;
        }
    }
}