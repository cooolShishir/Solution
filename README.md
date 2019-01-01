best viewed with some editor 


Please install beforehand - 

mongodb version v2.6.12
inside os ubuntu
    Description:	Ubuntu 16.04.5 LTS
    Release:	16.04

npm install
npm run start



This is how it goes

post is characterized by
 "likes",
 "shares",
 "comments",
 "views",
 "zscore",
 "_id",
 "title",
 "text",
 "createdAt",
 "updatedAt",


any post at the time of creation will have by default
likes : 0
views : 0
shares : 0
comments : 0
zscore : depends on time of creation


the priority/ranking of any post shown to user in his/her feed will be decided upon 
something called zscore

the zscore will be calculated on the basis of 
age of post ( in hours )
number of likes,views,shares,comments


at any time any like/view/share/comment is done on post,post ( and its zscore ) will be
updated in mongo database using PUT api-call (/posts)

now feed can be fetched either asynchronously on function getFeeds call
or using api


sample api response of getFeeds :-
[
    {
        "likes": 1,
        "shares": 1,
        "comments": 1,
        "views": 0,
        "zscore": 11.0744,
        "_id": "5c2ba17e67dfbe112cf3040d",
        "title": "hey how you doing",
        "text": "i wish katrina quit film industry and marry me",
        "createdAt": "2019-01-01T17:21:02.889Z",
        "updatedAt": "2019-01-01T17:21:14.973Z",
        "__v": 0
    },
    {
        "likes": 0,
        "shares": 0,
        "comments": 0,
        "views": 0,
        "zscore": 7.44,
        "_id": "5c2ba12f67dfbe112cf3040b",
        "title": "hello friends",
        "text": "honey jain",
        "createdAt": "2019-01-01T17:19:43.201Z",
        "updatedAt": "2019-01-01T17:19:43.201Z",
        "__v": 0
    },
    {
        "likes": 1,
        "shares": 0,
        "comments": 0,
        "views": 1,
        "zscore": 7.0744,
        "_id": "5c2ba14667dfbe112cf3040c",
        "title": "hello friends are you there",
        "text": "honey jain happy new year",
        "createdAt": "2019-01-01T17:20:06.986Z",
        "updatedAt": "2019-01-01T17:22:00.328Z",
        "__v": 0
    }
] 


