import { BACKGROUND_IMG } from "../../assets/images"
const date = new Date();
const shortList = [
    {
        id: 0,
        postType: 'media', // vote/post
        user: {
            first_name: 'Userr',
            last_name: 'jon',
            nickname: 'nicknameuser',
            isVerified: true,
            photo: "https://i.imgur.com/BaqrF2I.jpeg",
            XP: 23423,
            isFollowing: false,
        },
        isLiked: true,
        likes: 234234,
        createdAt: new Date(),
        comments: 432,
        shares: 98232234,
        file: {
            link: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
            type: 'video' //image/video
        },
        description: 'Lorem ipsoum dolor sit consectuer sdkjfls skjdflkjdflj skjsljfsljljsflsdf',
    }, {
        id: 1,
        postType: 'voting', // vote/post
        user: {
            first_name: 'Sdf',
            last_name: 'Tjon',
            nickname: 'sdftjon',
            isVerified: false,
            photo: "https://i.imgur.com/BaqrF2I.jpeg",
            XP: 88732,
            isFollowing: true,
        },
        isLiked: false,
        likes: 34234,
        comments: 322,
        createdAt: new Date(),
        alreadyVoted: false,
        dueTime: new Date(),
        shares: 88232234,
        question: 'Select one of the followings, which one?',
        file: {
            link: "https://i.imgur.com/BaqrF2I.jpeg",
            type: 'image'
        },
        options: [
            {
                id: 0,
                label: 'Fist answer',
                votes: 25
            }, {
                id: 1,
                label: 'Second answer',
                votes: 50,
            }, {
                id: 2,
                label: 'Third answer',
                votes: 15
            }, {
                id: 3,
                label: 'Fourth answer',
                votes: 10
            }, {
                id: 4,
                label: 'Fifth answer',
                votes: 4
            },
        ]
    }, {
        id: 2,
        postType: 'media', // vote/post
        user: {
            first_name: 'Coding',
            last_name: 'Pixel',
            nickname: 'sdftjon',
            isVerified: false,
            photo: "https://i.imgur.com/BaqrF2I.jpeg",
            XP: 88732,
            isFollowing: false,
        },
        isLiked: true,
        likes: 234234,
        createdAt: new Date(),
        comments: 432,
        shares: 98232234,
        file: {
            link: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
            type: 'video' //image/video
        },
        description: 'Lorem ipsoum dolor sit consectuer sdkjfls skjdflkjdflj skjsljfsljljsflsdf',
    }, {
        id: 3,
        postType: 'media', // vote/post
        user: {
            first_name: 'Sdf',
            last_name: 'Tjon',
            nickname: 'sdftjon',
            isVerified: false,
            photo: "https://i.imgur.com/BaqrF2I.jpeg",
            XP: 88732,
            isFollowing: true,
        },
        isLiked: false,
        likes: 34234,
        comments: 322,
        createdAt: new Date(),
        alreadyVoted: false,
        dueTime: new Date(),
        shares: 88232234,
        question: 'Select one of the followings, which one?',
        file: {
            link: "https://i.imgur.com/BaqrF2I.jpeg",
            type: 'image'
        },
        options: [
            {
                id: 0,
                label: 'Fist answer',
                votes: 25
            }, {
                id: 1,
                label: 'Second answer',
                votes: 50,
            }, {
                id: 2,
                label: 'Third answer',
                votes: 15
            }, {
                id: 3,
                label: 'Fourth answer',
                votes: 10
            }, {
                id: 4,
                label: 'Fifth answer',
                votes: 4
            },
        ]
    },

]
const longList = [
    {
        id: 0,
        postType: 'media', // vote/post
        user: {
            first_name: 'Userr',
            last_name: 'jon',
            nickname: 'nicknameuser',
            isVerified: true,
            photo: "https://i.imgur.com/BaqrF2I.jpeg",
            XP: 23423,
            isFollowing: false,

        },
        isLiked: true,
        likes: 234234,
        createdAt: new Date(),
        comments: 432,
        shares: 98232234,
        file: {
            link: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
            type: 'video' //image/video
        },
        description: 'Lorem ipsoum dolor sit consectuer sdkjfls skjdflkjdflj skjsljfsljljsflsdf',
    }, {
        id: 1,
        postType: 'voting', // vote/post
        user: {
            first_name: 'Sdf',
            last_name: 'Tjon',
            nickname: 'sdftjon',
            isVerified: false,
            photo: "https://i.imgur.com/BaqrF2I.jpeg",
            XP: 88732,
            isFollowing: true,
        },
        isLiked: false,
        likes: 34234,
        comments: 322,
        createdAt: new Date(),
        alreadyVoted: false,
        dueTime: new Date(),
        shares: 88232234,
        question: 'Select one of the followings, which one?',
        file: {
            link: "https://i.imgur.com/BaqrF2I.jpeg",
            type: 'image'
        },
        options: [
            {
                id: 0,
                label: 'Fist answer',
                votes: 25
            }, {
                id: 1,
                label: 'Second answer',
                votes: 50,
            }, {
                id: 2,
                label: 'Third answer',
                votes: 15
            }, {
                id: 3,
                label: 'Fourth answer',
                votes: 10
            }, {
                id: 4,
                label: 'Fifth answer',
                votes: 4
            },
        ]
    }, {
        id: 2,
        postType: 'media', // vote/post
        user: {
            first_name: 'Coding',
            last_name: 'Pixel',
            nickname: 'sdftjon',
            isVerified: false,
            photo: "https://i.imgur.com/BaqrF2I.jpeg",
            XP: 88732,
            isFollowing: false,
        },
        isLiked: true,
        likes: 234234,
        createdAt: new Date(),
        comments: 432,
        shares: 98232234,
        file: {
            link: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
            type: 'video' //image/video
        },
        description: 'Lorem ipsoum dolor sit consectuer sdkjfls skjdflkjdflj skjsljfsljljsflsdf',
    }, {
        id: 3,
        postType: 'media', // vote/post
        user: {
            first_name: 'Sdf',
            last_name: 'Tjon',
            nickname: 'sdftjon',
            isVerified: false,
            photo: "https://i.imgur.com/BaqrF2I.jpeg",
            XP: 88732,
            isFollowing: true,
        },
        isLiked: false,
        likes: 34234,
        comments: 322,
        createdAt: new Date(),
        alreadyVoted: false,
        dueTime: new Date(),
        shares: 88232234,
        question: 'Select one of the followings, which one?',
        file: {
            link: "https://i.imgur.com/BaqrF2I.jpeg",
            type: 'image'
        },
        options: [
            {
                id: 0,
                label: 'Fist answer',
                votes: 25
            }, {
                id: 1,
                label: 'Second answer',
                votes: 50,
            }, {
                id: 2,
                label: 'Third answer',
                votes: 15
            }, {
                id: 3,
                label: 'Fourth answer',
                votes: 10
            }, {
                id: 4,
                label: 'Fifth answer',
                votes: 4
            },
        ]
    },









    {
        id: 4,
        postType: 'voting', // vote/post
        user: {
            first_name: 'Sdf',
            last_name: 'Tjon',
            nickname: 'sdftjon',
            isVerified: false,
            photo: "https://i.imgur.com/BaqrF2I.jpeg",
            XP: 88732,
            isFollowing: true,
        },
        isLiked: false,
        likes: 34234,
        comments: 322,
        createdAt: new Date(),
        alreadyVoted: false,
        dueTime: new Date(),
        shares: 88232234,
        question: 'Select one of the followings, which one?',
        file: {
            link: "https://i.imgur.com/BaqrF2I.jpeg",
            type: 'image'
        },
        options: [
            {
                id: 0,
                label: 'Fist answer',
                votes: 25
            }, {
                id: 1,
                label: 'Second answer',
                votes: 50,
            }, {
                id: 2,
                label: 'Third answer',
                votes: 15
            }, {
                id: 3,
                label: 'Fourth answer',
                votes: 10
            }, {
                id: 4,
                label: 'Fifth answer',
                votes: 4
            },
        ]
    }, {
        id: 5,
        postType: 'media', // vote/post
        user: {
            first_name: 'Coding',
            last_name: 'Pixel',
            nickname: 'sdftjon',
            isVerified: false,
            photo: "https://i.imgur.com/BaqrF2I.jpeg",
            XP: 88732,
            isFollowing: false,
        },
        isLiked: true,
        likes: 234234,
        createdAt: new Date(),
        comments: 432,
        shares: 98232234,
        file: {
            link: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
            type: 'video' //image/video
        },
        description: 'Lorem ipsoum dolor sit consectuer sdkjfls skjdflkjdflj skjsljfsljljsflsdf',
    }, {
        id: 6,
        postType: 'media', // vote/post
        user: {
            first_name: 'Sdf',
            last_name: 'Tjon',
            nickname: 'sdftjon',
            isVerified: false,
            photo: "https://i.imgur.com/BaqrF2I.jpeg",
            XP: 88732,
            isFollowing: true,
        },
        isLiked: false,
        likes: 34234,
        comments: 322,
        createdAt: new Date(),
        alreadyVoted: false,
        dueTime: new Date(),
        shares: 88232234,
        question: 'Select one of the followings, which one?',
        file: {
            link: "https://i.imgur.com/BaqrF2I.jpeg",
            type: 'image'
        },
        options: [
            {
                id: 0,
                label: 'Fist answer',
                votes: 25
            }, {
                id: 1,
                label: 'Second answer',
                votes: 50,
            }, {
                id: 2,
                label: 'Third answer',
                votes: 15
            }, {
                id: 3,
                label: 'Fourth answer',
                votes: 10
            }, {
                id: 4,
                label: 'Fifth answer',
                votes: 4
            },
        ]
    }, {
        id: 7,
        postType: 'voting', // vote/post
        user: {
            first_name: 'Sdf',
            last_name: 'Tjon',
            nickname: 'sdftjon',
            isVerified: false,
            photo: "https://i.imgur.com/BaqrF2I.jpeg",
            XP: 88732,
            isFollowing: true,
        },
        isLiked: false,
        likes: 34234,
        comments: 322,
        createdAt: new Date(),
        alreadyVoted: false,
        dueTime: new Date(),
        shares: 88232234,
        question: 'Select one of the followings, which one?',
        file: {
            link: "https://i.imgur.com/BaqrF2I.jpeg",
            type: 'image'
        },
        options: [
            {
                id: 0,
                label: 'Fist answer',
                votes: 25
            }, {
                id: 1,
                label: 'Second answer',
                votes: 50,
            }, {
                id: 2,
                label: 'Third answer',
                votes: 15
            }, {
                id: 3,
                label: 'Fourth answer',
                votes: 10
            }, {
                id: 4,
                label: 'Fifth answer',
                votes: 4
            },
        ]
    }, {
        id: 8,
        postType: 'media', // vote/post
        user: {
            first_name: 'Coding',
            last_name: 'Pixel',
            nickname: 'sdftjon',
            isVerified: false,
            photo: "https://i.imgur.com/BaqrF2I.jpeg",
            XP: 88732,
            isFollowing: false,
        },
        isLiked: true,
        likes: 234234,
        createdAt: new Date(),
        comments: 432,
        shares: 98232234,
        file: {
            link: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
            type: 'video' //image/video
        },
        description: 'Lorem ipsoum dolor sit consectuer sdkjfls skjdflkjdflj skjsljfsljljsflsdf',
    }, {
        id: 9,
        postType: 'media', // vote/post
        user: {
            first_name: 'Sdf',
            last_name: 'Tjon',
            nickname: 'sdftjon',
            isVerified: false,
            photo: "https://i.imgur.com/BaqrF2I.jpeg",
            XP: 88732,
            isFollowing: true,
        },
        isLiked: false,
        likes: 34234,
        comments: 322,
        createdAt: new Date(),
        alreadyVoted: false,
        dueTime: new Date(),
        shares: 88232234,
        question: 'Select one of the followings, which one?',
        file: {
            link: "https://i.imgur.com/BaqrF2I.jpeg",
            type: 'image'
        },
        options: [
            {
                id: 0,
                label: 'Fist answer',
                votes: 25
            }, {
                id: 1,
                label: 'Second answer',
                votes: 50,
            }, {
                id: 2,
                label: 'Third answer',
                votes: 15
            }, {
                id: 3,
                label: 'Fourth answer',
                votes: 10
            }, {
                id: 4,
                label: 'Fifth answer',
                votes: 4
            },
        ]
    },







    {
        id: 10,
        postType: 'voting', // vote/post
        user: {
            first_name: 'Sdf',
            last_name: 'Tjon',
            nickname: 'sdftjon',
            isVerified: false,
            photo: "https://i.imgur.com/BaqrF2I.jpeg",
            XP: 88732,
            isFollowing: true,
        },
        isLiked: false,
        likes: 34234,
        comments: 322,
        createdAt: new Date(),
        alreadyVoted: false,
        dueTime: new Date(),
        shares: 88232234,
        question: 'Select one of the followings, which one?',
        file: {
            link: "https://i.imgur.com/BaqrF2I.jpeg",
            type: 'image'
        },
        options: [
            {
                id: 0,
                label: 'Fist answer',
                votes: 25
            }, {
                id: 1,
                label: 'Second answer',
                votes: 50,
            }, {
                id: 2,
                label: 'Third answer',
                votes: 15
            }, {
                id: 3,
                label: 'Fourth answer',
                votes: 10
            }, {
                id: 4,
                label: 'Fifth answer',
                votes: 4
            },
        ]
    }, {
        id: 11,
        postType: 'media', // vote/post
        user: {
            first_name: 'Coding',
            last_name: 'Pixel',
            nickname: 'sdftjon',
            isVerified: false,
            photo: "https://i.imgur.com/BaqrF2I.jpeg",
            XP: 88732,
            isFollowing: false,
        },
        isLiked: true,
        likes: 234234,
        createdAt: new Date(),
        comments: 432,
        shares: 98232234,
        file: {
            link: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
            type: 'video' //image/video
        },
        description: 'Lorem ipsoum dolor sit consectuer sdkjfls skjdflkjdflj skjsljfsljljsflsdf',
    }, {
        id: 12,
        postType: 'media', // vote/post
        user: {
            first_name: 'Sdf',
            last_name: 'Tjon',
            nickname: 'sdftjon',
            isVerified: false,
            photo: "https://i.imgur.com/BaqrF2I.jpeg",
            XP: 88732,
            isFollowing: true,
        },
        isLiked: false,
        likes: 34234,
        comments: 322,
        createdAt: new Date(),
        alreadyVoted: false,
        dueTime: new Date(),
        shares: 88232234,
        question: 'Select one of the followings, which one?',
        file: {
            link: "https://i.imgur.com/BaqrF2I.jpeg",
            type: 'image'
        },
        options: [
            {
                id: 0,
                label: 'Fist answer',
                votes: 25
            }, {
                id: 1,
                label: 'Second answer',
                votes: 50,
            }, {
                id: 2,
                label: 'Third answer',
                votes: 15
            }, {
                id: 3,
                label: 'Fourth answer',
                votes: 10
            }, {
                id: 4,
                label: 'Fifth answer',
                votes: 4
            },
        ]
    }, {
        id: 13,
        postType: 'voting', // vote/post
        user: {
            first_name: 'Sdf',
            last_name: 'Tjon',
            nickname: 'sdftjon',
            isVerified: false,
            photo: "https://i.imgur.com/BaqrF2I.jpeg",
            XP: 88732,
            isFollowing: true,
        },
        isLiked: false,
        likes: 34234,
        comments: 322,
        createdAt: new Date(),
        alreadyVoted: false,
        dueTime: new Date(),
        shares: 88232234,
        question: 'Select one of the followings, which one?',
        file: {
            link: "https://i.imgur.com/BaqrF2I.jpeg",
            type: 'image'
        },
        options: [
            {
                id: 0,
                label: 'Fist answer',
                votes: 25
            }, {
                id: 1,
                label: 'Second answer',
                votes: 50,
            }, {
                id: 2,
                label: 'Third answer',
                votes: 15
            }, {
                id: 3,
                label: 'Fourth answer',
                votes: 10
            }, {
                id: 4,
                label: 'Fifth answer',
                votes: 4
            },
        ]
    }, {
        id: 14,
        postType: 'media', // vote/post
        user: {
            first_name: 'Coding',
            last_name: 'Pixel',
            nickname: 'sdftjon',
            isVerified: false,
            photo: "https://i.imgur.com/BaqrF2I.jpeg",
            XP: 88732,
            isFollowing: false,
        },
        isLiked: true,
        likes: 234234,
        createdAt: new Date(),
        comments: 432,
        shares: 98232234,
        file: {
            link: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
            type: 'video' //image/video
        },
        description: 'Lorem ipsoum dolor sit consectuer sdkjfls skjdflkjdflj skjsljfsljljsflsdf',
    }, {
        id: 15,
        postType: 'media', // vote/post
        user: {
            first_name: 'Sdf',
            last_name: 'Tjon',
            nickname: 'sdftjon',
            isVerified: false,
            photo: "https://i.imgur.com/BaqrF2I.jpeg",
            XP: 88732,
            isFollowing: true,
        },
        isLiked: false,
        likes: 34234,
        comments: 322,
        createdAt: new Date(),
        alreadyVoted: false,
        dueTime: new Date(),
        shares: 88232234,
        question: 'Select one of the followings, which one?',
        file: {
            link: "https://i.imgur.com/BaqrF2I.jpeg",
            type: 'image'
        },
        options: [
            {
                id: 0,
                label: 'Fist answer',
                votes: 25
            }, {
                id: 1,
                label: 'Second answer',
                votes: 50,
            }, {
                id: 2,
                label: 'Third answer',
                votes: 15
            }, {
                id: 3,
                label: 'Fourth answer',
                votes: 10
            }, {
                id: 4,
                label: 'Fifth answer',
                votes: 4
            },
        ]
    }, {
        id: 16,
        postType: 'voting', // vote/post
        user: {
            first_name: 'Sdf',
            last_name: 'Tjon',
            nickname: 'sdftjon',
            isVerified: false,
            photo: "https://i.imgur.com/BaqrF2I.jpeg",
            XP: 88732,
            isFollowing: true,
        },
        isLiked: false,
        likes: 34234,
        comments: 322,
        createdAt: new Date(),
        alreadyVoted: false,
        dueTime: new Date(),
        shares: 88232234,
        question: 'Select one of the followings, which one?',
        file: {
            link: "https://i.imgur.com/BaqrF2I.jpeg",
            type: 'image'
        },
        options: [
            {
                id: 0,
                label: 'Fist answer',
                votes: 25
            }, {
                id: 1,
                label: 'Second answer',
                votes: 50,
            }, {
                id: 2,
                label: 'Third answer',
                votes: 15
            }, {
                id: 3,
                label: 'Fourth answer',
                votes: 10
            }, {
                id: 4,
                label: 'Fifth answer',
                votes: 4
            },
        ]
    }, {
        id: 17,
        postType: 'media', // vote/post
        user: {
            first_name: 'Coding',
            last_name: 'Pixel',
            nickname: 'sdftjon',
            isVerified: false,
            photo: "https://i.imgur.com/BaqrF2I.jpeg",
            XP: 88732,
            isFollowing: false,
        },
        isLiked: true,
        likes: 234234,
        createdAt: new Date(),
        comments: 432,
        shares: 98232234,
        file: {
            link: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
            type: 'video' //image/video
        },
        description: 'Lorem ipsoum dolor sit consectuer sdkjfls skjdflkjdflj skjsljfsljljsflsdf',
    }, {
        id: 18,
        postType: 'media', // vote/post
        user: {
            first_name: 'Sdf',
            last_name: 'Tjon',
            nickname: 'sdftjon',
            isVerified: false,
            photo: "https://i.imgur.com/BaqrF2I.jpeg",
            XP: 88732,
            isFollowing: true,
        },
        isLiked: false,
        likes: 34234,
        comments: 322,
        createdAt: new Date(),
        alreadyVoted: false,
        dueTime: new Date(),
        shares: 88232234,
        question: 'Select one of the followings, which one?',
        file: {
            link: "https://i.imgur.com/BaqrF2I.jpeg",
            type: 'image'
        },
        options: [
            {
                id: 0,
                label: 'Fist answer',
                votes: 25
            }, {
                id: 1,
                label: 'Second answer',
                votes: 50,
            }, {
                id: 2,
                label: 'Third answer',
                votes: 15
            }, {
                id: 3,
                label: 'Fourth answer',
                votes: 10
            }, {
                id: 4,
                label: 'Fifth answer',
                votes: 4
            },
        ]
    }, {
        id: 19,
        postType: 'voting', // vote/post
        user: {
            first_name: 'Sdf',
            last_name: 'Tjon',
            nickname: 'sdftjon',
            isVerified: false,
            photo: "https://i.imgur.com/BaqrF2I.jpeg",
            XP: 88732,
            isFollowing: true,
        },
        isLiked: false,
        likes: 34234,
        comments: 322,
        createdAt: new Date(),
        alreadyVoted: false,
        dueTime: new Date(),
        shares: 88232234,
        question: 'Select one of the followings, which one?',
        file: {
            link: "https://i.imgur.com/BaqrF2I.jpeg",
            type: 'image'
        },
        options: [
            {
                id: 0,
                label: 'Fist answer',
                votes: 25
            }, {
                id: 1,
                label: 'Second answer',
                votes: 50,
            }, {
                id: 2,
                label: 'Third answer',
                votes: 15
            }, {
                id: 3,
                label: 'Fourth answer',
                votes: 10
            }, {
                id: 4,
                label: 'Fifth answer',
                votes: 4
            },
        ]
    }, {
        id: 20,
        postType: 'media', // vote/post
        user: {
            first_name: 'Coding',
            last_name: 'Pixel',
            nickname: 'sdftjon',
            isVerified: false,
            photo: "https://i.imgur.com/BaqrF2I.jpeg",
            XP: 88732,
            isFollowing: false,
        },
        isLiked: true,
        likes: 234234,
        createdAt: new Date(),
        comments: 432,
        shares: 98232234,
        file: {
            link: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
            type: 'video' //image/video
        },
        description: 'Lorem ipsoum dolor sit consectuer sdkjfls skjdflkjdflj skjsljfsljljsflsdf',
    }, {
        id: 21,
        postType: 'media', // vote/post
        user: {
            first_name: 'Sdf',
            last_name: 'Tjon',
            nickname: 'sdftjon',
            isVerified: false,
            photo: "https://i.imgur.com/BaqrF2I.jpeg",
            XP: 88732,
            isFollowing: true,
        },
        isLiked: false,
        likes: 34234,
        comments: 322,
        createdAt: new Date(),
        alreadyVoted: false,
        dueTime: new Date(),
        shares: 88232234,
        question: 'Select one of the followings, which one?',
        file: {
            link: "https://i.imgur.com/BaqrF2I.jpeg",
            type: 'image'
        },
        options: [
            {
                id: 0,
                label: 'Fist answer',
                votes: 25
            }, {
                id: 1,
                label: 'Second answer',
                votes: 50,
            }, {
                id: 2,
                label: 'Third answer',
                votes: 15
            }, {
                id: 3,
                label: 'Fourth answer',
                votes: 10
            }, {
                id: 4,
                label: 'Fifth answer',
                votes: 4
            },
        ]
    }, {
        id: 22,
        postType: 'voting', // vote/post
        user: {
            first_name: 'Sdf',
            last_name: 'Tjon',
            nickname: 'sdftjon',
            isVerified: false,
            photo: "https://i.imgur.com/BaqrF2I.jpeg",
            XP: 88732,
            isFollowing: true,
        },
        isLiked: false,
        likes: 34234,
        comments: 322,
        createdAt: new Date(),
        alreadyVoted: false,
        dueTime: new Date(),
        shares: 88232234,
        question: 'Select one of the followings, which one?',
        file: {
            link: "https://i.imgur.com/BaqrF2I.jpeg",
            type: 'image'
        },
        options: [
            {
                id: 0,
                label: 'Fist answer',
                votes: 25
            }, {
                id: 1,
                label: 'Second answer',
                votes: 50,
            }, {
                id: 2,
                label: 'Third answer',
                votes: 15
            }, {
                id: 3,
                label: 'Fourth answer',
                votes: 10
            }, {
                id: 4,
                label: 'Fifth answer',
                votes: 4
            },
        ]
    }, {
        id: 23,
        postType: 'media', // vote/post
        user: {
            first_name: 'Coding',
            last_name: 'Pixel',
            nickname: 'sdftjon',
            isVerified: false,
            photo: "https://i.imgur.com/BaqrF2I.jpeg",
            XP: 88732,
            isFollowing: false,
        },
        isLiked: true,
        likes: 234234,
        createdAt: new Date(),
        comments: 432,
        shares: 98232234,
        file: {
            link: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
            type: 'video' //image/video
        },
        description: 'Lorem ipsoum dolor sit consectuer sdkjfls skjdflkjdflj skjsljfsljljsflsdf',
    }, {
        id: 24,
        postType: 'media', // vote/post
        user: {
            first_name: 'Sdf',
            last_name: 'Tjon',
            nickname: 'sdftjon',
            isVerified: false,
            photo: "https://i.imgur.com/BaqrF2I.jpeg",
            XP: 88732,
            isFollowing: true,
        },
        isLiked: false,
        likes: 34234,
        comments: 322,
        createdAt: new Date(),
        alreadyVoted: false,
        dueTime: new Date(),
        shares: 88232234,
        question: 'Select one of the followings, which one?',
        file: {
            link: "https://i.imgur.com/BaqrF2I.jpeg",
            type: 'image'
        },
        options: [
            {
                id: 0,
                label: 'Fist answer',
                votes: 25
            }, {
                id: 1,
                label: 'Second answer',
                votes: 50,
            }, {
                id: 2,
                label: 'Third answer',
                votes: 15
            }, {
                id: 3,
                label: 'Fourth answer',
                votes: 10
            }, {
                id: 4,
                label: 'Fifth answer',
                votes: 4
            },
        ]
    }, {
        id: 25,
        postType: 'voting', // vote/post
        user: {
            first_name: 'Sdf',
            last_name: 'Tjon',
            nickname: 'sdftjon',
            isVerified: false,
            photo: "https://i.imgur.com/BaqrF2I.jpeg",
            XP: 88732,
            isFollowing: true,
        },
        isLiked: false,
        likes: 34234,
        comments: 322,
        createdAt: new Date(),
        alreadyVoted: false,
        dueTime: new Date(),
        shares: 88232234,
        question: 'Select one of the followings, which one?',
        file: {
            link: "https://i.imgur.com/BaqrF2I.jpeg",
            type: 'image'
        },
        options: [
            {
                id: 0,
                label: 'Fist answer',
                votes: 25
            }, {
                id: 1,
                label: 'Second answer',
                votes: 50,
            }, {
                id: 2,
                label: 'Third answer',
                votes: 15
            }, {
                id: 3,
                label: 'Fourth answer',
                votes: 10
            }, {
                id: 4,
                label: 'Fifth answer',
                votes: 4
            },
        ]
    }, {
        id: 26,
        postType: 'media', // vote/post
        user: {
            first_name: 'Coding',
            last_name: 'Pixel',
            nickname: 'sdftjon',
            isVerified: false,
            photo: "https://i.imgur.com/BaqrF2I.jpeg",
            XP: 88732,
            isFollowing: false,
        },
        isLiked: true,
        likes: 234234,
        createdAt: new Date(),
        comments: 432,
        shares: 98232234,
        file: {
            link: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
            type: 'video' //image/video
        },
        description: 'Lorem ipsoum dolor sit consectuer sdkjfls skjdflkjdflj skjsljfsljljsflsdf',
    }, {
        id: 27,
        postType: 'media', // vote/post
        user: {
            first_name: 'Sdf',
            last_name: 'Tjon',
            nickname: 'sdftjon',
            isVerified: false,
            photo: "https://i.imgur.com/BaqrF2I.jpeg",
            XP: 88732,
            isFollowing: true,
        },
        isLiked: false,
        likes: 34234,
        comments: 322,
        createdAt: new Date(),
        alreadyVoted: false,
        dueTime: new Date(),
        shares: 88232234,
        question: 'Select one of the followings, which one?',
        file: {
            link: "https://i.imgur.com/BaqrF2I.jpeg",
            type: 'image'
        },
        options: [
            {
                id: 0,
                label: 'Fist answer',
                votes: 25
            }, {
                id: 1,
                label: 'Second answer',
                votes: 50,
            }, {
                id: 2,
                label: 'Third answer',
                votes: 15
            }, {
                id: 3,
                label: 'Fourth answer',
                votes: 10
            }, {
                id: 4,
                label: 'Fifth answer',
                votes: 4
            },
        ]
    }, {
        id: 28,
        postType: 'voting', // vote/post
        user: {
            first_name: 'Sdf',
            last_name: 'Tjon',
            nickname: 'sdftjon',
            isVerified: false,
            photo: "https://i.imgur.com/BaqrF2I.jpeg",
            XP: 88732,
            isFollowing: true,
        },
        isLiked: false,
        likes: 34234,
        comments: 322,
        createdAt: new Date(),
        alreadyVoted: false,
        dueTime: new Date(),
        shares: 88232234,
        question: 'Select one of the followings, which one?',
        file: {
            link: "https://i.imgur.com/BaqrF2I.jpeg",
            type: 'image'
        },
        options: [
            {
                id: 0,
                label: 'Fist answer',
                votes: 25
            }, {
                id: 1,
                label: 'Second answer',
                votes: 50,
            }, {
                id: 2,
                label: 'Third answer',
                votes: 15
            }, {
                id: 3,
                label: 'Fourth answer',
                votes: 10
            }, {
                id: 4,
                label: 'Fifth answer',
                votes: 4
            },
        ]
    }, {
        id: 29,
        postType: 'media', // vote/post
        user: {
            first_name: 'Coding',
            last_name: 'Pixel',
            nickname: 'sdftjon',
            isVerified: false,
            photo: "https://i.imgur.com/BaqrF2I.jpeg",
            XP: 88732,
            isFollowing: false,
        },
        isLiked: true,
        likes: 234234,
        createdAt: new Date(),
        comments: 432,
        shares: 98232234,
        file: {
            link: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
            type: 'video' //image/video
        },
        description: 'Lorem ipsoum dolor sit consectuer sdkjfls skjdflkjdflj skjsljfsljljsflsdf',
    }, {
        id: 30,
        postType: 'media', // vote/post
        user: {
            first_name: 'Sdf',
            last_name: 'Tjon',
            nickname: 'sdftjon',
            isVerified: false,
            photo: "https://i.imgur.com/BaqrF2I.jpeg",
            XP: 88732,
            isFollowing: true,
        },
        isLiked: false,
        likes: 34234,
        comments: 322,
        createdAt: new Date(),
        alreadyVoted: false,
        dueTime: new Date(),
        shares: 88232234,
        question: 'Select one of the followings, which one?',
        file: {
            link: "https://i.imgur.com/BaqrF2I.jpeg",
            type: 'image'
        },
        options: [
            {
                id: 0,
                label: 'Fist answer',
                votes: 25
            }, {
                id: 1,
                label: 'Second answer',
                votes: 50,
            }, {
                id: 2,
                label: 'Third answer',
                votes: 15
            }, {
                id: 3,
                label: 'Fourth answer',
                votes: 10
            }, {
                id: 4,
                label: 'Fifth answer',
                votes: 4
            },
        ]
    }, {
        id: 31,
        postType: 'voting', // vote/post
        user: {
            first_name: 'Sdf',
            last_name: 'Tjon',
            nickname: 'sdftjon',
            isVerified: false,
            photo: "https://i.imgur.com/BaqrF2I.jpeg",
            XP: 88732,
            isFollowing: true,
        },
        isLiked: false,
        likes: 34234,
        comments: 322,
        createdAt: new Date(),
        alreadyVoted: false,
        dueTime: new Date(),
        shares: 88232234,
        question: 'Select one of the followings, which one?',
        file: {
            link: "https://i.imgur.com/BaqrF2I.jpeg",
            type: 'image'
        },
        options: [
            {
                id: 0,
                label: 'Fist answer',
                votes: 25
            }, {
                id: 1,
                label: 'Second answer',
                votes: 50,
            }, {
                id: 2,
                label: 'Third answer',
                votes: 15
            }, {
                id: 3,
                label: 'Fourth answer',
                votes: 10
            }, {
                id: 4,
                label: 'Fifth answer',
                votes: 4
            },
        ]
    }, {
        id: 32,
        postType: 'media', // vote/post
        user: {
            first_name: 'Coding',
            last_name: 'Pixel',
            nickname: 'sdftjon',
            isVerified: false,
            photo: "https://i.imgur.com/BaqrF2I.jpeg",
            XP: 88732,
            isFollowing: false,
        },
        isLiked: true,
        likes: 234234,
        createdAt: new Date(),
        comments: 432,
        shares: 98232234,
        file: {
            link: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
            type: 'video' //image/video
        },
        description: 'Lorem ipsoum dolor sit consectuer sdkjfls skjdflkjdflj skjsljfsljljsflsdf',
    }, {
        id: 33,
        postType: 'media', // vote/post
        user: {
            first_name: 'Sdf',
            last_name: 'Tjon',
            nickname: 'sdftjon',
            isVerified: false,
            photo: "https://i.imgur.com/BaqrF2I.jpeg",
            XP: 88732,
            isFollowing: true,
        },
        isLiked: false,
        likes: 34234,
        comments: 322,
        createdAt: new Date(),
        alreadyVoted: false,
        dueTime: new Date(),
        shares: 88232234,
        question: 'Select one of the followings, which one?',
        file: {
            link: "https://i.imgur.com/BaqrF2I.jpeg",
            type: 'image'
        },
        options: [
            {
                id: 0,
                label: 'Fist answer',
                votes: 25
            }, {
                id: 1,
                label: 'Second answer',
                votes: 50,
            }, {
                id: 2,
                label: 'Third answer',
                votes: 15
            }, {
                id: 3,
                label: 'Fourth answer',
                votes: 10
            }, {
                id: 4,
                label: 'Fifth answer',
                votes: 4
            },
        ]
    }, {
        id: 34,
        postType: 'voting', // vote/post
        user: {
            first_name: 'Sdf',
            last_name: 'Tjon',
            nickname: 'sdftjon',
            isVerified: false,
            photo: "https://i.imgur.com/BaqrF2I.jpeg",
            XP: 88732,
            isFollowing: true,
        },
        isLiked: false,
        likes: 34234,
        comments: 322,
        createdAt: new Date(),
        alreadyVoted: false,
        dueTime: new Date(),
        shares: 88232234,
        question: 'Select one of the followings, which one?',
        file: {
            link: "https://i.imgur.com/BaqrF2I.jpeg",
            type: 'image'
        },
        options: [
            {
                id: 0,
                label: 'Fist answer',
                votes: 25
            }, {
                id: 1,
                label: 'Second answer',
                votes: 50,
            }, {
                id: 2,
                label: 'Third answer',
                votes: 15
            }, {
                id: 3,
                label: 'Fourth answer',
                votes: 10
            }, {
                id: 4,
                label: 'Fifth answer',
                votes: 4
            },
        ]
    }, {
        id: 35,
        postType: 'media', // vote/post
        user: {
            first_name: 'Coding',
            last_name: 'Pixel',
            nickname: 'sdftjon',
            isVerified: false,
            photo: "https://i.imgur.com/BaqrF2I.jpeg",
            XP: 88732,
            isFollowing: false,
        },
        isLiked: true,
        likes: 234234,
        createdAt: new Date(),
        comments: 432,
        shares: 98232234,
        file: {
            link: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
            type: 'video' //image/video
        },
        description: 'Lorem ipsoum dolor sit consectuer sdkjfls skjdflkjdflj skjsljfsljljsflsdf',
    }, {
        id: 36,
        postType: 'media', // vote/post
        user: {
            first_name: 'Sdf',
            last_name: 'Tjon',
            nickname: 'sdftjon',
            isVerified: false,
            photo: "https://i.imgur.com/BaqrF2I.jpeg",
            XP: 88732,
            isFollowing: true,
        },
        isLiked: false,
        likes: 34234,
        comments: 322,
        createdAt: new Date(),
        alreadyVoted: false,
        dueTime: new Date(),
        shares: 88232234,
        question: 'Select one of the followings, which one?',
        file: {
            link: "https://i.imgur.com/BaqrF2I.jpeg",
            type: 'image'
        },
        options: [
            {
                id: 0,
                label: 'Fist answer',
                votes: 25
            }, {
                id: 1,
                label: 'Second answer',
                votes: 50,
            }, {
                id: 2,
                label: 'Third answer',
                votes: 15
            }, {
                id: 3,
                label: 'Fourth answer',
                votes: 10
            }, {
                id: 4,
                label: 'Fifth answer',
                votes: 4
            },
        ]
    }, {
        id: 37,
        postType: 'voting', // vote/post
        user: {
            first_name: 'Sdf',
            last_name: 'Tjon',
            nickname: 'sdftjon',
            isVerified: false,
            photo: "https://i.imgur.com/BaqrF2I.jpeg",
            XP: 88732,
            isFollowing: true,
        },
        isLiked: false,
        likes: 34234,
        comments: 322,
        createdAt: new Date(),
        alreadyVoted: false,
        dueTime: new Date(),
        shares: 88232234,
        question: 'Select one of the followings, which one?',
        file: {
            link: "https://i.imgur.com/BaqrF2I.jpeg",
            type: 'image'
        },
        options: [
            {
                id: 0,
                label: 'Fist answer',
                votes: 25
            }, {
                id: 1,
                label: 'Second answer',
                votes: 50,
            }, {
                id: 2,
                label: 'Third answer',
                votes: 15
            }, {
                id: 3,
                label: 'Fourth answer',
                votes: 10
            }, {
                id: 4,
                label: 'Fifth answer',
                votes: 4
            },
        ]
    }, {
        id: 38,
        postType: 'media', // vote/post
        user: {
            first_name: 'Coding',
            last_name: 'Pixel',
            nickname: 'sdftjon',
            isVerified: false,
            photo: "https://i.imgur.com/BaqrF2I.jpeg",
            XP: 88732,
            isFollowing: false,
        },
        isLiked: true,
        likes: 234234,
        createdAt: new Date(),
        comments: 432,
        shares: 98232234,
        file: {
            link: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
            type: 'video' //image/video
        },
        description: 'Lorem ipsoum dolor sit consectuer sdkjfls skjdflkjdflj skjsljfsljljsflsdf',
    }, {
        id: 39,
        postType: 'media', // vote/post
        user: {
            first_name: 'Sdf',
            last_name: 'Tjon',
            nickname: 'sdftjon',
            isVerified: false,
            photo: "https://i.imgur.com/BaqrF2I.jpeg",
            XP: 88732,
            isFollowing: true,
        },
        isLiked: false,
        likes: 34234,
        comments: 322,
        createdAt: new Date(),
        alreadyVoted: false,
        dueTime: new Date(),
        shares: 88232234,
        question: 'Select one of the followings, which one?',
        file: {
            link: "https://i.imgur.com/BaqrF2I.jpeg",
            type: 'image'
        },
        options: [
            {
                id: 0,
                label: 'Fist answer',
                votes: 25
            }, {
                id: 1,
                label: 'Second answer',
                votes: 50,
            }, {
                id: 2,
                label: 'Third answer',
                votes: 15
            }, {
                id: 3,
                label: 'Fourth answer',
                votes: 10
            }, {
                id: 4,
                label: 'Fifth answer',
                votes: 4
            },
        ]
    },
]
const MOCKUP_POSTS = __DEV__ ? longList : shortList;
const MOCK_GAMES = [
    {
        id: 0,
        name: 'Game Name',
        type: 'Console Game',
        description: "Lorem ipsum dolor, Lorem ipsum dolor, Lorem ipsum dolor, Lorem ipsum dolor, Lorem ipsum dolor, Lorem ipsum dolor, Lorem ipsum dolor.Lorem ipsum dolor, Lorem ipsum dolor, Lorem ipsum dolor.",
        cover: "https://i.imgur.com/BaqrF2I.jpeg",
        releaseDate: new Date(),
        points: '9,0',
        negetive: false
    }, {
        id: 1,
        name: 'Game Name',
        type: 'Console Game',
        description: "Lorem ipsum dolor, Lorem ipsum dolor, Lorem ipsum dolor, Lorem ipsum dolor, Lorem ipsum dolor, Lorem ipsum dolor, Lorem ipsum dolor.Lorem ipsum dolor, Lorem ipsum dolor, Lorem ipsum dolor.",
        cover: "https://i.imgur.com/BaqrF2I.jpeg",
        releaseDate: new Date(),
        points: '9,0',
        negetive: false
    }, {
        id: 2,
        name: 'Game Name',
        type: 'Console Game',
        description: "Lorem ipsum dolor, Lorem ipsum dolor, Lorem ipsum dolor, Lorem ipsum dolor, Lorem ipsum dolor, Lorem ipsum dolor, Lorem ipsum dolor.Lorem ipsum dolor, Lorem ipsum dolor, Lorem ipsum dolor.",
        cover: "https://i.imgur.com/BaqrF2I.jpeg",
        releaseDate: new Date(),
        points: '9,0',
        negetive: true
    }, {
        id: 3,
        name: 'Game Name',
        type: 'Console Game',
        description: "Lorem ipsum dolor, Lorem ipsum dolor, Lorem ipsum dolor, Lorem ipsum dolor, Lorem ipsum dolor, Lorem ipsum dolor, Lorem ipsum dolor.Lorem ipsum dolor, Lorem ipsum dolor, Lorem ipsum dolor.",
        cover: "https://i.imgur.com/BaqrF2I.jpeg",
        releaseDate: new Date(),
        points: '9,0',
        negetive: false
    }, {
        id: 4,
        name: 'Game Name',
        type: 'Console Game',
        description: "Lorem ipsum dolor, Lorem ipsum dolor, Lorem ipsum dolor, Lorem ipsum dolor, Lorem ipsum dolor, Lorem ipsum dolor, Lorem ipsum dolor.Lorem ipsum dolor, Lorem ipsum dolor, Lorem ipsum dolor.",
        cover: "https://i.imgur.com/BaqrF2I.jpeg",
        releaseDate: new Date(),
        points: '9,0',
        negetive: true
    }, {
        id: 5,
        name: 'Game Name',
        type: 'Console Game',
        description: "Lorem ipsum dolor, Lorem ipsum dolor, Lorem ipsum dolor, Lorem ipsum dolor, Lorem ipsum dolor, Lorem ipsum dolor, Lorem ipsum dolor.Lorem ipsum dolor, Lorem ipsum dolor, Lorem ipsum dolor.",
        cover: "https://i.imgur.com/BaqrF2I.jpeg",
        releaseDate: new Date(),
        points: '9,0',
        negetive: false
    },
]

const MOCK_QUESTS = [
    {
        id: 0,
        name: 'Mission Name',
        totalTask: 10,
        compeletedTasks: 4,
        description: "Some description about the mission. Some description about the mission. Some description about the mission. Some description about the mission.",
        reward: 10,
        deadLine: date.setDate(date.getDate() + 1)
    }, {
        id: 1,
        name: 'Mission Name',
        totalTask: 10,
        compeletedTasks: 4,
        description: "Some description about the mission. Some description about the mission. Some description about the mission. Some description about the mission.",
        reward: 10,
        deadLine: date.setDate(date.getDate() + 1)
    }, {
        id: 2,
        name: 'Mission Name',
        totalTask: 10,
        compeletedTasks: 4,
        description: "Some description about the mission. Some description about the mission. Some description about the mission. Some description about the mission.",
        reward: 10,
        deadLine: date.setDate(date.getDate() + 1)
    }, {
        id: 3,
        name: 'Mission Name',
        totalTask: 10,
        compeletedTasks: 4,
        description: "Some description about the mission. Some description about the mission. Some description about the mission. Some description about the mission.",
        reward: 10,
        deadLine: date.setDate(date.getDate() + 1)
    }, {
        id: 4,
        name: 'Mission NameMission NameMission NameMission NameMission NameMission NameMission Name',
        totalTask: 10,
        compeletedTasks: 4,
        description: "Some description about the mission. Some description about the mission. Some description about the mission. Some description about the mission.",
        reward: 10,
        deadLine: date.setDate(date.getDate() + 1)
    }, {
        id: 5,
        name: 'Mission Name',
        totalTask: 10,
        compeletedTasks: 4,
        description: "Some description about the mission. Some description about the mission. Some description about the mission. Some description about the mission.",
        reward: 10,
        deadLine: date.setDate(date.getDate() + 1)
    }, {
        id: 6,
        name: 'Mission Name',
        totalTask: 10,
        compeletedTasks: 4,
        description: "Some description about the mission. Some description about the mission. Some description about the mission. Some description about the mission.",
        reward: 10,
        deadLine: date.setDate(date.getDate() + 1)
    },
]

const MOCK_BACKGROUNDS = [
    {
        id: 0,
        name: 'Background name',
        image: BACKGROUND_IMG,
        coins: 10
    }, {
        id: 1,
        name: 'Background name',
        image: BACKGROUND_IMG,
        coins: 10
    }, {
        id: 2,
        name: 'Background name',
        image: BACKGROUND_IMG,
        coins: 10
    }, {
        id: 3,
        name: 'Background name',
        image: BACKGROUND_IMG,
        coins: 10
    }, {
        id: 4,
        name: 'Background name',
        image: BACKGROUND_IMG,
        coins: 10
    }, {
        id: 5,
        name: 'Background name',
        image: BACKGROUND_IMG,
        coins: 10
    },
]

const MOCK_CORNERS = [
    {
        id: 0,
        name: 'Corner Name',
        coins: 10
    }, {
        id: 1,
        name: 'Corner Name',
        coins: 10
    }, {
        id: 2,
        name: 'Corner Name',
        coins: 10
    }, {
        id: 3,
        name: 'Corner Name',
        coins: 10
    },
]

const MOCK_FOLLOW_REQUESTS = [
    {
        id: 0,
        name: 'User Name',
        image: "https://i.imgur.com/BaqrF2I.jpeg",
        msg: "User1 wants to follow you"
    }, {
        id: 1,
        name: 'User Name',
        image: "https://i.imgur.com/BaqrF2I.jpeg",
        msg: "User1 wants to follow you"
    }, {
        id: 2,
        name: 'User Name',
        image: "https://i.imgur.com/BaqrF2I.jpeg",
        msg: "User1 wants to follow you"
    }, {
        id: 3,
        name: 'User Name',
        image: "https://i.imgur.com/BaqrF2I.jpeg",
        msg: "User1 wants to follow you"
    }, {
        id: 4,
        name: 'User Name',
        image: "https://i.imgur.com/BaqrF2I.jpeg",
        msg: "User1 wants to follow you"
    },
]

const MOCK_NOTIFICATIONS = [
    {
        id: 0,
        name: 'User Name',
        image: "https://i.imgur.com/BaqrF2I.jpeg",
        msg: "User name, User2 and Other 20 liked your post.",
        createdAt: new Date(),
        read: false
    }, {
        id: 1,
        name: 'User Name',
        image: "https://i.imgur.com/BaqrF2I.jpeg",
        msg: "User name wrote a review on League os Legends.",
        createdAt: new Date(),
        read: false
    }, {
        id: 2,
        name: 'User Name',
        image: "https://i.imgur.com/BaqrF2I.jpeg",
        msg: "User4 commented your post.",
        createdAt: new Date(),
        read: false
    }, {
        id: 3,
        name: 'User Name',
        image: '',
        msg: "Username, User3 and others 33 started following you.",
        createdAt: new Date(),
        read: true
    }, {
        id: 4,
        name: 'User Name',
        image: "https://i.imgur.com/BaqrF2I.jpeg",
        msg: "User77 commented on your post.",
        createdAt: new Date(),
        read: true
    },
]

const MOCK_INBOX = [
    {
        id: 0,
        user: {
            first_name: 'Userr',
            last_name: 'jon',
            nickname: 'nicknameuser',
            isVerified: true,
            photo: "https://i.imgur.com/BaqrF2I.jpeg",
            XP: 23423,
            isFollowing: false,

        },
        createdAt: new Date(),
        msg: 'This is last message of user he chated with. message of user he chated with. message of user he chated with.'
    }, {
        id: 1,
        user: {
            first_name: 'Userr',
            last_name: 'jon',
            nickname: 'nicknameuser',
            isVerified: false,
            photo: "https://i.imgur.com/BaqrF2I.jpeg",
            XP: 23423,
            isFollowing: true,

        },
        createdAt: new Date(),
        msg: 'This is last message of user he chated with. message of user he chated with. message of user he chated with.'
    }, {
        id: 2,
        user: {
            first_name: 'Userr',
            last_name: 'jon',
            nickname: 'nicknameuser',
            isVerified: true,
            photo: "https://i.imgur.com/BaqrF2I.jpeg",
            XP: 23423,
            isFollowing: false,

        },
        createdAt: new Date(),
        msg: 'This is last message of user he chated with. message of user he chated with. message of user he chated with.'
    },
]

const MOCK_CONSOLE_TYPES = [
    { id: 0, name: 'All' },
    { id: 1, name: 'Ps4' },
    { id: 2, name: '3DS' },
    { id: 3, name: 'Ps5' },
    { id: 4, name: 'Awatch' },
    { id: 5, name: 'PsVita' },
    { id: 6, name: 'Ds' },
    { id: 7, name: 'Stadia' },
    { id: 8, name: 'iPAD' },
    { id: 9, name: 'Wii' },
    { id: 10, name: 'N3ds' },
    { id: 11, name: 'Wph' },
    { id: 12, name: 'Nsw' },
    { id: 13, name: 'X360' },
    { id: 14, name: 'Mobile' },
    { id: 15, name: 'XboxSX' },
    { id: 16, name: 'Pc' },
    { id: 17, name: 'Xone' },
    { id: 18, name: 'Ps3' },
]

const MOCK_GENRE_TYPES = [
    { id: 0, name: 'Free-to-play' },
    { id: 1, name: 'Puzzle' },
    { id: 2, name: 'Action' },
    { id: 3, name: 'Racing' },
    { id: 4, name: 'Adventure' },
    { id: 5, name: 'Role-playing' },
    { id: 6, name: 'Battle' },
    { id: 7, name: 'Shooter' },
    { id: 8, name: 'Fighting' },
    { id: 9, name: 'Simulation' },
    { id: 10, name: 'Horror' },
    { id: 11, name: 'Strategy' },
    { id: 12, name: 'Music' },
    { id: 13, name: 'Survival' },
    { id: 14, name: 'Online' },
    { id: 15, name: 'Tactical' },
]

const MOCK_RELEASEDATE_TYPES = [
    { id: 0, name: 'Newest' },
    { id: 1, name: 'Past week' },
    { id: 2, name: 'Past month' },
    { id: 3, name: 'Past year' },
    { id: 4, name: 'All time' },
]
export { MOCKUP_POSTS, MOCK_GAMES, MOCK_QUESTS, MOCK_BACKGROUNDS, MOCK_CORNERS, MOCK_FOLLOW_REQUESTS, MOCK_NOTIFICATIONS, MOCK_RELEASEDATE_TYPES, MOCK_GENRE_TYPES, MOCK_INBOX, MOCK_CONSOLE_TYPES }